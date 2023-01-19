import React from "react";

import { Typography, Alert, Box } from "@mui/material";
import { styled } from "@mui/system";

import { Swiper, SwiperSlide } from "swiper/react";

import { ProgramItem } from "../../../../../components";
import ProgramsNav from "./ProgramsNav";

import "swiper/css";
import "swiper/css/pagination";

import { DUMMY_PROGRAMS, swiperBreakPoints } from "./constatns";

const ProgramList: React.FC = () => {
  return (
    <ProgramsSwiper breakpoints={swiperBreakPoints} className="mySwiper">
      {DUMMY_PROGRAMS.length !== 0 ? (
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
        {DUMMY_PROGRAMS.length ? <ProgramsNav /> : null}
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

const SlideContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
}));

export default ProgramList;
