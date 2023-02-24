import React from "react";
import { Link } from "react-router-dom";

import { Typography, Alert, Box, Button } from "@mui/material";
import { styled } from "@mui/system";

import { Swiper, SwiperSlide } from "swiper/react";

import { ProgramItem, SectionHeader } from "../../../../../components";
import { ProgramsNav } from "./ProgramsNav";

import "swiper/css";
import "swiper/css/pagination";

import { use10Programs } from "../../../../../hooks/queryHooks/programsHooks/use10Programs";

import { PATHS } from "../../../../paths";
import { swiperBreakPoints } from "./constatns";
import { Status } from "../../../../../shared/enums";
import { Program } from "../../../../../shared/interfaces";

export const ProgramList: React.FC = () => {
  const { status, error, data: programs } = use10Programs();

  return (
    <ProgramsSwiper breakpoints={swiperBreakPoints} className="mySwiper">
      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error</div>}

      <SlideContainer>
        {programs?.map((program: Program) => (
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
        <SectionHeader>training programs</SectionHeader>
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
