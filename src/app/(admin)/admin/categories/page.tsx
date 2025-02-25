"use client";

import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import OrderTable from "./table";
import { Add } from "@mui/icons-material";

const CategoriesPage = () => {
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
          <Typography variant="h5" component="h2">
            Categorías
          </Typography>
          <Button variant="contained" startIcon={<Add />}>
            Nueva Categoría
          </Button>
        </Stack>
        <div style={{ flexGrow: 1 }}>
          <OrderTable />
        </div>
      </Paper>
    </Container>
  );
};

export default CategoriesPage;
