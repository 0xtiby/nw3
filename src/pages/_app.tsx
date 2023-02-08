import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createClient } from "wagmi";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { config } from "@/config";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(config.CHAINS, [
  alchemyProvider({ apiKey: config.ALCHEMY_API_KEY }),
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: config.APP_NAME,
  chains,
});

const wagmiClient = createClient({
  autoConnect: config.AUTO_CONNECT,
  connectors,
  provider,
});

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <SessionProvider session={session}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </SessionProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
