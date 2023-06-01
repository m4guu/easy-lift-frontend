import React from "react";
import { Box, Alert, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useUser } from "../../../../hooks/queryHooks/userHooks/useUser";
import { Status } from "../../../../shared/enums";
import { UserAvatar } from "../../../../components/ExerciseProgresItem/ExerciseProgresItem.styles";

// todo: change dummy-user-image
import DUMMY_USER_IMG from "../../../../assets/images/DUMMY_PROFILE_IMG/profile-img-id.jpeg";
import { TrainerPrograms } from "./views/TrainerPrograms";
import { PersonalTrainingInfo } from "./views/PersonalTrainingInfo";

export const TrainerContent: React.FC<{ trainerId: string }> = ({
  trainerId,
}) => {
  const theme = useTheme();
  const { status, error, data: trainer } = useUser(trainerId);

  return (
    <Box>
      {status === Status.LOADING && <Typography>loading...</Typography>}
      {status === Status.ERROR && <Typography>error</Typography>}
      {status === Status.SUCCESS && trainer.length !== 0 ? (
        <Box>
          <BasicInformation>
            <UserAvatar src={DUMMY_USER_IMG} alt="User Avatar" />
            <Typography>{trainer[0].name}</Typography>
            <Typography variant="caption" color={theme.palette.text.secondary}>
              {trainer[0].email}
            </Typography>
          </BasicInformation>
          <PersonalTrainingInfo trainerGymsIds={trainer[0].gyms} />
          {trainerId && <TrainerPrograms trainerId={trainerId} />}
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
