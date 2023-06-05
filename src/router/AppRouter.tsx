import { UrlPrefixEnum } from "@/enums/url-prefix.enum";
import BaseLayout from "@/layout/BaseLayout/Layout";
import HomePage, { homePagePath, homePageUrl } from "@/pages/home";
import LoginPage, { loginPagePath } from "@/pages/login";
import ProductsPage, { productsPagePath } from "@/pages/products";
import CreateProductPage, {
  createProductPagePath,
} from "@/pages/products/create";
import { Navigate, createBrowserRouter } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={homePageUrl} replace />,
  },
  {
    path: UrlPrefixEnum.ADMIN,
    element: <BaseLayout />,
    children: [
      {
        path: homePagePath,
        element: <HomePage />,
      },
      {
        path: loginPagePath,
        element: <LoginPage />,
      },
      {
        path: productsPagePath,
        children: [
          {
            path: "",
            element: <ProductsPage />,
          },
          {
            path: createProductPagePath,
            element: <CreateProductPage />,
          },
        ],
      },
    ],
  },
]);

export default appRouter;