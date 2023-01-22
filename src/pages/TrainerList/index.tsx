import React from "react";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useQuery } from "react-query";

import { TrainersService } from "../../services";

import { Trainer } from "../../shared/interfaces";

import { TrainerItem, SectionHeader, SectionContainer } from "../../components";

const TrainerListPage: React.FC = () => {
  const {
    status,
    error,
    data: trainers,
  } = useQuery(["trainers"], TrainersService.get);

  return (
    <SectionContainer>
      <SectionHeader>Our Trainers</SectionHeader>

      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>error</div>}
      <TrainersList>
        {trainers?.map((trainer: Trainer) => {
          return <TrainerItem key={trainer.id} trainer={trainer} />;
        })}
      </TrainersList>
    </SectionContainer>
  );
};

const TrainersList = styled("ul")({
  padding: 0,
});

const TrainerList = TrainerListPage;
export default TrainerList;
