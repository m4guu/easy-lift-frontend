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

const CardContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));

export default ProgramItem;
