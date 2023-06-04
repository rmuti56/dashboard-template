import { AppBar, Box, Toolbar, useMediaQuery } from "@mui/material";
import {
  StyledComponentProps,
  Theme,
  styled,
  useTheme,
} from "@mui/material/styles";
import { useState } from "react";
import { Outlet } from "react-router-dom";

// import Breadcrumbs from "ui-component/extended/Breadcrumbs";
import Header from "./Header";
import Sidebar from "./Sidebar";

// assets
import { ConfigEnum } from "@/enums/config.enum";

const drawerWidth = ConfigEnum.DRAWER_WIDTH;

interface MainProps extends StyledComponentProps {
  open: boolean;
  theme: Theme;
}

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: MainProps) => ({
  ...theme.typography.mainContent,
  backgroundColor: '#EEF2F6',
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
    marginLeft: open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: "20px",
    width: `calc(100% - ${drawerWidth}px)`,
    padding: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "10px",
    width: `calc(100% - ${drawerWidth}px)`,
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
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      <Sidebar
        drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />

      <Main theme={theme} open={leftDrawerOpened}>
        {/* breadcrumb */}
        {/* <Breadcrumbs
          separator={ChevronRight}
          navigation={navigation}
          icon
          title
          rightAlign
        /> */}
        <Outlet />
      </Main>
    </Box>
  );
};

export default BaseLayout;
