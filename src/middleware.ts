import { auth } from "@/lib/auth";

const authRoute = ["/admin", "/api"];

export default auth((req) => {
  const isAdmin = req.auth?.user?.role === "ADMIN";

  const isAuthRoute = authRoute.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (!isAdmin && isAuthRoute) {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin);

    return Response.redirect(newUrl, 302);
  }
});
