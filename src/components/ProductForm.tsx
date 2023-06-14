import { ProductDto } from "@/dtos/product.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";

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
    control,
    handleSubmit,
  } = useForm<ProductDto>({
    defaultValues: initialValues,
    resolver,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
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
      <Box>
        {fields.map((field, index) => (
          <div key={field.id}>
            <Divider />
            <TextField
              fullWidth
              required
              margin="normal"
              label="Label"
              placeholder="Label"
              disabled={!isEditable}
              {...register(`options.${index}.label`)}
              error={!!errors.options?.[index]?.label}
              helperText={errors.options?.[index]?.label?.message}
            />
            <TextField
              fullWidth
              required
              margin="normal"
              label="Value"
              placeholder="Value"
              disabled={!isEditable}
              {...register(`options.${index}.value`)}
              error={!!errors.options?.[index]?.value}
              helperText={errors.options?.[index]?.value?.message}
            />
            <Button type="button" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          disabled={!isEditable}
          onClick={() =>
            append({
              label: "",
              value: "",
            })
          }
        >
          Add Option
        </Button>
      </Box>
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
