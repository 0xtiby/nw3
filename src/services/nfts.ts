import { Alchemy, Network } from "alchemy-sdk";

import { config } from "@/config";

export class NftsService {
  alchemy: Alchemy;
  constructor() {
    this.alchemy = new Alchemy({
      apiKey: config.ALCHEMY_API_KEY,
      network: config.TOKEN_GATED_NETWORK,
      maxRetries: 0,
    });
  }
  async getList(address: string) {
    return this.alchemy.nft.getNftsForOwner(address);
  }
}
