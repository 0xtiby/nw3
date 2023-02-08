import { MENU, config } from "@/config";

import Head from "next/head";
import { Navbar } from "./Navbar";
import React from "react";
import { SidePanel } from "./SidePanel";
import { useUser } from "@/hooks/useUser";

export const Layout: React.FC<{
  children?: React.ReactNode;
  title?: string;
}> = ({ children, title }) => {
  const { user, isLoading, logOut } = useUser();
  return (
    <div className={`h-screen bg-gray-200`}>
      <Head>
        <title>{`${title} | ${config.APP_NAME}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        picture={user?.image}
        username={user?.name}
        authLoading={isLoading}
        logOut={logOut}
      />
      <SidePanel items={MENU} />
      <main
        className={`fixed bottom-0 top-16 left-24 right-0 overflow-y-auto bg-gray-200 p-2`}
      >
        {children}
      </main>
    </div>
  );
};
