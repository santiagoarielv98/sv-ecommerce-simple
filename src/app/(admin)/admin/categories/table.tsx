"use client";

import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import type { GridColDef, GridRowId } from "@mui/x-data-grid";
import type { Category } from "@prisma/client";
import type { CategoryRow } from "../../_context/category-context";
import useCategory from "../../_hooks/use-category";

const CategoryTable = () => {
  const {
    items,
    total,
    isLoading,
    fetchDataTable,
    paginationModel,
    sortModel,
    filterModel,
    setPaginationModel,
    setSortModel,
    setFilterModel,
  } = useCategory();
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

  const columns = React.useMemo<GridColDef<CategoryRow>[]>(
    () => [
      { field: "id", headerName: "ID Orden", width: 100 },
      {
        field: "name",
        headerName: "Nombre",
        width: 200,
      },
      {
        field: "_count",
        headerName: "Productos",
        width: 200,
        valueGetter: (params: CategoryRow["_count"]) => params.products,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Acciones",
        width: 80,
        sortable: false,
        getActions: (params: Category) => [
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
    fetchDataTable();
  }, [fetchDataTable, queryOptions]);

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

export default CategoryTable;
