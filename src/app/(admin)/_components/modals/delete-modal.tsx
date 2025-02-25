"use client";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onConfirm: () => void;
};

const DeleteModal = ({
  open,
  title,
  content,
  onClose: handleDeleteModalClose,
  onConfirm: handleConfirmDelete,
}: Props) => {
  return (
    <Dialog open={open} onClose={handleDeleteModalClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteModalClose}>Cancel</Button>
        <Button onClick={handleConfirmDelete} autoFocus color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
