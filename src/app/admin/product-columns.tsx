import HideImageIcon from "@mui/icons-material/HideImage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, IconButton } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import type { Category } from "@prisma/client";
import Link from "next/link";

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
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <>
        <IconButton
          component={Link}
          href={`/admin/products/${params.row.id}`}
          size="small"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            if (confirm("Are you sure you want to delete this product?")) {
              // Handle delete - you'll need to implement this
              fetch(`/api/products/${params.row.id}`, { method: "DELETE" })
                .then(() => window.location.reload())
                .catch(console.error);
            }
          }}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];
