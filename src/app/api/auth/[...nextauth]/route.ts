import NextAuth, { User, Account } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
  // providers (github and google) to login in the app
  providers: [

    Google({
      clientId: process.env.GOOGLE_CLIENT!,
      clientSecret: process.env.google_secret_client!,
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
    async jwt(
      { token }: { token: JWT }
    ) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };


// prima/@prisma/client