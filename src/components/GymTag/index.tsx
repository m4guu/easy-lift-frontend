import React from "react";

import { Box, Button, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { Gym } from "../../shared/interfaces";

interface GymTagProps {
  gym: Gym;
  removeGym: (gym: Gym) => void;
}

const GymTag: React.FC<GymTagProps> = ({ gym, removeGym }) => {
  return (
    <TagItem disablePadding>
      <Typography>{gym.name}</Typography>
      <GymActions>
        <Remove color="error" onClick={() => removeGym(gym)}>
          remove
        </Remove>
      </GymActions>
    </TagItem>
  );
};

const TagItem = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const GymActions = styled(Box)({});
const Remove = styled(Button)({});

export default GymTag;
