import React from "react";

import { Alert, List, Divider } from "@mui/material";
import { styled } from "@mui/system";

import { usePrograms } from "../../hooks/queryHooks/programsHooks/usePrograms";

import { Status } from "../../shared/enums";
import { ProgramItem, SectionHeader, SectionContainer } from "../../components";

const ProgramsPage: React.FC = () => {
  const { status, error, data: programs } = usePrograms();

  return (
    <SectionContainer>
      <SectionHeader>Programs</SectionHeader>
      <NoPaddingDivider />
      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error!</div>}

      <List>
        {programs?.map((program) => {
          return <ProgramItem key={program.id} program={program} />;
        })}
      </List>

      {programs?.length === 0 && (
        <Alert variant="outlined" severity="info">
          There are no training programs yet.
        </Alert>
      )}
      <NoPaddingDivider />
    </SectionContainer>
  );
};

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  marginLeft: `-${theme.spacing(2)}`,
  marginRight: `-${theme.spacing(2)}`,
}));

const Programs = ProgramsPage;
export default Programs;
