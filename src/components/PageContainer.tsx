import { Box, Card } from "@mui/material";
import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <Card elevation={0}>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Card>
  );
};

export default PageContainer;
