import type { ProductSearchParams } from "@/types/page";

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
