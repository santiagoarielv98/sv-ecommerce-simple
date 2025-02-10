import { ROUTE } from "@/config/route";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import OrderCard from "./_components/order-card";
import { getOrders } from "@/lib/db/order";

export default async function OrdersPage() {
  const orders = await getOrders();

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
                href={`${ROUTE.STORE.ORDERS}/${order.id}`}
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
