import { getProductDetail, getProductOptions } from "@/apis/product.api";
import PageContainer from "@/components/PageContainer";
import PageLoading from "@/components/PageLoading";
import { MenuItem, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { isLoading, data: productDetail } = useQuery({
    queryKey: ["productDetail", productId as string],
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

  if (isLoading || isProductOptionsLoading) {
    return <PageLoading />;
  }

  return (
    <PageContainer>
      <Typography variant="h5">รายละเอียด {productDetail?.name}</Typography>
      <TextField select label="Options" sx={{ minWidth: 300, mt: 2 }}>
        {productOptions?.map((productOption) => {
          return (
            <MenuItem key={productOption.value} value={productOption.value}>
              {productOption.label}
            </MenuItem>
          );
        })}
      </TextField>
    </PageContainer>
  );
};

export default ProductDetailPage;
