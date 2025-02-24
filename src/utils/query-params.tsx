import type { ProductSearchParams } from "@/types/page";
import type { ReadonlyURLSearchParams } from "next/navigation";

export interface ParsedQueryParams {
  page: number;
  category: string[];
  minPrice: number;
  maxPrice: number;
}

export const parseQueryParams = (
  searchParams: ProductSearchParams,
): ParsedQueryParams => {
  const page = parseInt(searchParams.page) || 1;
  const category = searchParams.category
    ? Array.isArray(searchParams.category)
      ? searchParams.category
      : [searchParams.category]
    : [];
  const minPrice = parseInt(searchParams.minPrice) || 0;
  const maxPrice = parseInt(searchParams.maxPrice) || 0;

  return {
    page,
    category,
    minPrice,
    maxPrice,
  };
};
export const getPriceRange = (
  searchParams: ReadonlyURLSearchParams,
  range: [number, number] = [0, 0],
) => {
  const minPrice = parseInt(searchParams.get("minPrice") || "");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "");

  const min = isNaN(minPrice) ? range[0] : minPrice;
  const max = isNaN(maxPrice) ? range[1] : maxPrice;

  return [min, max] as [number, number];
};
