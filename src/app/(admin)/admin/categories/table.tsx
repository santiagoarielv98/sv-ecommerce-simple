"use client";

import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { getCategories } from "@/lib/db/admin";
import type {
  GridColDef,
  GridFilterModel,
  GridRowId,
  GridSortModel,
} from "@mui/x-data-grid";
import type { Category } from "@prisma/client";
import type { CategoryRow } from "../../_context/category-context";

const CategoryTable = () => {
  const [rows, setRows] = React.useState<CategoryRow[]>([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 20,
  });
  const [sortModel, setSortModel] = React.useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
  });

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    const data = await getCategories({
      limit: paginationModel.pageSize,
      page: paginationModel.page + 1,
      sort: sortModel,
    });
    setIsLoading(false);
    setRows(data.items);
    setTotal(data.total);
  }, [paginationModel, sortModel]);

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
    fetchData();
  }, [fetchData, queryOptions]);

  return (
    <DataGrid
      loading={isLoading}
      rowCount={total}
      rows={rows}
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
