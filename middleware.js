import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // ---------------------------------------------------------
  // 🔒 ADMIN-ONLY ROUTES
  // ---------------------------------------------------------
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // ---------------------------------------------------------
  // 🔒 LOGGED-IN USER ROUTES (ANY APPROVED USER)
  // ---------------------------------------------------------
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/user") ||
    pathname.startsWith("/app") ||
    pathname.startsWith("/account")
  ) {
    // Not logged in → block
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If still pending, do not allow
    if (token.role === "pending") {
      return NextResponse.redirect(new URL("/pending-approval", req.url));
    }
  }

  return NextResponse.next();
}

// Apply only where needed
export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",

    // Logged-in user routes
    "/dashboard/:path*",
    "/profile/:path*",
    "/user/:path*",
    "/app/:path*",
    "/account/:path*",
  ],
};
