import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const FormWrapper = styled("form")(({ theme }) => ({
  display: "flex",
  flex: 1,
  margin: `${theme.spacing(2)} 0`,
  justifyContent: "space-between",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

export const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "30%",
  flexDirection: "column",
  justifyContent: "center",
  marginLeft: "auto",
  marginRight: "auto",
  gap: theme.spacing(2),
  [theme.breakpoints.down("lg")]: {
    width: "50%",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
export const FormMapBox = styled(Box)(({ theme }) => ({
  minWidth: "50%",
  margin: ` -${theme.spacing(4)} -${theme.spacing(2)} -${theme.spacing(4)} 0`,
  [theme.breakpoints.down("md")]: {
    minWidth: "100%",
  },
}));
export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  textAlign: "left",
  color: theme.palette.primary.main,
}));
