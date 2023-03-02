import React from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styled from "@mui/system/styled";

import { useSwiper } from "swiper/react";

import { ButtonBase } from "../../../../../../../components";

export const PrevSlideButton: React.FC = () => {
  const swiper = useSwiper();

  return (
    <PrevButton
      onClick={() => swiper.slidePrev()}
      startIcon={<ArrowBackIosIcon />}
      size="small"
      variant="outlined"
    >
      prev
    </PrevButton>
  );
};

const PrevButton = styled(ButtonBase)(({ theme }) => ({}));
