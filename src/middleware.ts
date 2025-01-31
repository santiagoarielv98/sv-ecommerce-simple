import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // if (
  //   req.nextUrl.pathname.startsWith("/admin") &&
  //   req.auth?.user?.role !== "ADMIN"
  // ) {
  //   return NextResponse.redirect(new URL("/auth/signin", req.url));
  // }
  // if (req.nextUrl.pathname.startsWith("/auth") && req.auth?.user) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
});
