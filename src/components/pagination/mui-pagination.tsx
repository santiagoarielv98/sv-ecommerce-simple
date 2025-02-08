"use client";

import type { PaginationProps } from "@mui/material/Pagination";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const MuiPagination = (props: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);

  return (
    <Pagination
      {...props}
      renderItem={(item) => {
        urlSearchParams.set("page", item.page?.toString() ?? "1");

        return (
          <PaginationItem
            component={Link}
            {...item}
            href={{
              pathname,
              search: urlSearchParams.toString(),
            }}
          />
        );
      }}
    />
  );
};

export default MuiPagination;
