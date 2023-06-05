import { GRID_SPACING } from "@/constants/config.constant";
import { MenuItemProps, MenuProps } from "@/layout/BaseLayout/MenuList";
import { homePageUrl } from "@/pages/home";
import { ChevronRight } from "@mui/icons-material";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import HomeIcon from "@mui/icons-material/Home";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { useTheme } from "@mui/material/styles";
import { ElementType, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbsProps {
  card?: boolean;
  divider?: boolean;
  icon?: boolean;
  icons?: boolean;
  maxItems?: number;
  navigation?: MenuItemProps;
  rightAlign?: boolean;
  separator?: ElementType;
  title?: boolean;
  titleBottom?: boolean;
}

const linkSX = {
  display: "flex",
  color: "grey.900",
  textDecoration: "none",
  alignContent: "center",
  alignItems: "center",
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  card,
  divider,
  icon,
  icons,
  maxItems,
  navigation,
  rightAlign,
  separator,
  title,
  titleBottom,
  ...others
}) => {
  const theme = useTheme();
  const location = useLocation();

  const iconStyle = {
    marginRight: theme.spacing(0.75),
    marginTop: `-${theme.spacing(0.25)}`,
    width: "1rem",
    height: "1rem",
    color: theme.palette.secondary.main,
  };

  const [main, setMain] = useState<MenuProps>();
  const [item, setItem] = useState<MenuProps>();

  useEffect(() => {
    // set active item state
    const getCollapse = (menu: MenuProps) => {
      if (menu.children) {
        menu.children.filter((collapse: MenuProps) => {
          if (collapse.type && collapse.type === "collapse") {
            getCollapse(collapse);
          } else if (collapse.type && collapse.type === "item") {
            if (location.pathname === collapse.url) {
              setMain(menu);
              setItem(collapse);
            }
          }
          return false;
        });
      }
    };

    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === "group") {
        getCollapse(menu);
      }
      return false;
    });
  }, [navigation, location.pathname]);

  const SeparatorIcon = separator as ElementType;
  const separatorIcon = separator ? <SeparatorIcon /> : <ChevronRight />;

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = "";
  let CollapseIcon;
  let ItemIcon;

  // collapse item
  if (main && main.type === "collapse") {
    CollapseIcon = main.icon ? main.icon : AccountTreeTwoToneIcon;
    mainContent = (
      <Typography component={Link} to="#" variant="subtitle1" sx={linkSX}>
        {icons && <CollapseIcon style={iconStyle} />}
        {main.title}
      </Typography>
    );
  }

  // items
  if (item && item.type === "item") {
    itemTitle = item.title;

    ItemIcon = item.icon ? item.icon : AccountTreeTwoToneIcon;
    itemContent = (
      <Typography
        variant="subtitle1"
        sx={{
          display: "flex",
          textDecoration: "none",
          alignContent: "center",
          alignItems: "center",
          color: "grey.500",
        }}
      >
        {icons && <ItemIcon style={iconStyle} />}
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <Card
          elevation={0}
          sx={{
            marginBottom: card === false ? 0 : theme.spacing(GRID_SPACING),
            border: card === false ? "none" : "1px solid",
            borderColor: theme.palette.grey[100],
            background:
              card === false ? "transparent" : theme.palette.background.default,
          }}
          {...others}
        >
          <Box sx={{ p: 2, pl: card === false ? 0 : 2 }}>
            <Grid
              container
              direction={rightAlign ? "row" : "column"}
              justifyContent={rightAlign ? "space-between" : "flex-start"}
              alignItems={rightAlign ? "center" : "flex-start"}
              spacing={1}
            >
              {title && !titleBottom && (
                <Grid item>
                  <Typography variant="h4" sx={{ fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <MuiBreadcrumbs
                  sx={{
                    "& .MuiBreadcrumbs-separator": {
                      width: 16,
                      ml: 1.25,
                      mr: 1.25,
                    },
                  }}
                  aria-label="breadcrumb"
                  maxItems={maxItems || 8}
                  separator={separatorIcon}
                >
                  <Typography
                    component={Link}
                    to={homePageUrl}
                    color="inherit"
                    variant="subtitle1"
                    sx={linkSX}
                  >
                    {icons && <HomeTwoToneIcon sx={iconStyle} />}
                    {icon && <HomeIcon sx={{ ...iconStyle, mr: 0 }} />}
                    {!icon && "Dashboard"}
                  </Typography>
                  {mainContent}
                  {itemContent}
                </MuiBreadcrumbs>
              </Grid>
              {title && titleBottom && (
                <Grid item>
                  <Typography variant="h3" sx={{ fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
          {card === false && divider !== false && (
            <Divider
              sx={{ borderColor: theme.palette.primary.main, mb: GRID_SPACING }}
            />
          )}
        </Card>
      );
    }
  }

  return breadcrumbContent;
};

export default Breadcrumbs;
