"use client";

import { Container, Paper, Stack, Typography } from "@mui/material";
import OrderTable from "./table";

const OrdersPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, mb: 4, display: "flex", flexGrow: 1, overflow: "hidden" }}
    >
      <Paper
        sx={{ p: 2, width: "100%" }}
        flexGrow={1}
        component={Stack}
        spacing={4}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Orders
        </Typography>

        <div style={{ height: 700, width: "100%" }}>
          <OrderTable />
        </div>
      </Paper>
    </Container>
  );
};

export default OrdersPage;
