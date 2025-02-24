import type { ProductSchema } from "@/lib/schemas/product";
import { productSchema } from "@/lib/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { Category } from "@prisma/client";
import { useForm } from "react-hook-form";

export type Props = {
  categories: Category[];
  onSubmit: (data: ProductSchema) => void;
};

const ProductForm = ({ categories = [], onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
    },
  });

  return (
    <Box
      component="form"
      id="product-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 2 }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" component="h2">
          Product Information
        </Typography>

        <TextField
          required
          fullWidth
          label="Product Name"
          {...register("name")}
          error={!!errors.name?.message}
          helperText={errors.name?.message}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          {...register("description")}
        />

        <TextField
          required
          fullWidth
          type="number"
          label="Price"
          {...register("price")}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
          error={!!errors.price?.message}
          helperText={errors.price?.message}
        />

        <TextField
          required
          fullWidth
          type="number"
          label="Stock"
          {...register("stock")}
          error={!!errors.stock?.message}
          helperText={errors.stock?.message}
        />

        <FormControl fullWidth required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            label="Category"
            {...register("categoryId")}
            defaultValue=""
            error={!!errors.categoryId?.message}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!errors.categoryId?.message}>
            {errors.categoryId?.message}
          </FormHelperText>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default ProductForm;
