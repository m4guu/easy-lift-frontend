import React from "react";

import { Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import {
  PersonalTrainingContainer,
  SegmentTitle,
  NoPaddingDivider,
  Header,
  GymList,
  Gym,
} from "./styles/TrainerViews.styles";

import { gyms } from "../../../Configuration/views/ConfigurationForm/views/Trainer/form/constans";

interface PersonalTrainingInfoProps {
  trainerGymsIds: string[] | undefined;
}

export const PersonalTrainingInfo: React.FC<PersonalTrainingInfoProps> = ({
  trainerGymsIds,
}) => {
  const theme = useTheme();
  const trainerGyms = gyms.filter((gym) =>
    trainerGymsIds?.map((trainerGymId) => trainerGymId === gym.id)
  );

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
        <GymList>
          {trainerGyms.map((trainerGym) => {
            return (
              <Gym key={trainerGym.id} disablePadding>
                <Typography>{trainerGym.name}</Typography>
                <Typography
                  variant="caption"
                  color={theme.palette.text.secondary}
                >
                  {trainerGym.location.city}
                </Typography>
              </Gym>
            );
          })}
        </GymList>
      )}
    </PersonalTrainingContainer>
  );
};
