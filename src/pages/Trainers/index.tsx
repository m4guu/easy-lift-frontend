import React from "react";

import { styled } from "@mui/system";

import { useTrainers } from "../../hooks/queryHooks/trainersHooks/useTrainers";

import { Status } from "../../shared/enums";
import { TrainerItem, SectionHeader, SectionContainer } from "../../components";

const TrainersPage: React.FC = () => {
  const { status, error, data: trainers } = useTrainers();

  return (
    <SectionContainer>
      <SectionHeader>Our Trainers</SectionHeader>

      {status === Status.LOADING && <div>Loading...</div>}
      {status === Status.ERROR && <div>error</div>}

      <TrainersList>
        {trainers?.map((trainer) => {
          return <TrainerItem key={trainer.id} trainer={trainer} />;
        })}
      </TrainersList>
    </SectionContainer>
  );
};

const TrainersList = styled("ul")({
  padding: 0,
});

const Trainers = TrainersPage;
export default Trainers;
