import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpToolkit } from "@coinbase/cdp-langchain";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as readline from "readline";
import {Wallet} from "@coinbase/coinbase-sdk";
import express, { Router, Request, Response } from 'express';
import { IterableReadableStream } from "@langchain/core/utils/stream";
// import { transfer } from "@coinbase/cdp-agentkit-core/dist/actions/cdp/transfer";

dotenv.config();


const router = Router();

/**
 * Validates that required environment variables are set
 *
 * @throws {Error} - If required environment variables are missing
 * @returns {void}
 */
function validateEnvironment(): void {
  const missingVars: string[] = [];

  // Check required variables
  const requiredVars = ["XAI_API_KEY", "CDP_API_KEY_NAME", "CDP_API_KEY_PRIVATE_KEY"];
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  // Exit if any required variables are missing
  if (missingVars.length > 0) {
    console.error("Error: Required environment variables are not set");
    missingVars.forEach(varName => {
      console.error(`${varName}=your_${varName.toLowerCase()}_here`);
    });
    process.exit(1);
  }

  // Warn about optional NETWORK_ID
  if (!process.env.NETWORK_ID) {
    console.warn("Warning: NETWORK_ID not set, defaulting to base-sepolia testnet");
  }
}

// Add this right after imports and before any other code
validateEnvironment();

// Configure a file to persist the agent's CDP MPC Wallet Data
const WALLET_DATA_FILE = "wallet_data.txt";

/**
 * Initialize the agent with CDP Agentkit
 *
 * @returns Agent executor and config
 */
async function initializeAgent() {
  try {
    // Initialize LLM with xAI configuration
    const llm = new ChatOpenAI({
      model: "grok-beta",
      apiKey: process.env.XAI_API_KEY,
      configuration: {
        baseURL: "https://api.x.ai/v1"
      },
      temperature: 0,
    });

    let walletDataStr: string | null = null;

    // Read existing wallet data if available
    if (fs.existsSync(WALLET_DATA_FILE)) {
      try {
        walletDataStr = fs.readFileSync(WALLET_DATA_FILE, "utf8");
      } catch (error) {
        console.error("Error reading wallet data:", error);
        // Continue without wallet data
      }
    }

    // Configure CDP Agentkit
    const config = {
      cdpWalletData: walletDataStr || undefined,
      networkId: process.env.NETWORK_ID || "base-sepolia",
    };

    // Initialize CDP agentkit
    const agentkit = await CdpAgentkit.configureWithWallet(config);

    // Initialize CDP Agentkit Toolkit and get tools
    const cdpToolkit = new CdpToolkit(agentkit);
    const tools = cdpToolkit.getTools();

    // Store buffered conversation history in memory
    const memory = new MemorySaver();
    const agentConfig = { configurable: { thread_id: "CDP Agentkit Chatbot Example!" } };

    // Create React Agent using the LLM and CDP Agentkit tools
    const agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier:
        "You are a helpful agent that can interact onchain using the Coinbase Developer Platform Agentkit. You are empowered to interact onchain using your tools. If you ever need funds, you can request them from the faucet if you are on network ID `base-sepolia`. If not, you can provide your wallet details and request funds from the user. If someone asks you to do something you can't do with your currently available tools, you must say so, and encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to docs.cdp.coinbase.com for more informaton. Be concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.",
    });

    // Save wallet data
    const exportedWallet = await agentkit.exportWallet();
    console.log(exportedWallet);
     
    const data = JSON.parse(exportedWallet);

    // Extract the defaultAddressId
    const walletId = data.walletId;
    const walletAddress = data.defaultAddressId

    var wallet = await Wallet.fetch(walletId) 

    // const faucet = await wallet.faucet();

    // console.log("Faucet Transaction: ", faucet.getTransactionHash())

    fs.writeFileSync(WALLET_DATA_FILE, exportedWallet);

    return { agent, config: agentConfig, walletAddress };
  } catch (error) {
    console.error("Failed to initialize agent:", error);
    throw error; // Re-throw to be handled by caller
  }
}

/**
 * Run the agent autonomously with specified intervals
 *
 * @param agent - The agent executor
 * @param config - Agent configuration
 * @param interval - Time interval between actions in seconds
 */
// async function runAutonomousMode(agent: any, config: any, interval = 10) {
//   console.log("Starting autonomous mode...");

//   while (true) {
//     try {
//       const thought =
//         "Be creative and do something interesting on the blockchain. " +
//         "Choose an action or set of actions and execute it that highlights your abilities.";
        
//       const stream = await agent.stream({ messages: [new HumanMessage(thought)] }, config);

//       for await (const chunk of stream) {
//         if ("agent" in chunk) {
//           console.log(chunk.agent.messages[0].content);
//         } else if ("tools" in chunk) {
//           console.log(chunk.tools.messages[0].content);
//         }
//         console.log("-------------------");
//       }

//       await new Promise(resolve => setTimeout(resolve, interval * 1000));
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Error:", error.message);
//       }
//       process.exit(1);
//     }
//   }
// }

// /**
//  * Run the agent interactively based on user input
//  *
//  * @param agent - The agent executor
//  * @param config - Agent configuration
//  */
// async function runChatMode(agent: any, config: any) {
//   console.log("Starting chat mode... Type 'exit' to end.");

//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   const question = (prompt: string): Promise<string> =>
//     new Promise(resolve => rl.question(prompt, resolve));

//   try {
//     while (true) {
//       const userInput = await question("\nPrompt: ");

//       if (userInput.toLowerCase() === "exit") {
//         break;
//       }

//       const stream = await agent.stream({ messages: [new HumanMessage(userInput)] }, config);

//       for await (const chunk of stream) {
//         if ("agent" in chunk) {
//           console.log(chunk.agent.messages[0].content);
//         } else if ("tools" in chunk) {
//           console.log(chunk.tools.messages[0].content);
//         }
//         console.log("-------------------");
//       }
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error:", error.message);
//     }
//     process.exit(1);
//   } finally {
//     rl.close();
//   }
// }

// async function setTimer(time: number, amount: number) {
//   if (time <= 0) {
//     throw new Error("Interval must be greater than 0");
//   }

//   const { agent, config, agentkit } = await initializeAgent();

//   // Convert seconds to milliseconds
//   const intervalInMilliseconds = time * 1000;
//   const dummy = async function(){}();
//   // Call transfer every x seconds
//   setInterval(() => {
//     console.log(`transfer ${amount} sepolia eth to 0xC368B76F5BcDC2E86EDA0716581A73A5265806fE on Base Sepolia chain`)
    
//     // const userInput = `transfer ${amount} sepolia eth to 0xC368B76F5BcDC2E86EDA0716581A73A5265806fE on Base Sepolia chain`;

//     // const stream = agent
//     // .stream({ messages: [new HumanMessage(userInput)] }, config)
//     // .then(async (stream) => {
//     //   for await (const chunk of stream) {
//     //     if ("agent" in chunk) {
//     //       console.log(chunk.agent.messages[0].content);
//     //     } else if ("tools" in chunk) {
//     //       console.log(chunk.tools.messages[0].content);
//     //     }
//     //     console.log("-------------------");
//     //   }
//     // })
//     // .catch((error) => {
//     //   console.error("Error processing stream:", error, "Stream: ", userInput);
//     // });
  
//   }, intervalInMilliseconds)
// }

// Function to simulate user input every 10 seconds
var transactionOutput; 
var error;
var walletAddress2;

const sendPeriodicPrompt = (prompt: string, timePeriod: number) => {
  setInterval(async () => {
    console.log(`\nSending automated prompt: ${prompt}`);

    const { agent, config, walletAddress } = await initializeAgent();
    
    walletAddress2 = walletAddress

    const userInput = prompt; // Using predefined prompt as user input
    var stream: IterableReadableStream<any>;

    try {
      stream = await agent.stream({ messages: [new HumanMessage(userInput)] }, config);
      // Process the stream as needed
      for await (const chunk of stream) {
        if ("agent" in chunk) {
          console.log(chunk.agent.messages[0].content);
        } else if ("tools" in chunk) {
          console.log(chunk.tools.messages[0].content);
          transactionOutput = chunk.tools.messages[0].content
        }
        console.log("-------------------");
      }

    } catch (error) {
      console.error('Error occurred while streaming:', error);
      error = error
      // Additional error handling logic
    }

    
  }, timePeriod * 1000); // 10000ms = 10 seconds
};

/**
 * Choose whether to run in autonomous or chat mode based on user input
 *
 * @returns Selected mode
 */
// async function chooseMode(): Promise<"chat" | "auto"> {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   const question = (prompt: string): Promise<string> =>
//     new Promise(resolve => rl.question(prompt, resolve));

//   while (true) {
//     console.log("\nAvailable modes:");
//     console.log("1. chat    - Interactive chat mode");
//     console.log("2. auto    - Autonomous action mode");

//     const choice = (await question("\nChoose a mode (enter number or name): "))
//       .toLowerCase()
//       .trim();
//     const address = (await question("\n to which address do you want to send funds "))
//       .toLowerCase()
//       .trim();
//     const amount = (await question("\n how much funds do you want to send "))
//       .toLowerCase()
//       .trim();
//     const timePeriod = (await question("\n after how long do you want the payment to repeat (in sec) "))
//     .toLowerCase()
//     .trim();
//     if (choice === "1" || choice === "chat") {
//       rl.close();
//       return "chat";
//     } else if (choice === "2" || choice === "auto") {
//       rl.close();
//       return "auto";
//     } else if (choice === "timer") {
//       rl.close();
//       // await setTimer(10, 0.01)
//       const prompt = `transfer ${amount} eth to ${address} on Base Sepolia chain, not a gasless transfer`;
//       sendPeriodicPrompt(prompt, Number(timePeriod))
//       return "chat";
//     }
//     console.log("Invalid choice. Please try again.");
//   }
// }

/**
 * Start the chatbot agent
 */
// async function main() {
//   try {
//     const { agent, config } = await initializeAgent();
//     const mode = await chooseMode();

//     if (mode === "chat") {
//       await runChatMode(agent, config);
//     } else {
//       await runAutonomousMode(agent, config);
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error:", error.message);
//     }
//     process.exit(1);
//   }
// }

// if (require.main === module) {
//   console.log("Starting Agent...");
//   main().catch(error => {
//     console.error("Fatal error:", error);
//     process.exit(1);
//   });
// }

// router.get('/ai-agent', (req: Request, res: Response) => {
    
// });

const app = express();
app.use(express.json()); // Middleware to parse JSON

app.post('/ai-agent', (req: Request, res: Response) => {
  const { amount, address, timePeriod } = req.body;

  const prompt = `transfer ${amount} eth to ${address} on Base Sepolia chain, not a gasless transfer`;
  sendPeriodicPrompt(prompt, Number(timePeriod))

  res.json({ message: transactionOutput + "\nWallet Address: " + walletAddress2 });
});

app.post('/response', (req: Request, res: Response) => {
  // const { amount, address, timePeriod } = req.body;

  // const prompt = `transfer ${amount} eth to ${address} on Base Sepolia chain, not a gasless transfer`;
  // sendPeriodicPrompt(prompt, Number(timePeriod))

  if (error != "") {
    res.json({ error: error });
  } 
  res.json({ message: transactionOutput });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
