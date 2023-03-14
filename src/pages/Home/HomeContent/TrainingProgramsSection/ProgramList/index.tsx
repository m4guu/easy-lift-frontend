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
    <Box>
      <ProgramSwiperHeader>
        <SectionHeader>training programs</SectionHeader>
        <ButtonLink variant="outlined" size="small">
          <LinkButton to={PATHS.PROGRAMS}>show all</LinkButton>
        </ButtonLink>
      </ProgramSwiperHeader>

      <ProgramsSwiper breakpoints={swiperBreakPoints} className="mySwiper">
        {status === Status.LOADING && <div>loading...</div>}
        {status === Status.ERROR && <div>error</div>}

        <SlideContainer>
          {programs?.map((program: Program) => (
            <Slide key={program.id}>
              <ProgramItemHome program={program} />
            </Slide>
          ))}
        </SlideContainer>

        {programs?.length === 0 && (
          <Alert variant="outlined" severity="info">
            There are no training programs yet.
          </Alert>
        )}

        {programs?.length ? <ProgramsNav /> : null}
      </ProgramsSwiper>
    </Box>
  );
};

const ProgramsSwiper = styled(Swiper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const ProgramSwiperHeader = styled("header")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const SlideContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingBottom: theme.spacing(1),
}));

const Slide = styled(SwiperSlide)({
  display: "flex",
  height: "auto !important",
});

const ButtonLink = styled(Button)({});
const LinkButton = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
}));
