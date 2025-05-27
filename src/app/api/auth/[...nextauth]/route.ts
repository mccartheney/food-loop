import NextAuth, { User, Account } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  // providers (github and google) to login in the app
  providers: [

    Google({
      clientId: process.env.GOOGLE_CLIENT!,
      clientSecret: process.env.GOOGLE_SECRET_CLIENT!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user?.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name || profile?.name || "-",
              email: user.email,
              authMethod: "GOOGLE",
              role: "USER",
              isActive: true,
              profile: {
                create: {
                  bio: "-",
                  address: "-",
                  profileImg: user.image || (profile && "picture" in profile ? (profile as any).picture : "-") || "-",
                },
              },
            },
          });
        }
      }
      return true;
    },
    async jwt(
      { token }: { token: JWT }
    ) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
