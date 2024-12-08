# FortressAI: Secure AI Agents for Crypto Automation

## The Problem

AI Agents are a new and exciting field in Web3. Users can use them to automate tasks and perform various actions like paying a monthly subscription without having to sign a transaction every time, or make automated trades based on market trends. This makes onboarding users easier as it provides better UX.

While agents have a lot of benefits, they have some problems. They have to be trusted with funds. Even if the source code is public, there is no guarantee that the code running on the network endpoint is the same as the one that is public. A malicious actor could modify the code and the environment.

## The Solution

TEEs (Trusted Execution Environments) provide hardware security that the code inside them cannot be accessed by some foreign program. This makes sure that the agent runs exactly as programmed and that the user's data is protected.

FortressAI provides helpful AI Agents that run in TEEs to make sure your data is safe and protected. Our AI Agents are:

- *Recurring Payments Bot*: User specifies destination address, amount and the time interval for the payment. This is useful for things like monthly subscriptions, Tax payments, etc.
- *Trading Bot*: Analyzes market data to find optimum investment strategies for user and executes transactions based on those strategies.

## Architecture

![Architecture Diagram](architecture.jpg)

## Challenges and Lessons Learned

Coinbase's AgentKit template uses OpenAI API keys but those are paid and we weren't able to get one. So we had to find alternative models instead. Relevant templates for AI Agents were not available in some languages so we had to improvise and make our own. Integrating TEEs with AI Agents proved to be a challenging task which took up a lot of time, but we were able to navigate it in the end.
