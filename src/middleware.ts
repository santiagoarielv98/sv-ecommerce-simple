import NextAuth from "next-auth";
import { ROUTE } from "./config/route";
import authConfig from "./lib/auth.config";

const protectedRoutes = [
  ROUTE.STORE.CHECKOUT,
  ROUTE.STORE.ORDERS,
  ROUTE.STORE.PRODUCTS,
  ROUTE.STORE.CART,
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
});
