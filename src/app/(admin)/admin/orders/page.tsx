"use client";

import { Container, Paper, Stack, Typography } from "@mui/material";
import OrderTable from "./table";

const OrdersPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, mb: 4, display: "flex", flexGrow: 1 }}
    >
      <Paper sx={{ p: 2 }} flexGrow={1} component={Stack} spacing={2}>
        <Stack
          spacing={2}
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Orders
          </Typography>
        </Stack>

        <div style={{ flexGrow: 1 }}>
          <OrderTable />
        </div>
      </Paper>
    </Container>
  );
};

export default OrdersPage;
