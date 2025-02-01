import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  console.log(req.auth?.user);
  if (
    req.auth?.user?.role !== "ADMIN" &&
    req.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
});
