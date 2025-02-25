"use client";

import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import OrderTable from "./table";
import { Add } from "@mui/icons-material";
import React from "react";
import CreateCategoryModal from "../../_components/modals/create-category-modal";

const CategoriesPage = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
            Nueva Categoría
          </Button>
        </Stack>
        <div style={{ flexGrow: 1 }}>
          <OrderTable />
        </div>
      </Paper>
      <CreateCategoryModal open={open} onClose={handleClose} />
    </Container>
  );
};

export default CategoriesPage;
