import React from "react";

import { Box, Typography, Chip } from "@mui/material";
import { styled } from "@mui/system";

interface HeaderProps {
  title: string;
  price: number;
  image: string;
}

export const Header: React.FC<HeaderProps> = ({ title, price, image }) => {
  return (
    <HeaderContainer>
      <ProgramImage src={image} alt="program" />
      <Overlay />
      <ProgramTitle variant="subtitle1" color="primary">
        {title}
      </ProgramTitle>
      <Price
        variant="outlined"
        color="primary"
        label={
          <Typography variant="subtitle1">{price.toFixed(2)} $</Typography>
        }
      />
    </HeaderContainer>
  );
};

const HeaderContainer = styled("header")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
});

const ProgramImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxHeight: "20rem",
  objectFit: "cover",
  [theme.breakpoints.up("md")]: {
    maxHeight: "30rem",
  },
}));
const Price = styled(Chip)({
  position: "absolute",
  border: "solid 0.12rem",
  borderRadius: "0.6rem",
  right: 10,
  top: 10,
});
const Overlay = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background:
    "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3923144257703081) 72%, rgba(8,8,8,0.3895133053221288) 100%)",
});

const ProgramTitle = styled(Typography)({
  position: "absolute",
  bottom: 15,
  textTransform: "uppercase",
  letterSpacing: "1px",
});
