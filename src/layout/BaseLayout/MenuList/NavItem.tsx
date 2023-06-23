import {
  ElementType,
  ForwardRefExoticComponent,
  forwardRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLinkProps, useLocation } from "react-router-dom";

import {
  Avatar,
  Chip,
  LinkBaseProps,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { RootState } from "@/store";
import { MenuState, menuOpen, setMenu } from "@/store/slices/menu.slice";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { MenuProps } from ".";

type NavItemProps = {
  item: MenuProps;
  level: number;
};

const NavItem = ({ item, level }: NavItemProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const menu = useSelector<RootState, MenuState>((state) => state.menu);
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));

  const Icon = item.icon as ElementType;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width:
          menu.isOpen.findIndex((id: string) => id === item?.id) > -1 ? 8 : 6,
        height:
          menu.isOpen.findIndex((id: string) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: string | ForwardRefExoticComponent<any>;
    href?: string;
    target?: string;
  } = {
    component: forwardRef<HTMLAnchorElement, LinkBaseProps & NavLinkProps>(
      (props, ref) => (
        <Link
          ref={ref}
          {...props}
          to={item.url as string}
          target={itemTarget}
        />
      )
    ),
  };
  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  const itemHandler = (id: string) => {
    dispatch(menuOpen(id));
    if (matchesSM) {
      dispatch(setMenu(false));
    }
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch(menuOpen(item.id));
    }
  }, [dispatch, item.id, pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        mb: 0.5,
        alignItems: "flex-start",
        backgroundColor: level > 1 ? "transparent !important" : "inherit",
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      selected={menu.isOpen.findIndex((id: string) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            fontWeight={
              menu.isOpen.findIndex((id: string) => id === item.id) > -1
                ? "bold"
                : "unset"
            }
            color="inherit"
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.caption }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;
