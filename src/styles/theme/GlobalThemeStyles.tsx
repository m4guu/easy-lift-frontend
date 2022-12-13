import { GlobalStyles, useTheme } from "@mui/material";

export function GlobalThemeStyles() {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        html: {
          fontSize: "62.5%",
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          overflow: "hidden",
          width: "100%",
          height: "100%",
          backgroundColor: theme.palette.background.default,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
        // Override the InfoWindow (Map) element's styles to match the dark theme
        ".gm-style .gm-style-iw-d::-webkit-scrollbar-track, .gm-style .gm-style-iw-d::-webkit-scrollbar-track-piece, .gm-style .gm-style-iw-c, .gm-style .gm-style-iw-t::after":
          {
            background: theme.palette.background.paper,
          },
      }}
    />
  );
}
