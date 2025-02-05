import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CartTable from "./components/cart-table";
import { EmptyCart } from "./components/empty-cart";
import type { OrderItem, Product } from "@prisma/client";

const items = [
  {
    id: "1",
    product: { id: "1", name: "Product 1", price: 10 },
    quantity: 1,
  } as OrderItem & { product: Product },
  {
    id: "2",
    product: { id: "2", name: "Product 2", price: 20 },
    quantity: 2,
  } as OrderItem & { product: Product },
];

export default async function CartPage() {
  await new Promise((resolve) => setTimeout(resolve, 250));
  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Container sx={{ my: 2 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <CartTable items={items} />
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 4 }}
        href="/checkout"
      >
        Proceed to Checkout
      </Button>
    </Container>
  );
}
