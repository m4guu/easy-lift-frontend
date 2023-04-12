import React from "react";
import { useParams } from "react-router-dom";

import { Box, Alert, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useUser } from "../../../hooks/queryHooks/userHooks/useUser";

import { Status } from "../../../shared/enums";
import { SectionHeader, SectionContainer } from "../../../components";
import { UserAvatar } from "../../../components/ExerciseProgresItem/ExerciseProgresItem.styles";

// todo: change dummy-user-image
import DUMMY_USER_IMG from "../../../assets/images/DUMMY_PROFILE_IMG/profile-img-id.jpeg";
import { TrainerPrograms } from "./views/TrainerPrograms";
import { PersonalTrainingInfo } from "./views/PersonalTrainingInfo";

const Trainer: React.FC = () => {
  const { trainerId } = useParams();
  const theme = useTheme();

  const { status, error, data: trainer } = useUser(trainerId);

  return (
    <SectionContainer>
      <SectionHeader>Trainer</SectionHeader>

      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error</div>}
      {status === Status.SUCCESS && trainer.length !== 0 ? (
        <TrainerContainer>
          <BasicInformation>
            <UserAvatar src={DUMMY_USER_IMG} alt="User Avatar" />
            <Typography>{trainer[0].name}</Typography>
            <Typography variant="caption" color={theme.palette.text.secondary}>
              {trainer[0].email}
            </Typography>
          </BasicInformation>
          <PersonalTrainingInfo trainerGymsIds={trainer[0].gyms} />
          <TrainerPrograms trainerId={trainerId} />
        </TrainerContainer>
      ) : (
        <Alert variant="outlined" severity="info">
          There is no trainer with provided ID.
        </Alert>
      )}
    </SectionContainer>
  );
};

const TrainerContainer = styled(Box)({});
const BasicInformation = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default Trainer;
