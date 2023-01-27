import React from "react";
import { Link } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import { Card, Typography, Button, Box } from "@mui/material";
import styled from "@mui/system/styled";

import { useDeleteProgramMutation } from "../../hooks/queryHooks/programsHooks/useDeleteProgramMutation";
import { useGetUserId } from "../../store/redux-store/slices/user/user.hooks";

import { Program } from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";
import { Status } from "../../shared/enums";

type ProgramItemProps = {
  program: Program;
};

const ProgramItem: React.FC<ProgramItemProps> = ({ program }) => {
  const { id: userId } = useGetUserId();
  const {
    isLoading,
    status,
    error,
    mutate: deleteQueryProgram,
  } = useDeleteProgramMutation();

  const deleteProgram = () => {
    deleteQueryProgram(program.id);
  };

  return (
    <ProgramItemCard variant="outlined">
      <Typography variant="caption">{program.title}</Typography>
      <CardContainer>
        <Typography>{program.description}</Typography>
        <ButtonsContainer>
          <ProgramItemLink to={`${PATHS.PROGRAMS}/${program.id}`}>
            <Button variant="contained">Check it out!</Button>
          </ProgramItemLink>

          {userId === program.creator && (
            <LoadingButton
              loading={isLoading}
              onClick={deleteProgram}
              variant="outlined"
              color="error"
            >
              delete
            </LoadingButton>
          )}
        </ButtonsContainer>
        {status === Status.SUCCESS && <div>Program deleted succesfully!</div>}
        {status === Status.ERROR && <div>error!</div>}
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

const ProgramItemLink = styled(Link)({
  textDecoration: "none",
});

export default ProgramItem;
