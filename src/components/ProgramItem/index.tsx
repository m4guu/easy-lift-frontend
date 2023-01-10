import React from "react";

import { Card, Typography, Button } from "@mui/material";
import styled from "@mui/system/styled";

type Props = {
  program: {
    name: string;
    description: string;
  };
};

const ProgramItem: React.FC<Props> = ({ program }) => {
  return (
    <ProgramItemCard variant="outlined">
      <Typography variant="caption">{program.name}</Typography>
      <Typography>{program.description}</Typography>
      <Button variant="contained">Check it out!</Button>
    </ProgramItemCard>
  );
};

const ProgramItemCard = styled(Card)(({ theme }) => ({
  padding: "1rem",
  borderRadius: "1rem",
  height: "87%",
  [theme.breakpoints.down("lg")]: {
    height: "15rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "50% ",
    marginRight: "auto",
    marginLeft: "auto",
  },
}));

export default ProgramItem;
