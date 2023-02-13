import { goerli, mainnet } from "wagmi/chains";

import { Network } from "alchemy-sdk";

const DEFAULT_APP_NAME = "NW3 App";
const DEFAULT_VALIDITY = 4 * 60 * 60 * 1000; // 4 hours
const DEFAULT_NEXTAUTH_URL = "http://localhost:3000/";

export const config = {
  ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? "",
  CHAINS: [goerli],
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? DEFAULT_APP_NAME,
  AUTO_CONNECT: process.env.NEXT_PUBLIC_AUTO_CONNECT === "true",
  ALLOW_MISMATCH_BEETWEEN_SESSION_AND_ACCOUNT:
    process.env.NEXT_PUBLIC_ALLOW_MISMATCH_BEETWEEN_SESSION_AND_ACCOUNT ===
    "true",
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? DEFAULT_NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  TOKEN_GATED: process.env.TOKEN_GATED === "true",
  TOKEN_GATED_ADDRESS: process.env.TOKEN_GATED_ADDRESS ?? "",
  TOKEN_GATED_NETWORK: Network.ETH_GOERLI,
  TOKEN_GATED_ELAPSED_TIME_BETWEEN_CONTROL: process.env
    .TOKEN_GATED_ELAPSED_TIME_BETWEEN_CONTROL
    ? parseInt(process.env.TOKEN_GATED_ELAPSED_TIME_BETWEEN_CONTROL)
    : DEFAULT_VALIDITY,
  TOKEN_GATED_REQUIRED_TO_LOGIN:
    process.env.TOKEN_GATED_REQUIRED_TO_LOGIN === "true",
  BLOCKCHAIN_EXPLORER_URL:
    process.env.NEXT_PUBLIC_BLOCKCHAIN_EXPLORER_URL ??
    "https://goerli.etherscan.io",
  MINT_ADDRESS: process.env.NEXT_PUBLIC_MINT_ADDRESS ?? "",
};
