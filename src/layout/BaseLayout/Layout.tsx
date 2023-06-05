import Breadcrumbs from "@/components/Breadcrumbs";
import { DRAWER_WIDTH } from "@/constants/config.constant";
import { ChevronRight } from "@mui/icons-material";
import { AppBar, Box, Toolbar, useMediaQuery } from "@mui/material";
import {
  StyledComponentProps,
  Theme,
  styled,
  useTheme,
} from "@mui/material/styles";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { menuItem } from "./MenuList";
import Sidebar from "./Sidebar";

interface MainProps extends StyledComponentProps {
  open: boolean;
  theme: Theme;
}

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: MainProps) => ({
  ...theme.typography.mainContent,
  backgroundColor: theme.palette.background.main,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    "margin",
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }
  ),
  [theme.breakpoints.up("md")]: {
    marginLeft: open ? 0 : -(DRAWER_WIDTH - 20),
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: "20px",
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    padding: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "10px",
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    padding: "16px",
    marginRight: "10px",
  },
}));

const BaseLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  // Handle left drawer
  const [leftDrawerOpened, setLeftDrawerOpened] = useState(true);
  const handleLeftDrawerToggle = () => {
    setLeftDrawerOpened(!leftDrawerOpened);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened
            ? theme.transitions.create("width")
            : "none",
        }}
      >
        <Toolbar
          sx={{
            py: 2,
          }}
        >
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      <Sidebar
        drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />

      <Main theme={theme} open={leftDrawerOpened}>
        <Breadcrumbs
          separator={ChevronRight}
          navigation={menuItem}
          icon
          title
          rightAlign
        />
        <Outlet />
      </Main>
    </Box>
  );
};

export default BaseLayout;
