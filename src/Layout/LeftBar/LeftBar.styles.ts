import { styled } from "@mui/system";

export const SectionContainer = styled("section")(({ theme }) => ({
  padding: theme.spacing(2),
  paddingBottom: 0,
  height: "100%",
  borderRight: `solid thin ${theme.palette.others.border_color}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.down("lg")]: {
    borderBottom: `solid thin ${theme.palette.others.border_color}`,
    padding: theme.spacing(1),
  },
}));

export const LeftBarContainer = styled("div")(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.up("lg")]: {
    borderBottom: `solid thin ${theme.palette.others.border_color}`,
  },
  [theme.breakpoints.down("lg")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export const MenuDrawerBox = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("lg")]: {
    display: "block",
  },
}));

export const NavigationContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

export const ThemeSwitchContainer = styled("div")(({ theme }) => ({
  borderTop: `solid thin ${theme.palette.others.border_color}`,
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

export const AccountSettingsBox = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
}));
