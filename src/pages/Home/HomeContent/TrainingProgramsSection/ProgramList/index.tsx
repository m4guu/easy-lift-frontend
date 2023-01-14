import React from "react";

import { Typography, Alert } from "@mui/material";
import { styled } from "@mui/system";

import { Swiper, SwiperSlide } from "swiper/react";

import { ProgramItem } from "../../../../../components";
import ProgramsNav from "./ProgramsNav";

import "swiper/css";
import "swiper/css/pagination";

import { DUMMY_PROGRAMS } from "./constatns";

const ProgramList: React.FC = () => {
  const areTherePrograms = DUMMY_PROGRAMS.length;
  return (
    <ProgramsSwiper breakpoints={swiperBreakPoints} className="mySwiper">
      {areTherePrograms ? (
        <SlideContainer>
          {DUMMY_PROGRAMS.map((program) => (
            <SwiperSlide key={program.id}>
              <ProgramItem program={program} />
            </SwiperSlide>
          ))}
        </SlideContainer>
      ) : (
        <Alert variant="outlined" severity="info">
          There are no training programs yet.
        </Alert>
      )}
      <ProgramSwiperHeader>
        <Typography variant="caption">training programs</Typography>
        {areTherePrograms ? <ProgramsNav /> : null}
      </ProgramSwiperHeader>
    </ProgramsSwiper>
  );
};

const ProgramsSwiper = styled(Swiper)({
  display: "flex",
  flexDirection: "column-reverse",
  height: "100%",
});

const ProgramSwiperHeader = styled("header")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: theme.spacing(1),
}));

const SlideContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
}));

const swiperBreakPoints = {
  600: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1200: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1536: {
    slidesPerView: 5,
    spaceBetween: 30,
  },
};

export default ProgramList;
