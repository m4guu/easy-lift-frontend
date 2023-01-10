import React from "react";

import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "@mui/system/styled";

import { useSwiper } from "swiper/react";

const NextSlideButton: React.FC = () => {
  const swiper = useSwiper();

  return (
    <NextButton
      onClick={() => swiper.slideNext()}
      endIcon={<ArrowForwardIosIcon />}
      size="small"
      variant="outlined"
    >
      <ButtonText>next</ButtonText>
    </NextButton>
  );
};

const NextButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    position: "absolute",
    paddingLeft: 0,
    right: 0,
    bottom: "7.5rem",
  },
}));

const ButtonText = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export default NextSlideButton;
