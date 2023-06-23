import PageErrorBoundary from "@/components/PageErrorBoundary";
import { UrlPrefix } from "@/enums/url-prefix.enum";
import BaseLayout from "@/layout/BaseLayout/Layout";
import HomePage, { homePagePath, homePageUrl } from "@/pages/home";
import LoginPage, { loginPagePath } from "@/pages/login";
import ProductsPage, {
  productsPagePath,
  productsPageUrl,
} from "@/pages/products";
import CreateProductPage, {
  createProductPagePath,
} from "@/pages/products/create";
import { productDetailPagePath } from "@/pages/products/detail";
import ExampleCall from "@/pages/products/detail/ExampleCall";
import ProductDetailPage from "@/pages/products/detail/Page";
import { Navigate, createBrowserRouter } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={homePageUrl} replace />,
  },
  {
    path: `${UrlPrefix.ADMIN}/${loginPagePath}`,
    element: <LoginPage />,
  },
  {
    path: UrlPrefix.ADMIN,
    element: <BaseLayout />,
    children: [
      {
        path: homePagePath,
        element: <HomePage />,
      },
      {
        path: productsPagePath,
        children: [
          {
            path: "",
            element: (
              <PageErrorBoundary>
                <ProductsPage />
              </PageErrorBoundary>
            ),
          },
          {
            path: createProductPagePath,
            element: <CreateProductPage />,
          },
          {
            path: productDetailPagePath,
            element: (
              <PageErrorBoundary backUrl={productsPageUrl}>
                <ProductDetailPage />
                <ExampleCall />
              </PageErrorBoundary>
            ),
          },
        ],
      },
    ],
  },
]);

export default appRouter;
