import { getProductDetail } from "@/apis/products.api";
import PageContainer from "@/components/PageContainer";
import PageLoading from "@/components/PageLoading";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { isLoading } = useQuery({
    queryKey: ["productDetail", productId as string],
    queryFn: getProductDetail,
    useErrorBoundary: true,
  });

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <PageContainer>
      <Typography variant="h5">รายละเอียดสินค้า {productId}</Typography>
    </PageContainer>
  );
};

export default ProductDetailPage;
