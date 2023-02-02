import React from "react";

import { useParams } from "react-router-dom";

import { Box, Alert } from "@mui/material";

import { Status } from "../../../shared/enums";
import { SectionHeader, SectionContainer } from "../../../components";
import { useProgram } from "../../../hooks/queryHooks/programsHooks/useProgram";

const ProgramPage: React.FC = () => {
  const { programId } = useParams();

  const { status, error, data: program } = useProgram(programId || "");

  return (
    <SectionContainer>
      <SectionHeader>Program</SectionHeader>

      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error!</div>}
      {status === Status.SUCCESS && program.length !== 0 && (
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
    </SectionContainer>
  );
};

const Program = ProgramPage;
export default Program;
