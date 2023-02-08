import { Alchemy, Network } from "alchemy-sdk";

import { config } from "@/config";

export class OwnerShipService {
  static async verifyOwnership(address: string) {
    const contract = config.TOKEN_GATED_ADDRESS;

    const alchemy = new Alchemy({
      apiKey: config.ALCHEMY_API_KEY,
      network: config.TOKEN_GATED_NETWORK,
      maxRetries: 0,
    });

    const isOwner = await alchemy.nft.verifyNftOwnership(address, contract);
    return {
      isOwner,
      lastValidation: Date.now(),
    };
  }

  static async verifyIfNeeded(
    address: string,
    lastValidation: number | null | undefined,
    isOwner: boolean | null | undefined
  ) {
    if (
      lastValidation &&
      lastValidation <
        Date.now() - config.TOKEN_GATED_ELAPSED_TIME_BETWEEN_CONTROL
    ) {
      return await OwnerShipService.verifyOwnership(address);
    }

    return {
      isOwner: isOwner ?? false,
      lastValidation,
    };
  }
}
