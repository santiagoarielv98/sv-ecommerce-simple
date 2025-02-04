"use client";

import { useProductTable } from "@/hooks/use-product-table";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { ProductPaginatedResult } from "@/types/product";
import { productColumns } from "./product-columns";

export default function ProductTable({
  initialValue,
}: {
  initialValue: ProductPaginatedResult;
}) {
  const {
    items,
    isLoading,
    searchQuery,
    paginationModel,
    sortModel,
    handleSearchChange,
    handleSortModelChange,
    handlePageChange,
  } = useProductTable(initialValue);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <DataGrid
        rows={items}
        columns={productColumns}
        pagination
        paginationMode="server"
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        rowCount={initialValue.totalProducts}
        pageSizeOptions={[25, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePageChange}
        loading={isLoading}
        checkboxSelection
      />
    </Box>
  );
}
