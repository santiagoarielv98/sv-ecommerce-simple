import NextAuth from "next-auth";
import { ROUTE } from "./config/route";
import authConfig from "./lib/auth.config";

const protectedRoutes = [
  ROUTE.STORE.CHECKOUT,
  ROUTE.STORE.ORDERS,
  ROUTE.STORE.PRODUCTS,
  ROUTE.STORE.CART,
  ROUTE.ADMIN.BASE,
];

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (
    !req.auth &&
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    if (!req.auth) {
      const newUrl = new URL(ROUTE.AUTH.LOGIN, req.nextUrl.origin);
      newUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return Response.redirect(newUrl);
    }
  }
  // const isAdmin = req.auth?.user?.role === "ADMIN";
  // if (!isAdmin && req.nextUrl.pathname.startsWith(ROUTE.ADMIN.BASE)) {
  //   const newUrl = new URL(ROUTE.HOME, req.nextUrl.origin);
  //   return Response.redirect(newUrl);
  // }
});
