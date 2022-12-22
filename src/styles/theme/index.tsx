import { ReactNode, useMemo } from "react";
// import { CommonInterface } from "./palette";

import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";

import pallette from "./palette";
import typography from "./typography";

import { useIsDarkMode } from "../../store/redux-store/slices/themeMode/themeMode.hooks";

interface ThemeCongifProps {
  children: ReactNode;
}

export function ThemeConfig({ children }: ThemeCongifProps) {
  const isDarkMode = useIsDarkMode();

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isDarkMode
        ? { ...pallette.dark, mode: "dark" }
        : { ...pallette.light, mode: "light" },
      typography,
    }),
    [isDarkMode]
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
