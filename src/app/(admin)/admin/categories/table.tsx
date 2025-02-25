"use client";

import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import type { GridColDef, GridRowId } from "@mui/x-data-grid";
import DeleteModal from "../../_components/modals/delete-modal";
import type { CategoryRow } from "../../_context/category-context";
import useCategory from "../../_hooks/use-category";
import { deleteCategory } from "@/lib/db/admin";
import EditCategoryModal from "../../_components/modals/edit-category-modal";

const CategoryTable = () => {
  const {
    items,
    total,
    isLoading,
    fetchDataTable,
    paginationModel,
    sortModel,
    filterModel,
    setPaginationModel,
    setSortModel,
    setFilterModel,
  } = useCategory();
  const queryOptions = React.useMemo(
    () => ({ ...paginationModel, sortModel, filterModel }),
    [paginationModel, sortModel, filterModel],
  );

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState<CategoryRow | null>(null);

  const handleDeleteModalClose = React.useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  const handleDelete = React.useCallback(
    (category: CategoryRow) => () => {
      setSelectedCategory(category);
      setOpenDeleteModal(true);
    },
    [],
  );

  const handleConfirmDelete = React.useCallback(() => {
    if (!selectedCategory) return;

    deleteCategory(selectedCategory.id).then(() => {
      fetchDataTable();
      setOpenDeleteModal(false);
    });
  }, [selectedCategory, fetchDataTable]);

  const handleEdit = React.useCallback(
    (category: CategoryRow) => () => {
      setSelectedCategory(category);
      setOpenEditModal(true);
    },
    [],
  );

  const handleEditModalClose = React.useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const columns = React.useMemo<GridColDef<CategoryRow>[]>(
    () => [
      { field: "id", headerName: "ID Category", width: 200 },
      {
        field: "name",
        headerName: "Name",
        width: 200,
      },
      {
        field: "_count",
        headerName: "Products",
        width: 200,
        valueGetter: (params: CategoryRow["_count"]) => params.products,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 80,
        sortable: false,
        getActions: (params: { id: GridRowId; row: CategoryRow }) => [
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
    fetchDataTable();
  }, [fetchDataTable, queryOptions]);

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
        title={`Delete ${selectedCategory?.name}`}
        open={openDeleteModal}
        onClose={handleDeleteModalClose}
        content={`Are you sure you want to delete ${selectedCategory?.name}?`}
        onConfirm={handleConfirmDelete}
      />
      <EditCategoryModal
        category={selectedCategory!}
        open={openEditModal}
        onClose={handleEditModalClose}
      />
    </>
  );
};

export default CategoryTable;
