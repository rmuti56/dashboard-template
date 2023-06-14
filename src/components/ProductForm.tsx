import { ProductDto } from "@/dtos/product.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

type ProductFormProps = {
  mode: "create" | "update";
  isEditable?: boolean;
  onSubmit: (productFormData: ProductDto) => void;
  isLoading?: boolean;
  initialValues?: ProductDto;
};

const resolver = classValidatorResolver(ProductDto);

const ProductForm = ({
  onSubmit,
  mode,
  isEditable = true,
  isLoading,
  initialValues,
}: ProductFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductDto>({
    defaultValues: initialValues,
    resolver,
  });

  const submitText = mode === "create" ? "Create" : "Update";

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
        disabled={!isEditable}
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        multiline={true}
        rows={2}
        margin="normal"
        required
        fullWidth
        label="Description"
        id="description"
        disabled={!isEditable}
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TextField
        margin="normal"
        required
        label="Price"
        type="number"
        inputProps={{
          min: 0,
        }}
        id="price"
        disabled={!isEditable}
        {...register("price")}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading || !isEditable}
      >
        {isLoading ? <CircularProgress size={20} /> : submitText}
      </Button>
    </Box>
  );
};

export default ProductForm;
