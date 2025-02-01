import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { Raleway } from "next/font/google";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/lib/theme";
import { CartProvider } from "@/contexts/cart-context";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "SV - Ecommerce",
  description: "A simple ecommerce website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <SessionProvider session={session}>
          <AppRouterCacheProvider options={{ key: "css" }}>
            <ThemeProvider theme={theme}>
              <CartProvider>
                <Navbar />
                {children}
              </CartProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
