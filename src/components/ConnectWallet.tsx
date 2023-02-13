import React from "react";
import { locales } from "@/locales";
import { useMint } from "@/hooks/useMint";

export const ConnectWallet: React.FC = () => {
  const {
    displayName,
    openAccountModal,
    openConnectModal,
    isConnected,
    isSupportedNetwork,
  } = useMint();

  if (!isSupportedNetwork)
    return <p className="text-red-500">{locales.wrongNetworkMessage}</p>;

  return (
    <button
      onClick={() =>
        isConnected
          ? openAccountModal && openAccountModal()
          : openConnectModal && openConnectModal()
      }
      className="rounded-md bg-theme-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-theme-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-600"
    >
      {isConnected ? displayName : locales.connectWallet}
    </button>
  );
};
