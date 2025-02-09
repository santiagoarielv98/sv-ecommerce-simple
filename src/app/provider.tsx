import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { auth } from "@/lib/auth";
import theme from "@/lib/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { CartProvider } from "@/contexts/cart-context";
import { CartProvider as CartProvider2 } from "@/contexts/cart";

const RootProvider = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <CartProvider>
        <CartProvider2>
          <AppRouterCacheProvider options={{ key: "css" }}>
            <GlobalStyles
              styles={{
                "html, body": {
                  height: "100%",
                  width: "100%",
                },
              }}
            />
            <CssBaseline />
            <ThemeProvider theme={theme} defaultMode="system">
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </CartProvider2>
      </CartProvider>
    </SessionProvider>
  );
};

export default RootProvider;
