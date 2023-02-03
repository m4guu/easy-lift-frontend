import React from "react";
import { Link } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import { Card, Typography, Button, Box } from "@mui/material";
import styled from "@mui/system/styled";

import { useUserContext } from "../../contexts/userContext";
import { useUpdateProgramMutation } from "../../hooks/queryHooks/programsHooks/useUpdateProgramMutation";
import { useDeleteProgramMutation } from "../../hooks/queryHooks/programsHooks/useDeleteProgramMutation";

import { Program } from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";
import { Status } from "../../shared/enums";

type ProgramItemProps = {
  program: Program;
};

const ProgramItem: React.FC<ProgramItemProps> = ({ program }) => {
  const { user } = useUserContext();
  const {
    isLoading: isDeleting,
    status: deleteStatus,
    error: deleteError,
    mutate: deleteQueryProgram,
  } = useDeleteProgramMutation(program.id);
  const {
    isLoading: isUpdating,
    status: updateStatus,
    error: updateError,
    mutate: updateQueryProgram,
  } = useUpdateProgramMutation(program.id);

  const deleteProgram = () => {
    deleteQueryProgram(program.id);
  };
  const updateProgram = () => {
    const updatedProgram = {
      ...program,
      title: "Updated Title Workout",
    };
    updateQueryProgram(updatedProgram);
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

          {user?.id === program.creator && (
            <>
              <LoadingButton
                sx={{ marginRight: "1rem" }}
                loading={isDeleting}
                onClick={deleteProgram}
                variant="outlined"
                color="error"
              >
                delete
              </LoadingButton>
              <LoadingButton
                loading={isUpdating}
                onClick={updateProgram}
                variant="outlined"
                color="info"
              >
                update
              </LoadingButton>
            </>
          )}
        </ButtonsContainer>

        {deleteStatus === Status.SUCCESS && (
          <div>Program deleted succesfully!</div>
        )}
        {deleteStatus === Status.ERROR && <div>error!</div>}
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
