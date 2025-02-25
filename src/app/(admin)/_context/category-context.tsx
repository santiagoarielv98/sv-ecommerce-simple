"use client";

import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import type { Category } from "@prisma/client";
import React from "react";

export type CategoryRow = Omit<Category, "deleted"> & {
  _count: { products: number };
};

type CategoryContextStateType = {
  categories: Category[];
  items: CategoryRow[];
  total: number;
  isLoading: boolean;
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setItems: React.Dispatch<React.SetStateAction<CategoryRow[]>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>;
  setSortModel: React.Dispatch<React.SetStateAction<GridSortModel>>;
  setFilterModel: React.Dispatch<React.SetStateAction<GridFilterModel>>;
};

export const CategoryContext = React.createContext<CategoryContextStateType>(
  undefined!,
);

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [items, setItems] = React.useState<CategoryRow[]>([]);
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
    categories,
    items,
    total,
    isLoading,
    paginationModel,
    sortModel,
    filterModel,
    setCategories,
    setItems,
    setTotal,
    setIsLoading,
    setPaginationModel,
    setSortModel,
    setFilterModel,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
