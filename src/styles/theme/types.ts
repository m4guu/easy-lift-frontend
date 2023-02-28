import "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    custom_grey: { main: string; tint_1: string; tint_2: string };
    others: {
      border_color: string;
      activeNavItem: string;
    };
    action: {
      hover: string;
      hoverOpacity: number;
    };
  }
}

declare module "@mui/material/styles" {
  interface PaletteOptions {
    custom_grey?: { main: string; tint_1: string; tint_2: string };
  }
}
