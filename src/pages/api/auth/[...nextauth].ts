import NextAuth, { NextAuthOptions } from "next-auth";
import { siweAuthOptions, siweTokenGatedAuthOptions } from "@/config/next-auth";

import { config } from "@/config";

export const authOptions: NextAuthOptions = config.TOKEN_GATED
  ? siweTokenGatedAuthOptions
  : siweAuthOptions;

export default NextAuth(authOptions);
