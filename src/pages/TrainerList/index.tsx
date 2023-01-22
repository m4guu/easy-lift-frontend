import React from "react";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useQuery } from "react-query";

import TrainersService from "../../services/TrainersService";

import { Trainer } from "../../shared/interfaces";

import { TrainerItem } from "../../components";

const TrainerListPage: React.FC = () => {
  const {
    status,
    error,
    data: trainers,
  } = useQuery(["trainers"], TrainersService.get);

  return (
    <TrainerListContainer>
      <TrainerListHeader>
        <Typography variant="caption">Our Trainers</Typography>
      </TrainerListHeader>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>error</div>}
      <TrainersList>
        {trainers?.map((trainer: Trainer) => {
          return <TrainerItem key={trainer.id} trainer={trainer} />;
        })}
      </TrainersList>
    </TrainerListContainer>
  );
};

const TrainerListContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));
const TrainerListHeader = styled("header")({});
const TrainersList = styled("ul")({
  padding: 0,
});

const TrainerList = TrainerListPage;
export default TrainerList;
