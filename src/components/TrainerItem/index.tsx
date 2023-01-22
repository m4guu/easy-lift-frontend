import React from "react";

import { Link } from "react-router-dom";

import { Box, Typography, ListItem } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { Trainer } from "../../shared/interfaces";

import { PATHS } from "../../pages/paths";

type TrainerItemProps = {
  trainer: Trainer;
};

const TrainerItem: React.FC<TrainerItemProps> = ({ trainer }) => {
  const theme = useTheme();

  return (
    <TraienrListItem>
      <ListItemLink to={`${PATHS.TRAINERS}/${trainer.id}`}>
        <Box>
          <Typography variant="subtitle1" color="primary">
            TRAINER NAME:
          </Typography>
          <Typography variant="h3" color={theme.palette.text.primary}>
            {trainer.name}
          </Typography>
        </Box>
      </ListItemLink>
    </TraienrListItem>
  );
};
const ListItemLink = styled(Link)(({ theme }) => ({
  padding: theme.spacing(1),
  textDecoration: "none",
  borderRadius: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const TraienrListItem = styled(ListItem)({
  padding: 0,
});
export default TrainerItem;
