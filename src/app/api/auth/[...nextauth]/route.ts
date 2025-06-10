import NextAuth, { User, Account, Session } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { prisma } from "@/lib/prisma"; // Import prisma from your lib
import { AuthMethod, UserRole } from "@prisma/client"; // Import enums

const handler = NextAuth({
  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JWT configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Secret for signing tokens
  secret: process.env.NEXTAUTH_SECRET,

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
      if (account?.provider === "google") {
        if (!user.email) {
          // Google account must have an email
          return false;
        }

        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || "Google User", // Fallback if name is not provided
                authMethod: AuthMethod.GOOGLE,
                role: UserRole.USER, // Default role
                isActive: true,
                profile: {
                  create: {
                    profileImg: user.image, // Google profile picture
                  },
                },
              },
            });
          }
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false; // Prevent sign-in on error
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and user id to the token right after signin
      if (account && user) {
        token.accessToken = account.access_token;
        token.userId = user.id;
        
        // Get user data from database
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
            include: { profile: true },
          });
          
          if (dbUser) {
            token.dbUserId = dbUser.id;
            token.role = dbUser.role;
            token.isActive = dbUser.isActive;
          }
        } catch (error) {
          console.error("Error fetching user from database:", error);
        }
      }
      
      return token;
    },

    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.userId as string;
        session.user.dbUserId = token.dbUserId as string;
        session.user.role = token.role as UserRole;
        session.user.isActive = token.isActive as boolean;
        session.accessToken = token.accessToken;
      }
      
      return session;
    },
  },

  // Pages configuration
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },

  // Events for debugging
  events: {
    async signOut(message) {
      console.log("User signed out:", message);
    },
    async session(message) {
      console.log("Session accessed:", message);
    },
  },

  // Debug mode for development
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };


// prima/@prisma/client
