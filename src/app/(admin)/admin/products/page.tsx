"use client";

import { Add } from "@mui/icons-material";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import CreateProductModal from "../../_components/modals/create-product-modal";
import ProductTable from "./table";
import useCategory from "../../_hooks/use-category";

const ProductsPage = () => {
  const { fetchData } = useCategory();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <Stack
          spacing={2}
          justifyContent="space-between"
          direction="row"
          flexWrap="wrap"
          alignItems="center"
        >
          <Typography variant="h5" component="h2">
            Products
          </Typography>
          <Button
            size="small"
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpen}
          >
            Add Product
          </Button>
        </Stack>

        <div style={{ height: 700, width: "100%" }}>
          <ProductTable />
        </div>
      </Paper>
      <CreateProductModal open={open} onClose={handleClose} />
    </Container>
  );
};

export default ProductsPage;
