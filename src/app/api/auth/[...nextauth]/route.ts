import NextAuth, { User, Account } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { prisma } from "@/lib/prisma"; // Import prisma from your lib
import { AuthMethod, UserRole } from "@prisma/client"; // Import enums

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
      if (account?.provider === "google") {
        if (!user.email) {
          // Google account must have an email
          return false;
        }

        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { profile: true },
          });

          if (!existingUser) {
            // Create new user with Google profile
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
          } else {
            // Update existing user's name and profile image if they've changed
            const updates: any = {};
            if (user.name && user.name !== existingUser.name) {
              updates.name = user.name;
            }

            if (Object.keys(updates).length > 0) {
              await prisma.user.update({
                where: { email: user.email },
                data: updates,
              });
            }

            // Update profile image if it's different or create profile if it doesn't exist
            if (user.image) {
              if (!existingUser.profile) {
                // Create profile if it doesn't exist
                await prisma.profile.create({
                  data: {
                    userId: existingUser.id,
                    profileImg: user.image,
                  },
                });
              } else if (user.image !== existingUser.profile.profileImg) {
                // Update profile image if it's different
                await prisma.profile.update({
                  where: { id: existingUser.profile.id },
                  data: {
                    profileImg: user.image,
                  },
                });
              }
            }
          }
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false; // Prevent sign-in on error
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


// prima/@prisma/client
