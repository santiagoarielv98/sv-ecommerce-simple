import { getAllCategories, getCategories } from "@/lib/db/admin";
import React from "react";
import { CategoryContext } from "../_context/category-context";

const useCategory = () => {
  const context = React.useContext(CategoryContext);

  const {
    setItems,
    setTotal,
    setIsLoading,
    paginationModel,
    sortModel,
    setCategories,
  } = context;

  const fetchData = React.useCallback(async () => {
    getAllCategories().then((data) => setCategories(data));
  }, [setCategories]);

  const fetchDataTable = React.useCallback(async () => {
    console.log("fetch");
    setIsLoading(true);
    const data = await getCategories({
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
    fetchDataTable,
  };
};

export default useCategory;
