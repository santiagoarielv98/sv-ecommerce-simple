import type { GridPaginationModel, GridSortItem } from "@mui/x-data-grid";

export type PaginationOptions = GridPaginationModel &
  GridSortItem & { searchQuery?: string };
