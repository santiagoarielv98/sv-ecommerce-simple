"use client";

import type { PaginationProps } from "@mui/material/Pagination";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Link from "next/link";

const MuiPagination = (props: PaginationProps) => {
  return (
    <Pagination
      {...props}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          {...item}
          href={`?page=${item.page}`}
        />
      )}
    />
  );
};

export default MuiPagination;
