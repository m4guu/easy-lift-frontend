import React from "react";

import { Typography, Alert } from "@mui/material";
import { styled } from "@mui/system";

import { Swiper, SwiperSlide } from "swiper/react";

import { ProgramItem } from "../../../../../components";
import ProgramsNav from "./ProgramsNav";

import "swiper/css";
import "swiper/css/pagination";

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
  position: "relative",
});

const ProgramSwiperHeader = styled("header")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "1rem",
});

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

const DUMMY_PROGRAMS: { id: string; name: string; description: string }[] = [
  {
    id: "DUMMY-ID-1",
    name: "Random Name #1",
    description: "Probably the most random thing you have ever seen!",
  },
  {
    id: "DUMMY-ID-2",
    name: "Random Name #2",
    description: "Hello World!",
  },
  {
    id: "DUMMY-ID-3",
    name: "Random Name #3",
    description: "Probably the most random thing you have ever seen!",
  },
  {
    id: "DUMMY-ID-4",
    name: "Random Name #4",
    description: "Hello World!",
  },
  {
    id: "DUMMY-ID-5",
    name: "Random Name #5",
    description: "Probably the most random thing you have ever seen!",
  },
  {
    id: "DUMMY-ID-6",
    name: "Random Name #6",
    description: "Hello World!",
  },
  {
    id: "DUMMY-ID-7",
    name: "Random Name #7",
    description: "Probably the most random thing you have ever seen!",
  },
  {
    id: "DUMMY-ID-8",
    name: "Random Name #8",
    description: "Hello World!",
  },
];

export default ProgramList;
