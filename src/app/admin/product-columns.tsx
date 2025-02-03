import HideImageIcon from "@mui/icons-material/HideImage";
import Avatar from "@mui/material/Avatar";
import type { GridColDef } from "@mui/x-data-grid";
import type { Category } from "@prisma/client";

export const productColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 130 },
  {
    field: "images",
    headerName: "Image",
    width: 130,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Avatar src={params.row.images[0]} alt={params.row.name}>
        <HideImageIcon />
      </Avatar>
    ),
  },
  { field: "name", headerName: "Name", width: 200 },
  { field: "description", headerName: "Description", width: 300 },
  {
    field: "price",
    headerName: "Price",
    width: 130,
    valueFormatter: (params) => `$${params}`,
  },
  { field: "stock", headerName: "Stock", width: 130 },
  {
    field: "category",
    headerName: "Category",
    width: 130,
    valueFormatter: (params: Category) => params.name,
  },
];
