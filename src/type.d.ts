import { ThemedProps } from "@mui/material";
import {
  Typography,
  TypographyStyleOptions,
} from "@mui/material/styles/createTypography";

interface CustomTypography extends Typography {
  mainContent: TypographyStyleOptions;
  menuCaption: TypographyStyleOptions;
  subMenuCaption: TypographyStyleOptions;
  commonAvatar: TypographyStyleOptions;
  smallAvatar: TypographyStyleOptions;
  mediumAvatar: TypographyStyleOptions;
  largeAvatar: TypographyStyleOptions;
}

declare module "@mui/material/styles" {
  interface ThemeOptions extends ThemedProps {
    typography: CustomTypography;
  }

  interface PaletteOptions extends PaletteOptions {
    heading: string;
    darkTextSecondary: string;
  }

  interface Theme extends ThemedProps {
    typography: CustomTypography;
  }

  interface Palette extends PaletteOptions {
    heading: string;
    darkTextSecondary: string;
  }
}
