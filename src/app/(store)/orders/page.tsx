import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { OrderItem, ShippingAddress } from "@prisma/client";
import Link from "next/link";
import OrderCard from "./_components/order-card";
import { route } from "@/config/route";

const orders = [
  {
    id: "1",
    userId: "1",
    status: "PENDING",
    total: 123.45,
    createdAt: new Date(),
    updatedAt: new Date(),
    paymentId: "",
    paymentUrl: "",
    items: [
      {
        id: "1",
        price: 12.34,
        quantity: 2,
      },
      {
        id: "2",
        name: "Product 2",
        price: 34.56,
        quantity: 1,
      },
    ] as OrderItem[],
    shippingAddress: {
      city: "San Francisco",
      country: "United States",
    } as ShippingAddress,
  },
  {
    id: "2",
    userId: "1",
    status: "SHIPPED",
    total: 234.56,
    createdAt: new Date(),
    updatedAt: new Date(),
    paymentId: "",
    paymentUrl: "",
    items: [
      {
        id: "3",
        price: 45.67,
        quantity: 3,
      },
    ] as OrderItem[],
    shippingAddress: {
      city: "Los Angeles",
      country: "United States",
    } as ShippingAddress,
  },
] as const;

export default async function OrdersPage() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <Container sx={{ my: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid key={order.id} size={{ xs: 12 }}>
              <MuiLink
                href={`${route.store.orders}/${order.id}`}
                component={Link}
                underline="none"
              >
                <OrderCard order={order} />
              </MuiLink>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
