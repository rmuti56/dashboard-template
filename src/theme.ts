import { Components, Theme, colors, createTheme } from "@mui/material";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#f5a13b",
      light: "#f7e3c6",
      dark: "#D17B14",
    },
    heading: colors.grey[900],
    darkTextSecondary: colors.grey[400],
    background: {
      main: "#EEF2F6",
    },
  },
  typography: (theme) => ({
    // can add another font
    fontFamily: ["Kanit"].join(","),
    mainContent: {
      backgroundColor: theme.background,
      width: "100%",
      minHeight: "calc(100vh - 88px)",
      flexGrow: 1,
      padding: "20px",
      marginTop: "88px",
      marginRight: "20px",
      borderRadius: 8,
    },
    menuCaption: {
      fontSize: "0.875rem",
      fontWeight: 500,
      color: theme.heading,
      padding: "6px",
      textTransform: "capitalize",
      marginTop: "10px",
    },
    subMenuCaption: {
      fontSize: "0.6875rem",
      fontWeight: 500,
      color: theme.darkTextSecondary,
      textTransform: "capitalize",
    },
    commonAvatar: {
      cursor: "pointer",
      borderRadius: "8px",
    },
    smallAvatar: {
      width: "22px",
      height: "22px",
      fontSize: "1rem",
    },
    mediumAvatar: {
      width: "34px",
      height: "34px",
      fontSize: "1.2rem",
    },
    largeAvatar: {
      width: "44px",
      height: "44px",
      fontSize: "1.5rem",
    },
  }),
  shape: {
    borderRadius: 8,
  },
});

// components override
const componentStyleOverrides = (theme: Theme): Components<Theme> => ({
  MuiListItemButton: {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        paddingTop: "10px",
        paddingBottom: "10px",
        "&.Mui-selected": {
          color: theme.palette.primary.dark,
          backgroundColor: theme.palette.primary.light,
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiListItemIcon-root": {
            color: theme.palette.primary.dark,
          },
        },
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.dark,
          "& .MuiListItemIcon-root": {
            color: theme.palette.primary.dark,
          },
        },
      },
    },
  },
  MuiCard: {
    defaultProps: {
      elevation: 0,
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: {
        padding: 8,
      },
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
appTheme.components = componentStyleOverrides(appTheme) as any;

export default appTheme;
