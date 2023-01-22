import React from "react";

import { useQuery } from "react-query";

import { Alert } from "@mui/material";
import { styled } from "@mui/system";

import { Program } from "../../shared/interfaces";
import { ProgramsService } from "../../services";

import { ProgramItem, SectionHeader, SectionContainer } from "../../components";

const ProgramListPage: React.FC = () => {
  const {
    status,
    error,
    data: programs,
  } = useQuery(["programs"], ProgramsService.getAllPrograms);

  return (
    <SectionContainer>
      <SectionHeader>Programs</SectionHeader>

      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>error</div>}

      <ProgramsList>
        {programs?.map((program: Program) => {
          return <ProgramItem key={program.id} program={program} />;
        })}
      </ProgramsList>

      {programs?.length === 0 && (
        <Alert variant="outlined" severity="info">
          There are no training programs yet.
        </Alert>
      )}
    </SectionContainer>
  );
};

const ProgramsList = styled("ul")({});

const ProgramList = ProgramListPage;
export default ProgramList;
