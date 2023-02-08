import CredentialsProvider, {
  CredentialInput,
} from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";

import Identicon from "identicon.js";
import { OwnerShipService } from "@/services/ownership";
import { SiweMessage } from "siwe";
import { config } from "@/config";
import { formatAddress } from "@/utils";
import { getCsrfToken } from "next-auth/react";
import { locales } from "@/locales";
import { routes } from "@/routes";

export const siweAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        } as CredentialInput,
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials, req) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const nextAuthUrl = new URL(config.NEXTAUTH_URL);
          const crsf = await getCsrfToken({ req } as any);
          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: crsf,
          });
          if (result.success) {
            return {
              id: siwe.address,
              image: new Identicon(siwe.address).toString(),
              address: siwe.address,
              name: formatAddress(siwe.address),
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: routes.signIn,
  },
  session: {
    strategy: "jwt",
  },
  secret: config.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.address = user.address;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.address = token.address;
      return session;
    },
  },
};

export const siweTokenGatedAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        } as CredentialInput,
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials, req) {
        const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"));
        const nextAuthUrl = new URL(config.NEXTAUTH_URL);
        const crsf = await getCsrfToken({ req } as any);
        const result = await siwe.verify({
          signature: credentials?.signature || "",
          domain: nextAuthUrl.host,
          nonce: crsf,
        });

        if (result.success) {
          const owernshipResult = await OwnerShipService.verifyOwnership(
            siwe.address
          );
          if (
            config.TOKEN_GATED_REQUIRED_TO_LOGIN &&
            !owernshipResult.isOwner
          ) {
            throw new Error(
              `${locales.tokenRequired} : ${config.TOKEN_GATED_ADDRESS}`
            );
          }

          return {
            id: siwe.address,
            image: new Identicon(siwe.address).toString(),
            address: siwe.address,
            name: formatAddress(siwe.address),
            isOwner: owernshipResult.isOwner,
            lastValidation: owernshipResult.lastValidation,
          } as User;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: routes.signIn,
  },
  session: {
    strategy: "jwt",
  },
  secret: config.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.address = user.address;
        token.isOwner = (user as any).isOwner;
        token.lastValidation = Date.now();
      } else {
        const owernshipResult = await OwnerShipService.verifyIfNeeded(
          token.address,
          token.lastValidation,
          token.isOwner
        );
        token.isOwner = owernshipResult.isOwner;
        token.lastValidation = owernshipResult.lastValidation;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.address = token.address;
      return session;
    },
  },
};
