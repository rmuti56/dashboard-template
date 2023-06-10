import { createProduct } from "@/apis/product.api";
import PageContainer from "@/components/PageContainer";
import ProductForm from "@/components/ProductForm";
import useConfirm from "@/hooks/useConfirm";
import { ProductFormData } from "@/types/product.type";
import { Box, Divider, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { productsPageUrl } from "..";

const CreateProductPage = () => {
  const { confirmError, confirmSuccess } = useConfirm();
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: createProduct,
    onSuccess: () => {
      confirmSuccess({
        message: "Create a new product successfully",
        onConfirm: () => {
          navigate(productsPageUrl);
        },
      });
    },
    onError: () => {
      confirmError({
        message: "Create product failure, Please try again",
      });
    },
  });

  const handleSubmit = (productFormData: ProductFormData) => {
    mutate(productFormData);
  };

  return (
    <PageContainer>
      <Typography variant="h5">Create new Product</Typography>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          maxWidth: 400,
          display: "flex",
          mx: "auto",
        }}
      >
        <ProductForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          mode="create"
        />
      </Box>
    </PageContainer>
  );
};

export default CreateProductPage;
