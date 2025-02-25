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
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography variant="h5" component="h2">
            Categories
          </Typography>
          <Button
            size="small"
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpen}
          >
            New Category
          </Button>
        </Stack>
        <div style={{ height: 700, width: "100%" }}>
          <OrderTable />
        </div>
      </Paper>
      <CreateCategoryModal open={open} onClose={handleClose} />
    </Container>
  );
};

export default CategoriesPage;
