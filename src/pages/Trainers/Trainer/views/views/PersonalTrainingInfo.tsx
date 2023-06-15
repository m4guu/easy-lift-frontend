import React from "react";

import { Typography, List } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import {
  PersonalTrainingContainer,
  SegmentTitle,
  NoPaddingDivider,
  Header,
} from "./styles/TrainerViews.styles";

import { gyms } from "../../../../Configuration/views/ConfigurationForm/views/Trainer/form/constans";
import { GymItem } from "../../../../../components";

interface PersonalTrainingInfoProps {
  trainerGymsIds: string[] | undefined;
}

export const PersonalTrainingInfo: React.FC<PersonalTrainingInfoProps> = ({
  trainerGymsIds,
}) => {
  const trainerGyms = gyms.filter((gym) => trainerGymsIds?.includes(gym.id));

  return (
    <PersonalTrainingContainer>
      <Header>
        <SegmentTitle variant="caption" color="primary">
          personal training
        </SegmentTitle>
        {trainerGyms.length === 0 ? (
          <ErrorOutlineIcon color="error" fontSize="small" />
        ) : (
          <CheckCircleOutlineIcon color="success" fontSize="small" />
        )}
      </Header>
      <NoPaddingDivider />

      {trainerGyms.length === 0 ? (
        <Typography>
          trainer does not have the possibility to perform personal training
        </Typography>
      ) : (
        <List>
          {trainerGyms.map((trainerGym) => {
            return <GymItem key={trainerGym.id} gym={trainerGym} />;
          })}
        </List>
      )}
    </PersonalTrainingContainer>
  );
};
