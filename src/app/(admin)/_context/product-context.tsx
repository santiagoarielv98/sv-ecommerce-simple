"use client";

import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import type { Product } from "@prisma/client";
import React from "react";

export type ProductRow = Product & { category: { name: string } };

type ProductContextStateType = {
  items: ProductRow[];
  total: number;
  isLoading: boolean;
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
  setItems: React.Dispatch<React.SetStateAction<ProductRow[]>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>;
  setSortModel: React.Dispatch<React.SetStateAction<GridSortModel>>;
  setFilterModel: React.Dispatch<React.SetStateAction<GridFilterModel>>;
};

export const ProductContext = React.createContext<ProductContextStateType>(
  undefined!,
);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = React.useState<ProductRow[]>([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      page: 0,
      pageSize: 20,
    });
  const [sortModel, setSortModel] = React.useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
  });

  const value = {
    items,
    total,
    isLoading,
    paginationModel,
    sortModel,
    filterModel,
    setItems,
    setTotal,
    setIsLoading,
    setPaginationModel,
    setSortModel,
    setFilterModel,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
