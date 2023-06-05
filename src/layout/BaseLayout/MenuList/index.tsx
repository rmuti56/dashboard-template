// material-ui
import { ChipProps, Typography } from "@mui/material";

import { homePagePath, homePageUrl } from "@/pages/home";
import { productsPagePath, productsPageUrl } from "@/pages/products";
import {
  createProductPagePath,
  createProductPageUrl,
} from "@/pages/products/create";
import { Dashboard, PrecisionManufacturing } from "@mui/icons-material";
import { ElementType } from "react";
import NavGroup from "./NavGroup";

export interface MenuProps {
  id: string;
  type?: "collapse" | "item" | "group";
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
}

export interface MenuItemProps {
  items: MenuProps[];
}

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
          icon: Dashboard,
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
          icon: PrecisionManufacturing,
          url: productsPageUrl,
          children: [
            {
              id: productsPagePath,
              title: "Product List",
              type: "item",
              url: productsPageUrl,
              breadcrumbs: true,
            },
            {
              id: createProductPagePath,
              title: "Create Product",
              type: "item",
              url: createProductPageUrl,
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
