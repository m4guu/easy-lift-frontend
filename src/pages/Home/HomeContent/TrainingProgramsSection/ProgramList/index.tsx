import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";

import { Typography, Alert, Box, Button } from "@mui/material";
import { styled } from "@mui/system";

import { Swiper, SwiperSlide } from "swiper/react";

import { ProgramsService } from "../../../../../services";

import { ProgramItem } from "../../../../../components";
import { ProgramsNav } from "./ProgramsNav";

import "swiper/css";
import "swiper/css/pagination";

import { swiperBreakPoints } from "./constatns";
import { Program } from "../../../../../shared/interfaces";

import { PATHS } from "../../../../paths";

export const ProgramList: React.FC = () => {
  const {
    status,
    error,
    data: programs,
  } = useQuery(["10-programs"], ProgramsService.get10Programs);

  // hardcoded filter 10 programs, because json-server doesnt support limit query params
  const tenPrograms = programs?.slice(0, 10);

  return (
    <ProgramsSwiper breakpoints={swiperBreakPoints} className="mySwiper">
      {status === "loading" && <div>loading...</div>}
      {status === "error" && <div>error</div>}

      <SlideContainer>
        {tenPrograms?.map((program: Program) => (
          <SwiperSlide key={program.id}>
            <ProgramItem program={program} />
          </SwiperSlide>
        ))}

        <SwiperSlide>
          <ButtonLink variant="outlined">
            <LinkButton to={PATHS.PROGRAMS}>See all programs</LinkButton>
          </ButtonLink>
        </SwiperSlide>
      </SlideContainer>

      {programs?.length === 0 && (
        <Alert variant="outlined" severity="info">
          There are no training programs yet.
        </Alert>
      )}

      <ProgramSwiperHeader>
        <Typography variant="caption">training programs</Typography>
        {programs?.length ? <ProgramsNav /> : null}
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

const ButtonLink = styled(Button)({
  height: "100%",
  padding: 0,
});
const LinkButton = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  height: "100%",
  padding: theme.spacing(2),
  color: "inherit",
}));
