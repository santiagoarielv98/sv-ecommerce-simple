import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    custom?: {
      spacing?: {
        sectionPadding?: string;
      };
      shadows?: {
        productCard?: string;
      };
      maxContainerWidth?: number;
    };
  }
}
