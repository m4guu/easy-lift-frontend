import React from "react";

import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styled from "@mui/system/styled";

import { useSwiper } from "swiper/react";

const PrevSlideButton: React.FC = () => {
  const swiper = useSwiper();

  return (
    <PrevButton
      onClick={() => swiper.slidePrev()}
      startIcon={<ArrowBackIosIcon />}
      size="small"
      variant="outlined"
    >
      <ButtonText>prev</ButtonText>
    </PrevButton>
  );
};

const PrevButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    position: "absolute",
    paddingRight: 0,
    left: 0,
    bottom: "7.5rem",
  },
}));
const ButtonText = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
export default PrevSlideButton;
