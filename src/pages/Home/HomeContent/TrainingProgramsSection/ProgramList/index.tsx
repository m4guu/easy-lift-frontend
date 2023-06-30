import React from "react";
import { Link } from "react-router-dom";

import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import {
  ProgramItemHome,
  SectionHeader,
  StatusBar,
} from "../../../../../components";

import { usePrograms } from "../../../../../hooks/queryHooks/programsHooks/usePrograms";
import { generateQueriesPath } from "../../../../../utils/Queries";
import { usePaginatedResultItems } from "../../../../../hooks";

import { PATHS } from "../../../../paths";
import { queries, swiperBreakPoints } from "./constatns";
import { QueryKey, Status } from "../../../../../shared/enums";
import { Program } from "../../../../../shared/interfaces";

export const ProgramList: React.FC = () => {
  const queryPath = generateQueriesPath(queries);
  const {
    status,
    error,
    data: infinityPrograms,
  } = usePrograms(queryPath, QueryKey.TEN_PROGRAMS);

  const programs = usePaginatedResultItems(
    infinityPrograms,
    (response) => response
  );
  const noPrograms = status === Status.SUCCESS && programs.length === 0;

  return (
    <Box>
      <ProgramSwiperHeader>
        <SectionHeader>training programs</SectionHeader>
        <ButtonLink variant="outlined" size="small">
          <LinkButton to={PATHS.PROGRAMS}>show all</LinkButton>
        </ButtonLink>
      </ProgramSwiperHeader>

      <ProgramsSwiper breakpoints={swiperBreakPoints} className="mySwiper">
        <SlideContainer>
          {programs &&
            programs.map((program: Program) => (
              <Slide key={program.id}>
                <ProgramItemHome program={program} />
              </Slide>
            ))}
        </SlideContainer>
        <StatusBar
          status={status}
          error={error}
          noItems={noPrograms}
          itemName="programs"
        />
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
const LinkButton = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});
