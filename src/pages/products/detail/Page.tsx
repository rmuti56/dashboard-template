import {
  getProductDetail,
  getProductOptions,
  updateProduct,
} from "@/apis/product.api";
import PageContainer from "@/components/PageContainer";
import PageLoading from "@/components/PageLoading";
import ProductForm from "@/components/ProductForm";
import { MutationKey } from "@/enums/mutation-key.enum";
import { QueryKey } from "@/enums/query-key.enum";
import useConfirm from "@/hooks/useConfirm";
import { ProductFormData } from "@/types/product.type";
import { Edit, Visibility } from "@mui/icons-material";
import {
  Box,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const { isLoading, data: productDetail } = useQuery({
    queryKey: [QueryKey.PRODUCT_DETAIL, productId as string],
    queryFn: getProductDetail,
    useErrorBoundary: true,
  });
  const { isLoading: isProductOptionsLoading, data: productOptions } = useQuery(
    {
      queryKey: ["productOptions", {}],
      queryFn: getProductOptions,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      enabled: !!productDetail,
    }
  );
  const { confirmSuccess, confirmError } = useConfirm();
  const { isLoading: isUpdateProductLoading, mutate } = useMutation({
    mutationKey: [MutationKey.UPDATE_PRODUCT],
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKey.PRODUCT_DETAIL, productId], data);
      confirmSuccess({
        message: "Update product successfully",
      });
    },
    onError: () => {
      confirmError({
        message: "Update product failure",
      });
    },
  });
  const [isEditable, setEditable] = useState(false);

  const handleToggleEditable = () => {
    setEditable(!isEditable);
  };

  const handleUpdate = (productFormData: ProductFormData) => {
    mutate({
      id: productId as string,
      ...productFormData,
    });
  };

  if (isLoading || isProductOptionsLoading) {
    return <PageLoading />;
  }

  return (
    <PageContainer>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">
          Product Detail ({productDetail?.name})
        </Typography>
        <IconButton onClick={handleToggleEditable}>
          {isEditable ? <Visibility /> : <Edit />}
        </IconButton>
      </Box>
      <TextField
        select
        label="Options"
        sx={{ minWidth: 300, mt: 2 }}
        defaultValue=""
      >
        {productOptions?.map((productOption) => {
          return (
            <MenuItem key={productOption.value} value={productOption.value}>
              {productOption.label}
            </MenuItem>
          );
        })}
      </TextField>
      <Box
        sx={{
          maxWidth: 400,
          display: "flex",
          mx: "auto",
        }}
      >
        <ProductForm
          initialValues={productDetail}
          isLoading={isUpdateProductLoading}
          mode="update"
          isEditable={isEditable}
          onSubmit={handleUpdate}
        />
      </Box>
    </PageContainer>
  );
};

export default ProductDetailPage;
