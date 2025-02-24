"use client";

import { getAllCategories } from "@/lib/db/admin";
import { Add } from "@mui/icons-material";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import type { Category } from "@prisma/client";
import React from "react";
import CreateProductModal from "../../_components/modals/create-product-modal";
import ProductTable from "./table";

const ProductsPage = () => {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, mb: 4, display: "flex", flexGrow: 1 }}
    >
      <Paper sx={{ p: 2 }} flexGrow={1} component={Stack} spacing={4}>
        <Stack
          spacing={2}
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <Typography variant="h5" component="h2">
            Productos
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
            Nuevo Producto
          </Button>
        </Stack>

        <div style={{ height: 700, width: "100%" }}>
          <ProductTable />
        </div>
      </Paper>
      <CreateProductModal
        open={open}
        onClose={handleClose}
        categories={categories}
      />
    </Container>
  );
};

export default ProductsPage;
