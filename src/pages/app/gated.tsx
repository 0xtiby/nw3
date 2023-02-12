import React, { useState } from "react";

import { Layout } from "@/components/Layout";
import { locales } from "@/locales";
import { withAccountCheck } from "@/hoc/withAccountCheck";

const GatedPage: React.FC = () => {
  return (
    <Layout title={locales.tokenGated}>
      <div className=" bg-white rounded p-6">
        <div className="flex">
          <div className="ml-4">
            <h2 className="font-bold text-2xl tracking-tight text-gray-900 mt-1">
              Token gated page
            </h2>
            <p className=" text-gray-900 mt-4">
              This page is only accessible to users who are owner of particular
              NFT.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAccountCheck(GatedPage);
