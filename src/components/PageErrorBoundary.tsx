import { homePageUrl } from "@/pages/home";
import { ArrowBackIos, Error, Replay } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactNode, useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PageContainer from "./PageContainer";
import { useLocation } from "react-router-dom";

type PageErrorBoundaryProps = {
  children: ReactNode;
  backUrl?: string;
};

type ResetBoundaryProps = {
  reset: () => void;
};

const ResetBoundary = ({ reset }: ResetBoundaryProps) => {
  const { pathname } = useLocation();
  const didMount = useRef(1);

  useEffect(() => {
    if (didMount.current >= 3) {
      reset();
      didMount.current = 1;
    } else {
      didMount.current += 1;
    }
  }, [pathname, reset]);

  return <></>;
};

const PageErrorBoundary = ({
  backUrl = homePageUrl,
  children,
}: PageErrorBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <PageContainer>
              <ResetBoundary reset={resetErrorBoundary} />
              <Box
                alignItems="center"
                justifyContent="center"
                display="flex"
                flexDirection="column"
                gap={2}
              >
                <Box display="flex" gap={1} alignItems="center">
                  <Error color="error" />
                  <Typography variant="h5" color="error">
                    Something went wrong
                  </Typography>
                </Box>
                <Box display="flex" gap={1} alignItems="center">
                  <Button href={backUrl}>
                    <ArrowBackIos /> Go to main page
                  </Button>
                  <Divider
                    variant="fullWidth"
                    orientation="vertical"
                    flexItem
                  />
                  <Button
                    variant="contained"
                    onClick={() => resetErrorBoundary()}
                  >
                    <Replay /> Try again
                  </Button>
                </Box>
              </Box>
            </PageContainer>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default PageErrorBoundary;
