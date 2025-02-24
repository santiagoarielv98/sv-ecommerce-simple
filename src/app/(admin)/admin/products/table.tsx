"use client";

import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import Avatar from "@mui/material/Avatar";
import type { GridColDef, GridRowId } from "@mui/x-data-grid";
import type { Product } from "@prisma/client";
import useProduct from "../../_hooks/use-product";
import type { ProductRow } from "../../_context/product-context";

const ProductTable = () => {
  const {
    fetchData,
    isLoading,
    items,
    total,
    paginationModel,
    sortModel,
    filterModel,
    setPaginationModel,
    setSortModel,
    setFilterModel,
  } = useProduct();

  const queryOptions = React.useMemo(
    () => ({ ...paginationModel, sortModel, filterModel }),
    [paginationModel, sortModel, filterModel],
  );

  const deleteUser = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        console.log("Deleting user", id);
      });
    },
    [],
  );

  const columns = React.useMemo<GridColDef<ProductRow>[]>(
    () => [
      { field: "id", headerName: "ID", width: 215 },
      {
        field: "image",
        headerName: "Imagen",
        maxWidth: 80,
        flex: 1,
        renderCell: (params) => (
          <Avatar src={params.row.images[0]} alt={params.row.name} />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Nombre", flex: 1, minWidth: 200 },
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
        valueGetter: (params: ProductRow["category"]) => params.name,
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

  React.useEffect(() => {
    fetchData();
  }, [fetchData, queryOptions]);

  return (
    <DataGrid
      loading={isLoading}
      rowCount={total}
      rows={items}
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

export default ProductTable;
