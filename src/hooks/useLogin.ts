import { getCsrfToken, signIn } from "next-auth/react";
import { useAccount, useDisconnect, useNetwork, useSignMessage } from "wagmi";

import { SiweMessage } from "siwe";
import { locales } from "@/locales";
import { routes } from "@/routes";
import { useRouter } from "next/router";
import { useState } from "react";

export const useLogin = () => {
  const { signMessageAsync } = useSignMessage();
  const { disconnectAsync } = useDisconnect();
  const { query, push } = useRouter();
  const [error, setError] = useState<string | undefined>(
    query.error as string | undefined
  );
  const [loading, setLoading] = useState(false);

  useAccount({
    async onConnect({ address, connector }) {
      setError(undefined);
      setLoading(true);
      if (address) {
        try {
          const callbackUrl = await login(
            address,
            connector?.chains[0].id,
            signMessageAsync,
            (query.callbackUrl as string | undefined) ?? routes.profile
          );
          setLoading(false);
          push(callbackUrl ?? routes.profile);
        } catch (error: any) {
          console.log("error", error);
          setError(error.message);
          await disconnectAsync();
          setLoading(false);
        }
      }
    },
  });

  return {
    loading,
    error,
  };
};

async function login(
  address: string | undefined,
  chainId: number | undefined,
  signMessage: ({ message }: { message: string }) => Promise<`0x${string}`>,
  callbackUrl: string | undefined
) {
  const csrf = await getCsrfToken();
  const message = new SiweMessage({
    domain: window.location.host,
    address: address,
    statement: "Sign in with Ethereum to the app.",
    uri: window.location.origin,
    version: "1",
    chainId: chainId,
    nonce: csrf,
  });
  const signature = await signMessage({
    message: message.prepareMessage(),
  });

  const res = await signIn("credentials", {
    message: JSON.stringify(message),
    redirect: false,
    signature,
    callbackUrl: callbackUrl ?? window.location.origin,
  });

  if (res?.error) {
    throw new Error(
      res.error === "undefined" ? locales.unableToLogin : res.error
    );
  }
  return res?.url;
}
