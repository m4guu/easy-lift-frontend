import React from "react";
import { Link } from "react-router-dom";

import { useMutation, useQueryClient } from "react-query";

import { Card, Typography, Button, Box } from "@mui/material";
import styled from "@mui/system/styled";

import { useGetUserId } from "../../store/redux-store/slices/user/user.hooks";

import { ProgramsService } from "../../services";

import { Program } from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";

type ProgramItemProps = {
  program: Program;
};

const ProgramItem: React.FC<ProgramItemProps> = ({ program }) => {
  const { id: userId } = useGetUserId();
  const queryClient = useQueryClient();

  const deleteProgramMutation = useMutation(ProgramsService.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(["progrmas", "10programs"]);
    },
  });
  const deleteProgram = () => {
    deleteProgramMutation.mutate(program.id);
  };
  return (
    <ProgramItemCard variant="outlined">
      <Typography variant="caption">{program.title}</Typography>
      <CardContainer>
        <Typography>{program.description}</Typography>
        <ProgramItemLink to={`${PATHS.PROGRAMS}/${program.id}`}>
          <ButtonsContainer>
            <Button variant="contained">Check it out!</Button>
            {userId === program.creator && (
              <Button onClick={deleteProgram} variant="outlined" color="error">
                delete
              </Button>
            )}
          </ButtonsContainer>
        </ProgramItemLink>
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

const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

const ProgramItemLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
}));

export default ProgramItem;
