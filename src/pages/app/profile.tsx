import React, { useState } from "react";

import Image from "next/image";
import { Layout } from "@/components/Layout";
import { locales } from "@/locales";
import { useBalance } from "wagmi";
import { useUser } from "@/hooks/useUser";
import { withAccountCheck } from "@/hoc/withAccountCheck";

const ProfilePage: React.FC = () => {
  const { user } = useUser();

  const { data } = useBalance({
    address: user?.address as `0x${string}`,
    enabled: !!user?.address,
  });

  return (
    <Layout title={locales.profile}>
      <div className=" bg-white rounded p-6">
        <div className="flex">
          <Image
            className="rounded-full"
            width={60}
            height={60}
            src={`data:image/png;base64,${user?.image}`}
            alt="identicon"
            unoptimized
          />
          <div className="ml-4">
            <h2 className="font-bold tracking-tight text-gray-900 mt-1">
              {user?.address}
            </h2>
            {data ? (
              <p className=" text-gray-900 ">{`Balance : ${data?.formatted} ${data?.symbol}`}</p>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAccountCheck(ProfilePage);
