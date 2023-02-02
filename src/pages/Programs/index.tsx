import React from "react";

import { Alert } from "@mui/material";
import { styled } from "@mui/system";

import { usePrograms } from "../../hooks/queryHooks/programsHooks/usePrograms";

import { Status } from "../../shared/enums";
import { ProgramItem, SectionHeader, SectionContainer } from "../../components";

const ProgramsPage: React.FC = () => {
  const { status, error, data: programs } = usePrograms();

  return (
    <SectionContainer>
      <SectionHeader>Programs</SectionHeader>

      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error!</div>}

      <ProgramsList>
        {programs?.map((program) => {
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

const Programs = ProgramsPage;
export default Programs;
