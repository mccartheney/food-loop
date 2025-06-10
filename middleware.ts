import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
    console.log("Middleware: Processing request for", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user has a valid token
        if (!token) {
          console.log("Middleware: No token found for", req.nextUrl.pathname);
          return false;
        }

        // Check if user is active
        if (token.isActive === false) {
          console.log("Middleware: Inactive user trying to access", req.nextUrl.pathname);
          return false;
        }

        console.log("Middleware: Authorized access for", token.email, "to", req.nextUrl.pathname);
        return true;
      },
    },
    pages: {
      signIn: "/auth/login",
      error: "/auth/error",
    },
  }
);

export const config = {
  matcher: [
    // Protect all routes under /app
    "/app/:path*",
    // Protect API routes except auth
    "/api/friends/:path*",
    "/api/me/:path*",
    "/api/messages/:path*",
    "/api/notifications/:path*",
    "/api/pantry/:path*",
    "/api/profile/:path*",
    "/api/recipes/:path*",
    "/api/upload/:path*",
    "/api/users/:path*",
  ],
};
