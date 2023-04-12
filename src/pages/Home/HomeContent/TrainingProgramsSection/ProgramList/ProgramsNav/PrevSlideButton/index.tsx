import React from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useSwiper } from "swiper/react";

import { ButtonBase } from "../../../../../../../components";

export const PrevSlideButton: React.FC = () => {
  const swiper = useSwiper();

  return (
    <ButtonBase
      onClick={() => swiper.slidePrev()}
      startIcon={<ArrowBackIosIcon />}
      size="small"
      variant="outlined"
    >
      prev
    </ButtonBase>
  );
};
