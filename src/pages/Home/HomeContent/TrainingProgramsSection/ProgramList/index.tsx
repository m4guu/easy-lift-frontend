import React from "react";
import { Link } from "react-router-dom";

import { Alert, Box, Button } from "@mui/material";
import { styled } from "@mui/system";

import { Swiper, SwiperSlide } from "swiper/react";

import { ProgramItemHome, SectionHeader } from "../../../../../components";
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
    <>
      <ProgramSwiperHeader>
        <SectionHeader>training programs</SectionHeader>
      </ProgramSwiperHeader>

      <ProgramsSwiper breakpoints={swiperBreakPoints} className="mySwiper">
        {status === Status.LOADING && <div>loading...</div>}
        {status === Status.ERROR && <div>error</div>}

        <SlideContainer>
          {programs?.map((program: Program) => (
            <SwiperSlide key={program.id}>
              <ProgramItemHome program={program} />
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

        {programs?.length ? <ProgramsNav /> : null}
      </ProgramsSwiper>
    </>
  );
};

const ProgramsSwiper = styled(Swiper)({});

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
  padding: 0,
});
const LinkButton = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  padding: theme.spacing(2),
  color: "inherit",
}));
