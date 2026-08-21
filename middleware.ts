import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_HINT_COOKIE = "kp_has_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSessionHint = request.cookies.has(SESSION_HINT_COOKIE);
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAdminRoute && !hasSessionHint) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthPage && hasSessionHint) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
