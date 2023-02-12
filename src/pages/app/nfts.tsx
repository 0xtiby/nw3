import { NftCard, Placeholder } from "@/components/Nft";
import React, { useState } from "react";

import { Layout } from "@/components/Layout";
import { locales } from "@/locales";
import { useNfts } from "@/hooks/useNfts";
import { useSession } from "next-auth/react";
import { withAccountCheck } from "@/hoc/withAccountCheck";

const NftsPage: React.FC = () => {
  const { data, status } = useSession();
  const { total, nfts, isLoading } = useNfts(data?.user.address);

  return (
    <Layout title={locales.nfts}>
      <div className=" bg-white rounded p-6">
        <div className="flex">
          <div className="ml-4">
            <h2 className="font-bold text-2xl tracking-tight text-gray-900 mt-1">
              {`${locales.nfts} (${total})`}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {isLoading || status === "loading" ? (
                <Placeholder />
              ) : (
                <>
                  {nfts?.map((nft) => (
                    <NftCard
                      key={`${nft.contract}-${nft.tokenId}`}
                      name={nft.rawMetadata?.name}
                      price={nft.contract.openSea?.floorPrice}
                      thumbnail={nft.media[0].thumbnail}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAccountCheck(NftsPage);
