import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { auth } from "@/lib/auth";
import theme from "@/lib/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import React from "react";

const RootProvider = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <AppRouterCacheProvider options={{ key: "css" }}>
        <CssBaseline />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  );
};

export default RootProvider;
