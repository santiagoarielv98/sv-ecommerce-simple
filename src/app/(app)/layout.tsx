import Navbar from "@/components/navbar";
import { CartProvider } from "@/contexts/cart-context";
import Toolbar from "@mui/material/Toolbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SV - Ecommerce",
  description: "A simple ecommerce website",
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <Navbar />
      <Toolbar />

      {children}
    </CartProvider>
  );
}
