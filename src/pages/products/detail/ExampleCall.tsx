// TODO: Remove this component just for example call the same api at the same time
import { getProductDetail } from "@/apis/product.api";
import PageContainer from "@/components/PageContainer";
import PageLoading from "@/components/PageLoading";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ExampleCall = () => {
  const { productId } = useParams();
  const { isLoading, data: productDetail } = useQuery({
    queryKey: ["productDetail", productId as string],
    queryFn: getProductDetail,
    useErrorBoundary: true,
  });

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <PageContainer sx={{ mt: 2 }}>
      <Typography>Example Call Product Detail {productDetail?.name}</Typography>
    </PageContainer>
  );
};

export default ExampleCall;
