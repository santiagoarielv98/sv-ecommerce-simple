import React from "react";
import ProductProvider from "./_context/product-context";
import CategoryProvider from "./_context/category-context";

const AdminProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ProductProvider>
      <CategoryProvider>{children}</CategoryProvider>
    </ProductProvider>
  );
};

export default AdminProvider;
