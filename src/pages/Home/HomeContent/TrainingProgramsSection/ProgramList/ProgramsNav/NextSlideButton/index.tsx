import React from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "@mui/system/styled";

import { useSwiper } from "swiper/react";

import { ButtonBase } from "../../../../../../../components";

export const NextSlideButton: React.FC = () => {
  const swiper = useSwiper();

  return (
    <NextButton
      onClick={() => swiper.slideNext()}
      endIcon={<ArrowForwardIosIcon />}
      size="small"
      variant="outlined"
    >
      next
    </NextButton>
  );
};

const NextButton = styled(ButtonBase)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    position: "absolute",
    paddingLeft: 0,
    right: 0,
    bottom: "7.5rem",
  },
}));
