import { getProductsPage } from "@/actions/products";
import type { PaginatedResult } from "@/types/product";
import type {
  GridPaginationModel,
  GridSortDirection,
  GridSortModel,
} from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";

export function useProductTable(initialValue: PaginatedResult) {
  const [items, setItems] = useState(initialValue.products);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: initialValue.page,
    pageSize: initialValue.pageSize,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: "id", sort: "desc" },
  ]);

  const fetchData = useCallback(
    async (options: {
      page: number;
      pageSize: number;
      field: string;
      sort: GridSortDirection;
      searchQuery?: string;
    }) => {
      setIsLoading(true);
      try {
        const response = await getProductsPage(options);
        setPaginationModel({
          page: response.page,
          pageSize: response.pageSize,
        });
        setItems(response.products);
        return response;
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const debouncedSearch = debounce((query: string) => {
    fetchData({
      page: 0,
      pageSize: paginationModel.pageSize,
      field: sortModel[0]?.field,
      sort: sortModel[0]?.sort,
      searchQuery: query,
    });
  }, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  const handleSortModelChange = (newModel: GridSortModel) => {
    setSortModel(newModel);
    if (newModel.length > 0) {
      fetchData({
        ...paginationModel,
        field: newModel[0].field,
        sort: newModel[0].sort,
        searchQuery,
      });
    }
  };

  const handlePageChange = (model: GridPaginationModel) => {
    fetchData({
      ...model,
      field: sortModel[0]?.field,
      sort: sortModel[0]?.sort,
      searchQuery,
    });
  };

  return {
    items,
    isLoading,
    searchQuery,
    paginationModel,
    sortModel,
    handleSearchChange,
    handleSortModelChange,
    handlePageChange,
  };
}
