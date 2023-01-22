import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "react-query";

import { Box, Alert } from "@mui/material";
import { styled } from "@mui/system";

import { TrainersService } from "../../../services";

import { SectionHeader, SectionContainer } from "../../../components";

const Trainer: React.FC = () => {
  const { trainerId } = useParams();

  const {
    status,
    error,
    data: trainer,
  } = useQuery(["trainer"], () => TrainersService.getTrainerById(trainerId));

  return (
    <SectionContainer>
      <SectionHeader>Trainer</SectionHeader>

      {status === "loading" && <div>loading...</div>}
      {status === "error" && <div>error</div>}
      {status === "success" && trainer.length !== 0 && (
        <>
          <Box>TRAINER NAME: {trainer[0].name}</Box>
          <Box>TRAINER ID: {trainer[0].id}</Box>
        </>
      )}
      {status === "success" && trainer.length === 0 && (
        <Alert variant="outlined" severity="info">
          There is no trainer with provided ID.
        </Alert>
      )}
    </SectionContainer>
  );
};

export default Trainer;
