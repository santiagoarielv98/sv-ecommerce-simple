import { CartProvider } from "@/contexts/cart-context";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

const RootProvider = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
};

export default RootProvider;
