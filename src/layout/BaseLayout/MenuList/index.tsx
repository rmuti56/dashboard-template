// material-ui
import { ChipProps, Typography } from "@mui/material";

import { ElementType } from "react";
import NavGroup from "./NavGroup";
import { homePagePath, homePageUrl } from "@/pages/home";
import { Dashboard, Key } from "@mui/icons-material";
import { loginPagePath, loginPageUrl } from "@/pages/login";

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
  breadcrumbs?: any;
}

interface MenuItemProps {
  items: MenuProps[];
}

const menuItem: MenuItemProps = {
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
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "adminAuthentication",
      title: "",
      type: "group",
      children: [
        {
          id: "authentication",
          title: "Authentication",
          type: "collapse",
          icon: Key,
          children: [
            {
              id: loginPagePath,
              title: "Login",
              type: "item",
              url: loginPageUrl,
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
