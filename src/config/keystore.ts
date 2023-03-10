import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const keyStore = createQueryKeyStore({
  nfts: {
    byAddress: (address: string) => [address],
  },
});
