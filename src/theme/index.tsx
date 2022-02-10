import { FC, useMemo, useState } from "react";
import { CssBaseline, PaletteMode, ThemeOptions } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    smd: true;
    md: true;
    lg: true;
    xl: true;
    mobile: false;
    tablet: false;
    laptop: false;
    desktop: false;
  }

  interface Palette {
    regular: Palette["primary"];
  }
}

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  breakpoints: {
    values: {
      xs: 450,
      sm: 600,
      smd: 992,
      md: 1150,
      lg: 1250,
      xl: 1536,
    },
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#000",
          },
          background: {
            default: "#fff",
            paper: "#fff",
          },
          text: {
            primary: "#fff",
            secondary: "#fff",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#fff",
          },
          background: {
            default: "#000",
            paper: "#fff",
          },
          text: {
            primary: "#fff",
            secondary: "#fff",
          },
        }),
  },
});

const Theme: FC = ({ children }) => {
  const [mode] = useState("light");

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode as PaletteMode)),
    [mode]
  );

  theme.typography.body2 = {
    [theme.breakpoints.down("sm")]: {
      fontWeight: 300,
      fontSize: "0.7rem",
    },
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Theme;
