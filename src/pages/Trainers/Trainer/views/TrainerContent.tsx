import React from "react";
import { Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useUser } from "../../../../hooks/queryHooks/userHooks/useUser";
import { UserAvatar } from "../../../../components/ExerciseProgresItem/ExerciseProgresItem.styles";

import { TrainerPrograms } from "./views/TrainerPrograms";
import { PersonalTrainingInfo } from "./views/PersonalTrainingInfo";
import { API_URL } from "../../../../config/env/env.config";
import { StatusBar } from "../../../../components";

export const TrainerContent: React.FC<{ trainerId: string }> = ({
  trainerId,
}) => {
  const theme = useTheme();
  const { status, error, data: trainer } = useUser(trainerId);

  return (
    <Box>
      {trainer && (
        <Box>
          <BasicInformation>
            <UserAvatar src={`${API_URL}${trainer.image}`} alt="User Avatar" />
            <Typography>{trainer.name}</Typography>
            <Typography
              component="address"
              variant="caption"
              color={theme.palette.text.secondary}
            >
              <Email href={`mailto:${trainer.email}`}>{trainer.email}</Email>
            </Typography>
          </BasicInformation>
          <PersonalTrainingInfo trainerGymsIds={trainer.gyms} />
          <TrainerPrograms trainerId={trainerId} />
        </Box>
      )}

      <StatusBar status={status} error={error} />
    </Box>
  );
};

const BasicInformation = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Email = styled("a")(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontStyle: "normal",
  fontWeight: "normal",
}));
