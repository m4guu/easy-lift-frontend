import React from "react";
import { useParams } from "react-router-dom";

import { Box, Alert } from "@mui/material";

import { useUser } from "../../../hooks/queryHooks/userHooks/useUser";

import { Status } from "../../../shared/enums";
import { SectionHeader, SectionContainer } from "../../../components";

const Trainer: React.FC = () => {
  const { trainerId } = useParams();

  const { status, error, data: trainer } = useUser(trainerId || "");

  return (
    <SectionContainer>
      <SectionHeader>Trainer</SectionHeader>

      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error</div>}
      {status === Status.SUCCESS && trainer.length !== 0 && (
        <>
          <Box>TRAINER NAME: {trainer[0].name}</Box>
          <Box>TRAINER ID: {trainer[0].id}</Box>
        </>
      )}
      {status === Status.SUCCESS && trainer.length === 0 && (
        <Alert variant="outlined" severity="info">
          There is no trainer with provided ID.
        </Alert>
      )}
    </SectionContainer>
  );
};

export default Trainer;
