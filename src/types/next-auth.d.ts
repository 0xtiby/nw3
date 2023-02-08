import NextAuth, { DefaultSession } from "next-auth";

interface IUser {
  address: string;
  isOwner?: boolean | null;
  lastValidation?: number | null;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
