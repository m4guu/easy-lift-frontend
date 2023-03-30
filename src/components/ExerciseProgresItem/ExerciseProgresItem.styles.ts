import { ListItem, Typography, Box, Avatar } from "@mui/material";
import { styled } from "@mui/system";

export const CustomListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  [theme.breakpoints.down("sm")]: {
    padding: `${theme.spacing(1)} 0`,
  },
}));

export const ListItemContainer = styled(Box)({
  width: "100%",
});

export const ListItemHeader = styled("header")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1),
}));

export const SetsContainer = styled(Box)({
  width: "100%",
});

export const SetsContent = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));
export const SetContent = styled(Box)({
  width: "100%",
  display: "flex",
});
export const SetTitle = styled(Typography)({
  width: "25%",
  fontWeight: "bold",
  fontSize: "0.95rem",
});

export const SetsLabels = styled(Box)({
  width: "100%",
  display: "flex",
  textTransform: "uppercase",
});

export const LabelTitle = styled(Typography)({
  width: "25%",
});

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(1),
  width: "46px",
  height: "46px",
  [theme.breakpoints.down("sm")]: {
    width: "40px",
    height: "40px",
  },
}));
