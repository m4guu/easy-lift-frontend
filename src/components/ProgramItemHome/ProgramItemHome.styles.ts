import { Link } from "react-router-dom";

import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

export const ProgramItemCard = styled(Link)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flex: 1,
  width: "100%",
  flexDirection: "column",
  marginBottom: theme.spacing(1),
  alignItems: "center",
  textDecoration: "none",
  borderRadius: theme.spacing(1),
}));

export const HeaderContainer = styled("header")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

export const ProgramImage = styled("img")({
  width: "100%",
  height: "12rem",
  objectFit: "cover",
});

export const Overlay = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background:
    "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6923144257703081) 42%, rgba(8,8,8,0.1895133053221288) 100%)",
});

export const ProgramTitle = styled(Typography)({
  position: "absolute",
  bottom: 15,
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "1px",
});

export const ProgramContent = styled(Box)({
  width: "100%",
  flex: 1,
});

export const ContentWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100%",
  border: `solid thin ${theme.palette.others.border_color}`,
  borderTop: "none",
}));

export const TrainerName = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(0.5),
}));

export const AuthorBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const Description = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
}));
export const DescriptionHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));
export const DescriptionContent = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0.5),
  wordWrap: "break-word",
}));
export const ContentText = styled(Typography)({
  letterSpacing: "1px",
});

export const Price = styled(Typography)(({ theme }) => ({
  position: "absolute",
  left: theme.spacing(0.5),
  bottom: theme.spacing(0.5),
}));
