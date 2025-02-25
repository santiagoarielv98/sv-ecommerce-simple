"use client";

import React from "react";

import { deleteProduct } from "@/lib/db/admin";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import type { GridColDef, GridRowId } from "@mui/x-data-grid";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteModal from "../../_components/modals/delete-modal";
import EditProductModal from "../../_components/modals/edit-product-modal";
import type { ProductRow } from "../../_context/product-context";
import useProduct from "../../_hooks/use-product";

const ProductTable = () => {
  const {
    fetchData,
    isLoading,
    items,
    total,
    paginationModel,
    sortModel,
    filterModel,
    setPaginationModel,
    setSortModel,
    setFilterModel,
  } = useProduct();

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductRow | null>(null);

  const handleDeleteModalClose = React.useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  const handleDelete = React.useCallback(
    (product: ProductRow) => () => {
      setSelectedProduct(product);
      setOpenDeleteModal(true);
    },
    [],
  );

  const handleConfirmDelete = React.useCallback(() => {
    if (!selectedProduct) return;

    deleteProduct(selectedProduct.id).then(() => {
      fetchData();
      setOpenDeleteModal(false);
    });
  }, [selectedProduct, fetchData]);

  const queryOptions = React.useMemo(
    () => ({ ...paginationModel, sortModel, filterModel }),
    [paginationModel, sortModel, filterModel],
  );

  const handleEdit = React.useCallback(
    (product: ProductRow) => () => {
      setSelectedProduct(product);
      setOpenEditModal(true);
    },
    [],
  );

  const handleEditModalClose = React.useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const columns = React.useMemo<GridColDef<ProductRow>[]>(
    () => [
      { field: "id", headerName: "ID", width: 215 },
      {
        field: "image",
        headerName: "Image",
        maxWidth: 80,
        flex: 1,
        renderCell: (params) => (
          <Avatar src={params.row.images[0]} alt={params.row.name} />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", flex: 1, minWidth: 200 },
      {
        field: "price",
        headerName: "Price",
        width: 130,
        valueGetter: (params) => `$${params}`,
      },
      { field: "stock", headerName: "Stock", width: 130 },
      {
        field: "category",
        headerName: "Category",
        valueGetter: (params: ProductRow["category"]) => params.name,
        width: 130,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 80,
        sortable: false,
        getActions: (params: { id: GridRowId; row: ProductRow }) => [
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDelete(params.row)}
          />,
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEdit(params.row)}
          />,
        ],
      },
    ],
    [handleDelete, handleEdit],
  );

  React.useEffect(() => {
    fetchData();
  }, [fetchData, queryOptions]);

  return (
    <>
      <DataGrid
        loading={isLoading}
        rowCount={total}
        rows={items}
        columns={columns}
        pageSizeOptions={[20]}
        paginationModel={paginationModel}
        sortModel={sortModel}
        filterModel={filterModel}
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        checkboxSelection
        disableRowSelectionOnClick
        onPaginationModelChange={setPaginationModel}
        onSortModelChange={setSortModel}
        onFilterModelChange={setFilterModel}
      />
      <DeleteModal
        title={`Delete ${selectedProduct?.name}`}
        content={`Are you sure you want to delete ${selectedProduct?.name}?`}
        open={openDeleteModal}
        onClose={handleDeleteModalClose}
        onConfirm={handleConfirmDelete}
      />
      <EditProductModal
        product={selectedProduct!}
        open={openEditModal}
        onClose={handleEditModalClose}
      />
    </>
  );
};

export default ProductTable;
