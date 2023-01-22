import React from "react";

import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useQueryClient, useMutation } from "react-query";

import { ProgramsService } from "../../services";

import { DUMMY_PROGRAM } from "./constans";

const NewProgramPage: React.FC = () => {
  const queryClient = useQueryClient();

  const addWorkoutMutation = useMutation(ProgramsService.create, {
    onSuccess: () => {
      // invalidates cache and refetch
      queryClient.invalidateQueries(["programs", "10programs"]);
    },
  });
  const addNewProgram = () => {
    addWorkoutMutation.mutate(DUMMY_PROGRAM);
  };
  return (
    <NewProgramContainer>
      <NewProgramHeader>
        <Typography variant="caption">New Program</Typography>
      </NewProgramHeader>
      <Button onClick={addNewProgram} variant="contained">
        add new workout
      </Button>
    </NewProgramContainer>
  );
};

const NewProgramContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const NewProgramHeader = styled("header")({});

const NewProgram = NewProgramPage;
export default NewProgram;
