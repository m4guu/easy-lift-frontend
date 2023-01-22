import React from "react";

import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";

import { useQueryClient, useMutation } from "react-query";

import { ProgramsService } from "../../services";

import { DUMMY_PROGRAM } from "./constans";

import { SectionHeader, SectionContainer } from "../../components";

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
    <SectionContainer>
      <SectionHeader>New Program</SectionHeader>
      <Button onClick={addNewProgram} variant="contained">
        add new workout
      </Button>
    </SectionContainer>
  );
};

const NewProgram = NewProgramPage;
export default NewProgram;
