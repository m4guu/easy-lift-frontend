import "@mui/material";

declare module "@mui/material/styles/createStyles" {
  interface Pallette {
    grey: { main: string };
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
