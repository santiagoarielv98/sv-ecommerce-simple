import { getProducts } from "@/lib/db/admin";
import React from "react";
import { ProductContext } from "../_context/product-context";

const useProduct = () => {
  const context = React.useContext(ProductContext);

  const { setItems, setTotal, setIsLoading, paginationModel, sortModel } =
    context;

  const fetchData = React.useCallback(async () => {
    console.log("fetch");
    setIsLoading(true);
    const data = await getProducts({
      limit: paginationModel.pageSize,
      page: paginationModel.page + 1,
      sort: sortModel,
    });
    setIsLoading(false);
    setItems(data.items);
    setTotal(data.total);
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    setIsLoading,
    setItems,
    setTotal,
    sortModel,
  ]);

  return {
    ...context,
    fetchData,
  };
};

export default useProduct;
