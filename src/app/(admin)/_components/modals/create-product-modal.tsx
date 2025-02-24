import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import type { Category } from "@prisma/client";
import ProductForm from "../form/product-form";
import type { ProductSchema } from "@/lib/schemas/product";

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
}

const CreateProductModal = ({
  categories,
  open,
  onClose,
}: CreateProductModalProps) => {
  const handleSubmit = (data: ProductSchema) => {
    console.log(data);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 2 },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Create New Product
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <ProductForm categories={categories} onSubmit={handleSubmit} />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          form="product-form"
        >
          Create Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProductModal;
