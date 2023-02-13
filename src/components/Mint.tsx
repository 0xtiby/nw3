import React from "react";
import { config } from "@/config";
import { locales } from "@/locales";
import { useMint } from "@/hooks/useMint";

export const Mint: React.FC = () => {
  const {
    mint,
    isMinting,
    isMinted,
    mintData,
    isConnected,
    isPrepareError,
    prepareError,
    isMintError,
    mintError,
    isSupportedNetwork,
  } = useMint();

  if (!isConnected || !isSupportedNetwork) return null;
  return (
    <div>
      <button
        disabled={!mint || isMinting}
        onClick={() => mint?.()}
        className="rounded-md bg-theme-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-theme-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-600"
      >
        {isMinting ? "Minting..." : "Mint"}
      </button>
      {isMinted && (
        <div>
          <div className="text-green-500 mt-2">{locales.mintSuccess}</div>
          <div>
            <a href={`${config.BLOCKCHAIN_EXPLORER_URL}/tx/${mintData?.hash}`}>
              Etherscan
            </a>
          </div>
        </div>
      )}
      {(isPrepareError || isMintError) && (
        <div className="text-red-500 mt-2">
          Error: {(prepareError || mintError)?.message}
        </div>
      )}
    </div>
  );
};
