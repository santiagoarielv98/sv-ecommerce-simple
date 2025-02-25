import type { CategorySchema } from "@/lib/schemas/category";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

const CategoryForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CategorySchema>();

  return (
    <Box sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <Typography variant="h6" component="h2">
          Category Information
        </Typography>

        <TextField
          required
          fullWidth
          label="Category Name"
          {...register("name")}
          error={!!errors.name?.message}
          helperText={errors.name?.message}
        />
      </Stack>
    </Box>
  );
};

export default CategoryForm;
