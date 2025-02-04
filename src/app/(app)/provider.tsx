"use client";

import { getNextPageOfProducts } from "@/actions/products";
import type { ProductWithCategory } from "@/types/product";
import React from "react";

export type AppContextType = {
  pagination: {
    products: ProductWithCategory[];
    nextCursor: string | null;
  };

  loadMore: () => Promise<void>;
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({
  children,
  initialValues,
}: Readonly<{
  initialValues?: {
    products: ProductWithCategory[];
    nextCursor: string | null;
  };
  children: React.ReactNode;
}>) => {
  const [pagination, setPagination] = React.useState({
    products: initialValues?.products || [],
    nextCursor: initialValues?.nextCursor || null,
  });

  const loadMore = async () => {
    if (!pagination.nextCursor) return;
    const data = await getNextPageOfProducts(pagination.nextCursor);
    setPagination((prev) => ({
      products: [...prev.products, ...data.products],
      nextCursor: data.nextCursor,
    }));
  };

  return (
    <AppContext.Provider value={{ pagination, loadMore }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};
