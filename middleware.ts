export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"],
};
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === "admin",
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
