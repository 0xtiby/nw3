import React, { useState } from "react";

import { Error } from "@/components/Error";
import { Layout } from "@/components/Layout";
import { locales } from "@/locales";
import { withAccountCheck } from "@/hoc/withAccountCheck";

const GatedPage: React.FC = () => {
  return (
    <Layout title={locales.profile}>
      <div className="mx-auto max-w-xl">
        <Error
          title={locales.unauthorized}
          message={locales.unauthorizedMessage}
        />
      </div>
    </Layout>
  );
};

export default withAccountCheck(GatedPage);
