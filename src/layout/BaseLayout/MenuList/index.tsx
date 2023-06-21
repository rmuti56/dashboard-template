import { ChipProps, Typography } from "@mui/material";

import { homePagePath, homePageUrl } from "@/pages/home";
import { productsPagePath, productsPageUrl } from "@/pages/products";
import {
  createProductPagePath,
  createProductPageUrl,
} from "@/pages/products/create";
import { Category, Home } from "@mui/icons-material";
import { ElementType } from "react";
import NavGroup from "./NavGroup";
import {
  productDetailPagePath,
  productDetailPageUrl,
} from "@/pages/products/detail";

export type MenuProps = {
  id: string;
  type?: "collapse" | "item" | "group" | "hidden";
  icon?: ElementType;
  url?: string;
  target?: boolean;
  external?: boolean;
  disabled?: boolean;
  caption?: string;
  chip?: ChipProps;
  title: string;
  children?: MenuProps[];
  breadcrumbs?: boolean;
  roles?: string[];
};

export type MenuItemProps = {
  items: MenuProps[];
};

// eslint-disable-next-line react-refresh/only-export-components
export const menuItem: MenuItemProps = {
  items: [
    {
      id: "adminDashboard",
      title: "",
      type: "group",
      children: [
        {
          id: homePagePath,
          title: "Dashboard",
          type: "item",
          url: homePageUrl,
          icon: Home,
        },
      ],
    },
    {
      id: "adminProduct",
      title: "",
      type: "group",
      children: [
        {
          id: "productManagement",
          title: "Product",
          type: "collapse",
          icon: Category,
          url: productsPageUrl,
          children: [
            {
              id: productsPagePath,
              title: "Product List",
              type: "item",
              url: productsPageUrl,
              breadcrumbs: true,
              children: [
                // dynamic path must hide on menu
                {
                  id: productDetailPagePath,
                  title: "Product Detail",
                  type: "hidden",
                  url: productDetailPageUrl(productDetailPagePath),
                  breadcrumbs: true,
                },
              ],
            },
            {
              id: createProductPagePath,
              title: "Create new Product",
              type: "item",
              url: createProductPageUrl,
              breadcrumbs: true,
            },
          ],
        },
      ],
    },
  ],
};

const MenuList = () => {
  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
