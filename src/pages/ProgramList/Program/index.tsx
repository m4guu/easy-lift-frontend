import React from "react";

import { useParams } from "react-router-dom";

import { Box, Typography, Alert } from "@mui/material";
import { styled } from "@mui/system";

import { useQuery } from "react-query";

import { ProgramsService } from "../../../services";

const ProgramPage: React.FC = () => {
  const { programId } = useParams();

  const {
    status,
    error,
    data: program,
  } = useQuery(["program"], () => ProgramsService.getProgramById(programId));

  return (
    <ProgramPageContainer>
      <ProgramPageHeader>
        <Typography variant="caption">Program</Typography>
      </ProgramPageHeader>
      {status === "loading" && null}
      {status === "error" && null}
      {status === "success" && program.length !== 0 && (
        <>
          <Box>PROGRAM TITLE: {program[0].title}</Box>
          <Box>CREATOR ID: {program[0].creator}</Box>
          <Box>PROGRAM DESCRIPTION: {program[0].description}</Box>
        </>
      )}
      {status === "success" && program.length === 0 && (
        <Alert variant="outlined" severity="info">
          There is no program with provided ID.
        </Alert>
      )}
    </ProgramPageContainer>
  );
};

const ProgramPageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ProgramPageHeader = styled("header")({});

const Program = ProgramPage;
export default Program;
