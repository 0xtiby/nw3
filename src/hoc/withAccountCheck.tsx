import { Error } from "@/components/Error";
import Head from "next/head";
import { Layout } from "../components/Layout";
import { config } from "@/config";
import { locales } from "@/locales";
import { useIsMounted } from "../hooks/useIsMounted";
import { useNetwork } from "wagmi";
import { useUser } from "@/hooks/useUser";

export function withAccountCheck<T extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithTheme = (
    props: Omit<T, keyof Record<string, unknown>>
  ) => {
    const mounted = useIsMounted();
    const { chain } = useNetwork();
    const { mismatchBeetweenSessionAndAccount } = useUser();

    if (!mounted) {
      return null;
    }

    if (
      mismatchBeetweenSessionAndAccount &&
      config.ALLOW_MISMATCH_BEETWEEN_SESSION_AND_ACCOUNT === false
    ) {
      return (
        <Layout title={locales.accountMismatch}>
          <div className="mx-auto max-w-xl">
            <Error
              title={locales.accountMismatch}
              message={locales.accountMismatchMessage}
            />
          </div>
        </Layout>
      );
    }

    if (chain && chain.unsupported) {
      return (
        <Layout title={locales.accountMismatch}>
          <div className="mx-auto max-w-xl">
            <Error
              title={locales.wrongNetwork}
              message={locales.wrongNetworkMessage}
            />
          </div>
        </Layout>
      );
    }

    // props comes afterwards so the can override the default ones.
    return <WrappedComponent {...(props as T)} />;
  };

  ComponentWithTheme.displayName = `withTheme(${displayName})`;

  return ComponentWithTheme;
}
