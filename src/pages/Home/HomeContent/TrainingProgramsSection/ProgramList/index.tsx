import React from "react";
import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { Swiper, SwiperSlide } from "swiper/react";

import { ProgramItemHome, SectionHeader } from "../../../../../components";
import { ProgramsNav } from "./ProgramsNav";

import "swiper/css";
import "swiper/css/pagination";

import { usePrograms } from "../../../../../hooks/queryHooks/programsHooks/usePrograms";

import { PATHS } from "../../../../paths";
import { queries, swiperBreakPoints } from "./constatns";
import { QueryKey, Status } from "../../../../../shared/enums";
import { Program } from "../../../../../shared/interfaces";
import { usePaginatedResultItems } from "../../../../../hooks";
import { generateQueriesPath } from "../../../../../utils/Queries";

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
        {status === Status.LOADING && <Typography>loading...</Typography>}
        {status === Status.ERROR && <Typography>error</Typography>}
        {noPrograms ? (
          <Typography>There are no programs yet.</Typography>
        ) : (
          <ProgramsNav />
        )}

        <SlideContainer>
          {programs &&
            programs.map((program: Program) => (
              <Slide key={program.id}>
                <ProgramItemHome program={program} />
              </Slide>
            ))}
        </SlideContainer>
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
