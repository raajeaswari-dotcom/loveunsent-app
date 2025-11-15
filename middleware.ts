import { withAuth } from "next-auth/middleware";

// Protect admin routes only
export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === "admin",
  },
});

// Next.js middleware config (must export only ONCE)
export const config = {
  matcher: ["/dashboard/:path*"],
};
