import { editProduct } from "@/lib/db/admin";
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
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { ProductRow } from "../../_context/product-context";
import useCategory from "../../_hooks/use-category";
import useProduct from "../../_hooks/use-product";
import ProductForm from "../form/product-form";

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: ProductRow;
}

const EditProductModal = ({
  open,
  onClose,
  product,
}: EditProductModalProps) => {
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
    if (!product) return;
    await editProduct(product.id, data).then(() => {
      fetchData();
      onClose();
      methods.reset();
    });
  };

  React.useEffect(() => {
    if (!product) return;

    methods.reset(product);
  }, [product, methods]);

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
            Edit Product
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

          <DialogActions>
            <Button
              onClick={handleClose}
              disabled={methods.formState.isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              disabled={methods.formState.isSubmitting}
              loading={methods.formState.isSubmitting}
              autoFocus
              variant="contained"
              color="primary"
              type="submit"
            >
              Guardar
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default EditProductModal;
