import React from "react";

import { ListItem, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { Gym } from "../../shared/interfaces";

const GymItem: React.FC<{ gym: Gym }> = ({ gym }) => {
  return (
    <Item key={gym.id} disablePadding>
      <Typography>{gym.name}</Typography>
      <Typography variant="caption" color="text.secondary">
        {gym.location.city}
      </Typography>
    </Item>
  );
};

const Item = styled(ListItem)({
  flexDirection: "column",
  alignItems: "flex-start",
});

export default GymItem;
