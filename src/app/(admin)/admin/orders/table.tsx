"use client";

import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { getOrders } from "@/lib/db/admin";
import Chip from "@mui/material/Chip";
import type {
  GridColDef,
  GridFilterModel,
  GridRowId,
  GridSortModel,
} from "@mui/x-data-grid";
import type { Order } from "@prisma/client";
import { getStatusColor } from "@/utils/order";

type Row = Order & { user: { name: string | null }; _count: { items: number } };

const OrderTable = () => {
  const [rows, setRows] = React.useState<Row[]>([]);
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
    const data = await getOrders({
      limit: paginationModel.pageSize,
      page: paginationModel.page + 1,
      sort: sortModel,
    });
    setIsLoading(false);
    setRows(data.items as Row[]);
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

  const columns = React.useMemo<GridColDef<Row>[]>(
    () => [
      { field: "id", headerName: "ID Orden", width: 100 },
      {
        field: "user",
        headerName: "Cliente",
        width: 200,
        valueGetter: (params: Row["user"]) => params.name ?? "Desconocido",
      },
      { field: "createdAt", headerName: "Fecha", width: 130 },
      {
        field: "_count",
        headerName: "Items",
        width: 90,
        valueGetter: (params: Row["_count"]) => params.items,
      },
      {
        field: "status",
        headerName: "Estado",
        width: 130,
        renderCell: (params) => (
          <Chip
            label={params.value}
            color={getStatusColor(params.value)}
            size="small"
          />
        ),
      },
      {
        field: "total",
        headerName: "Total",
        width: 130,
        valueFormatter: (params: number) => `$${params.toFixed(2)}`,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Acciones",
        width: 80,
        sortable: false,
        getActions: (params: Order) => [
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

export default OrderTable;
