import React from "react";

import { Alert, Typography } from "@mui/material";

import { usePrograms } from "../../hooks/queryHooks/programsHooks/usePrograms";

import { Status } from "../../shared/enums";
import { Programs } from "./views/Programs/Programs";
import { SectionHeader, SectionContainer } from "../../components";

const ProgramsPage: React.FC = () => {
  const { status, error, data: programs } = usePrograms();

  return (
    <SectionContainer>
      <SectionHeader>Programs</SectionHeader>
      {status === Status.LOADING && <Typography>loading...</Typography>}
      {status === Status.ERROR && <Typography>error!</Typography>}

      {programs?.length === 0 && (
        <Alert variant="outlined" severity="info">
          There are no training programs yet.
        </Alert>
      )}

      {programs && <Programs programs={programs} />}
    </SectionContainer>
  );
};

export default ProgramsPage;
