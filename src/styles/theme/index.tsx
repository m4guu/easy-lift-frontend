import { ReactNode, useMemo } from "react";

import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";

import { useAppSelector } from "../../hooks/useContext";

import pallette from "./palette";
import typography from "./typography";

interface ThemeCongifProps {
  children: ReactNode;
}

export function ThemeConfig({ children }: ThemeCongifProps) {
  const isDarkMode = useAppSelector((state) => state.themeMode.isDarkMode);

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
