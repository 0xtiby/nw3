import { NextResponse } from "next/server";
import { routes } from "./routes";
import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith("/app/gated") &&
    !req.nextauth.token?.isOwner
  ) {
    return NextResponse.redirect(new URL(routes.unauthorized, req.url));
  }
});

export const config = {
  matcher: ["/app/:path*"],
};
