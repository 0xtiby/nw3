import { signOut, useSession } from "next-auth/react";
import { useAccount, useDisconnect } from "wagmi";

export const useUser = () => {
  const { data, status } = useSession();
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const logOut = async () => {
    await disconnectAsync();
    signOut({ callbackUrl: "/" });
  };

  return {
    address: address,
    mismatchBeetweenSessionAndAccount:
      status === "authenticated" && data?.user?.address !== address,
    user: data?.user,
    isLoading: status === "loading",
    logOut,
  };
};
