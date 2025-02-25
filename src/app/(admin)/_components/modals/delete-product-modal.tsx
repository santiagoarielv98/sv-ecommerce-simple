"use client";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import type { ProductRow } from "../../_context/product-context";

type Props = {
  open: boolean;
  onClose: () => void;
  product: ProductRow | null;
  onConfirm: () => void;
};

const DeleteProductModal = ({
  open,
  onClose: handleDeleteModalClose,
  product,
  onConfirm: handleConfirmDelete,
}: Props) => {
  return (
    <Dialog open={open} onClose={handleDeleteModalClose}>
      <DialogTitle>Eliminar producto {product?.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas eliminar el producto seleccionado?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteModalClose}>Cancelar</Button>
        <Button onClick={handleConfirmDelete} autoFocus color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProductModal;
