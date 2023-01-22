import React from "react";

import { useQuery } from "react-query";

import { Box, Typography, Alert } from "@mui/material";
import { styled } from "@mui/system";

import { Program } from "../../shared/interfaces";
import { ProgramsService } from "../../services";
import { ProgramItem } from "../../components";

const ProgramListPage: React.FC = () => {
  const {
    status,
    error,
    data: programs,
  } = useQuery(["programs"], ProgramsService.getAllPrograms);

  return (
    <ProgramListContainer>
      <ProgramListHeader>
        <Typography variant="caption">Programs</Typography>
      </ProgramListHeader>

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
    </ProgramListContainer>
  );
};

const ProgramListContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ProgramListHeader = styled("header")(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ProgramsList = styled("ul")({});

const ProgramList = ProgramListPage;
export default ProgramList;
