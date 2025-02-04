import type { Category, Product } from "@prisma/client";
import type { GridSortDirection } from "@mui/x-data-grid";

export interface ProductWithCategory extends Product {
  category: Category;
}

export interface PaginationOptions {
  page?: number;
  pageSize?: number;
  field?: string;
  sort?: GridSortDirection;
  searchQuery?: string;
}

export interface PaginatedResult {
  products: ProductWithCategory[];
  totalProducts: number;
  pageSize: number;
  page: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  images: string[];
}
