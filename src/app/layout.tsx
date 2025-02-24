import React from "react";

import { Raleway } from "next/font/google";

import theme from "@/lib/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import RootProvider from "./provider";

import type { Metadata } from "next";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SV - Ecommerce",
  description: "A simple ecommerce website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
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
            <RootProvider>{children}</RootProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
