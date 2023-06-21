import { Box, Card, CardProps } from "@mui/material";
import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
} & CardProps

const PageContainer = ({ children, ...restProps }: PageContainerProps) => {
  return (
    <Card elevation={0} {...restProps}>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Card>
  );
};

export default PageContainer;
