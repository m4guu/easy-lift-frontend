import React from "react";

import { ListItem, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { Gym } from "../../shared/interfaces";

const GymItem: React.FC<{ gym: Gym }> = ({ gym }) => {
  const theme = useTheme();
  return (
    <Item key={gym.id} disablePadding>
      <Typography>{gym.name}</Typography>
      <Typography variant="caption" color={theme.palette.text.secondary}>
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
