import { createProduct } from "@/lib/db/admin";
import { productSchema, type ProductSchema } from "@/lib/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import useCategory from "../../_hooks/use-category";
import useProduct from "../../_hooks/use-product";
import ProductForm from "../form/product-form";

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateProductModal = ({ open, onClose }: CreateProductModalProps) => {
  const { categories } = useCategory();
  const { fetchData } = useProduct();
  const methods = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      images: [],
    },
  });

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const onSubmit = async (data: ProductSchema) => {
    await createProduct(data).then(() => {
      fetchData();
      onClose();
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 2 },
        },
      }}
    >
      <FormProvider {...methods}>
        <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
          <DialogTitle sx={{ m: 0, p: 2 }}>
            Create New Product
            <IconButton
              aria-label="close"
              onClick={handleClose}
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
            <ProductForm categories={categories} />
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={methods.formState.isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={methods.formState.isSubmitting}
              loading={methods.formState.isSubmitting}
            >
              Create Product
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default CreateProductModal;
