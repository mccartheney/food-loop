import { UserRole } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      dbUserId: string;
      role: UserRole;
      isActive: boolean;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User extends DefaultUser {
    id: string;
    dbUserId?: string;
    role?: UserRole;
    isActive?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId?: string;
    dbUserId?: string;
    role?: UserRole;
    isActive?: boolean;
    accessToken?: string;
  }
}
