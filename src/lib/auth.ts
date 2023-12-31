import { DefaultSession, getServerSession, type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import DiscordProvider from "next-auth/providers/discord";
import prisma from "./prisma";
import { ProfileColor } from "@prisma/client";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }
  interface User {
    id: string;
    profileColor: ProfileColor;
  }
}


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({session,user}) => {
      if (session?.user) {
        session.user.id = user.id;
        session.user.profileColor = user.profileColor;
      }
      return session;
    }
  }
};


export const getAuthSession = () => getServerSession(authOptions);