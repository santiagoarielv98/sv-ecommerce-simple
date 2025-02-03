"use client";

import { getProductsPage } from "@/actions/products";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import type {
  GridColDef,
  GridPaginationModel,
  GridSortDirection,
  GridSortModel,
} from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import type { Category, Product } from "@prisma/client";
import React from "react";
import debounce from "lodash/debounce";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "description", headerName: "Description", width: 300 },
  {
    field: "price",
    headerName: "Price",
    width: 130,
    valueFormatter: (params) => `$${params}`,
  },
  { field: "stock", headerName: "Stock", width: 130 },
  { field: "categoryId", headerName: "Category ID", width: 130 },
];

export interface AdminDashboardProps {
  initialValue: {
    products: Array<Product & { category: Category }>;
    totalProducts: number;
    pageSize: number;
    page: number;
  };
}

export default function ProductTable({ initialValue }: AdminDashboardProps) {
  const [items, setItems] = React.useState<Product[]>(initialValue.products);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [paginationModel, setPaginationModel] = React.useState({
    page: initialValue.page,
    pageSize: initialValue.pageSize,
  });
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: "id",
      sort: "desc",
    },
  ]);

  const fetchData = async (
    page: number,
    pageSize: number,
    sort = "id",
    order: GridSortDirection = "desc",
    search = "",
  ) => {
    setIsLoading(true);
    try {
      const response = await getProductsPage({
        page,
        pageSize,
        field: sort,
        sort: order as GridSortDirection,
        searchQuery: search,
      });
      setPaginationModel({ page: response.page, pageSize: response.pageSize });
      setItems(response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = React.useMemo(
    () =>
      debounce((query: string) => {
        fetchData(
          0,
          paginationModel.pageSize,
          sortModel[0]?.field,
          sortModel[0]?.sort,
          query,
        );
      }, 500),
    [paginationModel.pageSize, sortModel],
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  const handleSortModelChange = (newModel: GridSortModel) => {
    setSortModel(newModel);
    if (newModel.length > 0) {
      fetchData(
        paginationModel.page,
        paginationModel.pageSize,
        newModel[0].field,
        newModel[0].sort,
        searchQuery,
      );
    }
  };

  const handlePageChange = (model: GridPaginationModel) => {
    fetchData(
      model.page,
      model.pageSize,
      sortModel[0]?.field,
      sortModel[0]?.sort,
      searchQuery,
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <DataGrid
        rows={items}
        columns={columns}
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
