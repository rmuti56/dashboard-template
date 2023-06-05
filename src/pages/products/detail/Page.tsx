import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productId } = useParams();
  return (
    <Box>
      <Typography variant="h5">รายละเอียดสินค้า {productId}</Typography>
    </Box>
  );
};

export default ProductDetailPage;
