import React from "react";
import { Box, Alert, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useUser } from "../../../../hooks/queryHooks/userHooks/useUser";
import { Status } from "../../../../shared/enums";
import { UserAvatar } from "../../../../components/ExerciseProgresItem/ExerciseProgresItem.styles";

import { TrainerPrograms } from "./views/TrainerPrograms";
import { PersonalTrainingInfo } from "./views/PersonalTrainingInfo";
import { API_URL } from "../../../../config/env.config";

export const TrainerContent: React.FC<{ trainerId: string }> = ({
  trainerId,
}) => {
  const theme = useTheme();
  const { status, error, data: trainer } = useUser(trainerId);

  return (
    <Box>
      {status === Status.LOADING && <Typography>loading...</Typography>}
      {status === Status.ERROR && <Typography>error</Typography>}
      {status === Status.SUCCESS && trainer ? (
        <Box>
          <BasicInformation>
            <UserAvatar src={`${API_URL}${trainer.image}`} alt="User Avatar" />
            <Typography>{trainer.name}</Typography>
            <Typography variant="caption" color={theme.palette.text.secondary}>
              {trainer.email}
            </Typography>
          </BasicInformation>
          <PersonalTrainingInfo trainerGymsIds={trainer.gyms} />
          <TrainerPrograms trainerId={trainerId} />
        </Box>
      ) : (
        <Alert variant="outlined" severity="info">
          There is no trainer with provided ID.
        </Alert>
      )}
    </Box>
  );
};

const BasicInformation = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
