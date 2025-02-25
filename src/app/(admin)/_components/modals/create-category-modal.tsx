import { createCategory } from "@/lib/db/admin";
import { categorySchema, type CategorySchema } from "@/lib/schemas/category";
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
import CategoryForm from "../form/category-form";
import useCategory from "../../_hooks/use-category";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
}

const CategoryModal = ({ open, onClose }: CategoryModalProps) => {
  const { fetchDataTable } = useCategory();
  const methods = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const onSubmit = async (data: CategorySchema) => {
    await createCategory(data).then(() => {
      fetchDataTable();
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
            Create New Category
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
            <CategoryForm />
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Create Category
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default CategoryModal;
