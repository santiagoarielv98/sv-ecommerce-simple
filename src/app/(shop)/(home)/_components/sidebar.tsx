"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import dynamic from "next/dynamic";

import { getPriceRange } from "@/utils/query-params";
import type { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import DesktopSidebarLoading from "./desktop-sidebar-loading";
import MobileSidebarLoading from "./mobile-sidebar-loading";

const DesktopSidebar = dynamic(() => import("./desktop-sidebar"), {
  loading: () => <DesktopSidebarLoading />,
  ssr: false,
});
const MobileSidebar = dynamic(() => import("./mobile-sidebar"), {
  loading: () => <MobileSidebarLoading />,
  ssr: false,
});

interface SidebarProps {
  categories: Omit<Category, "deleted">[];
  range: [number, number];
}

const Sidebar = ({ categories, range }: SidebarProps) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const selectedCategory = searchParams.getAll("category");
  const priceRange = getPriceRange(searchParams, range);

  const handleFilterChange = (params: Record<string, string | string[]>) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.delete("page");

    for (const [key, value] of Object.entries(params)) {
      urlSearchParams.delete(key);
      if (Array.isArray(value)) {
        value.forEach((v) => urlSearchParams.append(key, v));
      } else {
        urlSearchParams.set(key, value);
      }
    }

    replace(`?${urlSearchParams.toString()}`, { scroll: false });
  };

  return isMobile ? (
    <MobileSidebar
      range={range}
      price={priceRange}
      categories={categories}
      selectedCategory={selectedCategory}
      onFilterChange={handleFilterChange}
    />
  ) : (
    <DesktopSidebar
      range={range}
      price={priceRange}
      categories={categories}
      selectedCategory={selectedCategory}
      onFilterChange={handleFilterChange}
    />
  );
};

export default Sidebar;
