import { configureChains, createClient } from "wagmi";
import { mainnet, polygon } from "@wagmi/core/chains";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

// Configure the chains and WalletConnect
const { chains, provider } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
);

export const client = createClient({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "48ef140a5621708ce9656baa42afd64e",
        metadata: {
          name: "Your App Name",
          description: "Your App Description",
          url: "https://yourapp.com",
          icons: ["https://yourapp.com/icon.png"],
        },
      },
    }),
  ],
  provider,
});
