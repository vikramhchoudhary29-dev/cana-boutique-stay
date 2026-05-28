import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
const adminLoggedIn = request.cookies.get("hotel-admin")?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  const isLoginPage =
    request.nextUrl.pathname === "/admin/login" ||
    request.nextUrl.pathname === "/login";

  if (isAdminRoute && !isLoginPage && adminLoggedIn !== "true") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};