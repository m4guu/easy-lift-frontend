import React from "react";

import { Button } from "@mui/material";

import { useQueryClient, useMutation } from "react-query";

import { WorkoutsService } from "../../services";

import { DUMMY_WORKOUT } from "./constans";

import { SectionHeader, SectionContainer } from "../../components";

const NewWorkoutPage: React.FC = () => {
  const queryClient = useQueryClient();

  const addWorkoutMutation = useMutation(WorkoutsService.create, {
    onSuccess: () => {
      // invalidates cache and refetch
      queryClient.invalidateQueries("workouts");
    },
  });

  const addNewWorkout = () => {
    addWorkoutMutation.mutate(DUMMY_WORKOUT);
  };

  return (
    <SectionContainer>
      <SectionHeader>New Program</SectionHeader>
      <Button onClick={addNewWorkout} variant="contained">
        add new workout
      </Button>
    </SectionContainer>
  );
};

const NewWorkout = NewWorkoutPage;
export default NewWorkout;
