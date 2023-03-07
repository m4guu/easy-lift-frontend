import React from "react";

import { Link } from "react-router-dom";

import { Box, Typography, ListItem, Button } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { User } from "../../shared/interfaces";

import { PATHS } from "../../pages/paths";
import { UserAvatar } from "../ExerciseProgresItem/ExerciseProgresItem.styles";

import DUMMY_TRAINER_IMAGE from "../../assets/images/DUMMY_PROFILE_IMG/profile-img-id.jpeg";

type TrainerItemProps = {
  trainer: User;
};

const TrainerItem: React.FC<TrainerItemProps> = ({ trainer }) => {
  return (
    <TrainerListItem disablePadding>
      <UserInfo>
        <UserAvatar
          src={DUMMY_TRAINER_IMAGE}
          variant="square"
          sx={{ width: 60, height: 60 }}
          alt="Avatar"
        />
        <Typography variant="h3">{trainer.name}</Typography>
      </UserInfo>
      <InfoLink to={`${PATHS.TRAINERS}/${trainer.id}`}>
        <Button size="small">info </Button>
      </InfoLink>
    </TrainerListItem>
  );
};

const TrainerListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
  margin: `${theme.spacing(1)} 0`,
}));

const InfoLink = styled(Link)({
  textDecoration: "none",
});

const UserInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export default TrainerItem;
