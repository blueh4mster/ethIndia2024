import ethers from "ethers";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LIT_RPC, LIT_NETWORK, LIT_ABILITY } from "@lit-protocol/constants";
import {
  createSiweMessageWithRecaps,
  generateAuthSig,
  LitActionResource,
  LitPKPResource,
} from "@lit-protocol/auth-helpers";

import { getEnv, mintPkp, getChainInfo } from "./utils";
import { litActionCode } from "./litActions";

const ETHEREUM_PRIVATE_KEY = getEnv("ETHEREUM_PRIVATE_KEY");
const LIT_PKP_PUBLIC_KEY = process.env.LIT_PKP_PUBLIC_KEY || "";

export const runExample = async (req: any, res: any) => {
  const { amount, address, timePeriod } = req.body;
  let pkpInfo: any = {
    publicKey: LIT_PKP_PUBLIC_KEY,
  };
  let litNodeClient: LitNodeClient;

  try {
    const chainInfo = getChainInfo("sepolia");

    const ethersWallet = new ethers.Wallet(
      ETHEREUM_PRIVATE_KEY,
      new ethers.providers.JsonRpcProvider(chainInfo.rpcUrl)
    );

    const ethersProvider = new ethers.providers.JsonRpcProvider(
      chainInfo.rpcUrl
    );

    const ethersSigner = new ethers.Wallet(
      ETHEREUM_PRIVATE_KEY,
      new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
    );

    console.log("🔄 Connecting to Lit network...");
    litNodeClient = new LitNodeClient({
      litNetwork: LIT_NETWORK.DatilDev,
      debug: false,
    });
    if (LIT_PKP_PUBLIC_KEY === undefined || LIT_PKP_PUBLIC_KEY === "") {
      console.log("🔄 PKP wasn't provided, minting a new one...");
      pkpInfo = await mintPkp(ethersSigner);
    } else {
      console.log(`ℹ️  Using provided PKP: ${LIT_PKP_PUBLIC_KEY}`);
    }

    console.log(`🔄 Checking PKP balance...`);
    let bal = await ethersProvider.getBalance(pkpInfo.ethAddress!);
    let formattedBal = ethers.utils.formatEther(bal);

    if (Number(formattedBal) < Number(ethers.utils.formatEther(25_000))) {
      console.log(
        `ℹ️  PKP balance: ${formattedBal} is insufficient to run example`
      );
      console.log(`🔄 Funding PKP...`);

      const fundingTx = {
        to: pkpInfo.ethAddress!,
        value: ethers.utils.parseEther("0.001"),
        gasLimit: 21_000,
        gasPrice: (await ethersWallet.getGasPrice()).toHexString(),
        nonce: await ethersProvider.getTransactionCount(ethersWallet.address),
        chainId: chainInfo.chainId,
      };

      const fundingTxPromise = await ethersWallet.sendTransaction(fundingTx);
      const fundingTxReceipt = await fundingTxPromise.wait();

      console.log(
        `✅ PKP funded. Transaction hash: ${fundingTxReceipt.transactionHash}`
      );
    } else {
      console.log(`✅ PKP has a sufficient balance of: ${formattedBal}`);
    }

    console.log("🔄 Initializing connection to the Lit network...");
    litNodeClient = new LitNodeClient({
      litNetwork: LIT_NETWORK.DatilDev,
      debug: false,
    });
    await litNodeClient.connect();
    console.log("✅ Successfully connected to the Lit network");

    console.log("🔄 Getting Session Signatures...");
    const sessionSigs = await litNodeClient.getSessionSigs({
      chain: "sepolia",
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
      resourceAbilityRequests: [
        {
          resource: new LitPKPResource("*"),
          ability: LIT_ABILITY.PKPSigning,
        },
        {
          resource: new LitActionResource("*"),
          ability: LIT_ABILITY.LitActionExecution,
        },
      ],
      authNeededCallback: async ({
        resourceAbilityRequests,
        expiration,
        uri,
      }) => {
        const toSign = await createSiweMessageWithRecaps({
          uri: uri!,
          expiration: expiration!,
          resources: resourceAbilityRequests!,
          walletAddress: ethersSigner.address,
          nonce: await litNodeClient.getLatestBlockhash(),
          litNodeClient,
        });

        return await generateAuthSig({
          signer: ethersSigner,
          toSign,
        });
      },
    });
    console.log("✅ Got Session Signatures");

    console.log("🔄 Executing Lit Action...");
    const message = new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode("Hello world")
      )
    );
    const litActionSignatures = await litNodeClient.executeJs({
      sessionSigs,
      code: litActionCode,
      jsParams: {
        amount: amount,
        address: address,
        timePeriod: timePeriod,
      },
    });
    console.log("✅ Executed Lit Action");
    console.log(litActionSignatures);
    res.status(200).json({
      message: "Success",
      data: litActionSignatures,
    });
    //return litActionSignatures;
  } catch (error) {
    console.error(error);
  } finally {
    litNodeClient!.disconnect();
  }
};
