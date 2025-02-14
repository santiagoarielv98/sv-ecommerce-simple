"use client";

import { EmptyCart } from "@/components/cart/empty-cart";
import { ROUTE } from "@/config/route";
import { useCart } from "@/hooks/use-cart";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import CartTable from "./_components/cart-table";

export default function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Container sx={{ my: 2 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <CartTable />
      <Button
        LinkComponent={Link}
        variant="contained"
        size="large"
        sx={{ mt: 4 }}
        href={ROUTE.STORE.CHECKOUT}
      >
        Proceed to Checkout
      </Button>
    </Container>
  );
}
