import React from "react";

import { Card, Typography, Button, Box } from "@mui/material";
import styled from "@mui/system/styled";

import { Program } from "../../shared/interfaces";

type ProgramItemProps = {
  program: Program;
};

const ProgramItem: React.FC<ProgramItemProps> = ({ program }) => {
  return (
    <ProgramItemCard variant="outlined">
      <Typography variant="caption">{program.name}</Typography>
      <CardContainer>
        <Typography>{program.description}</Typography>
        <Button variant="contained">Check it out!</Button>
      </CardContainer>
    </ProgramItemCard>
  );
};

const ProgramItemCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "1rem",
  boxShadow: "none",
  height: "99%",
  [theme.breakpoints.down("lg")]: {
    height: "15rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "50% ",
    marginRight: "auto",
    marginLeft: "auto",
  },
}));

const CardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));

export default ProgramItem;
