"use client";

import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import type {
  GridColDef,
  GridFilterModel,
  GridRowId,
  GridSortModel,
} from "@mui/x-data-grid";
import type { Product } from "@prisma/client";
import { getProducts } from "@/lib/db/product";

type Row = Product & { category: { name: string } };

type Props = {
  initialState: {
    products: Row[];
    total: number;
    pages: number;
    currentPage: number;
  };
};

const ProductTable = ({ initialState }: Props) => {
  const [paginationModel, setPaginationModel] = React.useState({
    page: initialState.currentPage - 1,
    pageSize: initialState.products.length,
  });
  const [sortModel, setSortModel] = React.useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
  });

  const queryOptions = React.useMemo(
    () => ({ ...paginationModel, sortModel, filterModel }),
    [paginationModel, sortModel, filterModel],
  );

  const { isLoading, rows, pageInfo } = useProductQuery(queryOptions);

  const deleteUser = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        console.log("Deleting user", id);
      });
    },
    [],
  );

  const columns = React.useMemo<GridColDef<Row>[]>(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      { field: "name", headerName: "Nombre", width: 200 },
      {
        field: "price",
        headerName: "Precio",
        width: 130,
        valueGetter: (params) => `$${params}`,
      },
      { field: "stock", headerName: "Stock", width: 130 },
      {
        field: "category",
        headerName: "Categoría",

        valueGetter: (params: Row["category"]) => params.name,
        width: 130,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Acciones",
        width: 80,
        sortable: false,
        getActions: (params: Product) => [
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
        ],
      },
    ],
    [deleteUser],
  );
  return (
    <DataGrid
      rowCount={initialState.total}
      rows={initialState.products}
      columns={columns}
      pageSizeOptions={[20]}
      paginationModel={paginationModel}
      sortModel={sortModel}
      filterModel={filterModel}
      paginationMode="server"
      sortingMode="server"
      filterMode="server"
      checkboxSelection
      disableRowSelectionOnClick
      onPaginationModelChange={setPaginationModel}
      onSortModelChange={setSortModel}
      onFilterModelChange={setFilterModel}
    />
  );
};

type ProductQuery = {
  isLoading: boolean;
  rows: Row[];
  pageInfo: {
    total: number;
    pages: number;
    currentPage: number;
  };
};

export const useProductQuery = (options: {
  page: number;
  pageSize: number;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
}): ProductQuery => {
  const isMounted = React.useRef(true);

  const [data, setData] = React.useState<ProductQuery>({
    isLoading: true,
    rows: [],
    pageInfo: {
      total: 0,
      pages: 0,
      currentPage: 1,
    },
  });

  const fetchData = async () => {
    const data = await getProducts({
      limit: options.pageSize,
      page: options.page + 1,
    });
    setData({
      isLoading: false,
      rows: data.products,
      pageInfo: {
        total: data.total,
        pages: data.pages,
        currentPage: options.page + 1,
      },
    });
  };

  React.useEffect(() => {
    if (!isMounted.current) {
      fetchData();
    }
  }, [options]);

  React.useEffect(() => {
    isMounted.current = false;
  }, []);

  return data;
};
export default ProductTable;
