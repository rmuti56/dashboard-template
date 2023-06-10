import { ProductFormData } from "@/types/product.type";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

type ProductFormProps = {
  onSubmit: (productFormData: ProductFormData) => void;
  isLoading?: boolean;
  initialValues?: ProductFormData;
};

const ProductForm = ({
  onSubmit,
  isLoading,
  initialValues,
}: ProductFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductFormData>({
    defaultValues: initialValues,
  });

  return (
    <Box
      component="form"
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        {...register("name", {
          required: "this field is required",
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        multiline
        minRows={2}
        margin="normal"
        required
        fullWidth
        label="Description"
        id="description"
        {...register("description", {
          required: "this field is required",
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TextField
        margin="normal"
        required
        label="Price"
        type="number"
        id="price"
        {...register("price", {
          required: "this field is required",
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={20} /> : "Create"}
      </Button>
    </Box>
  );
};

export default ProductForm;
