import React from "react";

import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";

import { useQueryClient, useMutation } from "react-query";

import WorkoutsService from "../../services/WorkoutsService";

import { DUMMY_WORKOUT } from "./constans";

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
    <NewWorkoutContainer>
      <Button onClick={addNewWorkout} variant="contained">
        add new workout
      </Button>
    </NewWorkoutContainer>
  );
};

const NewWorkoutContainer = styled(Box)({});

const NewWorkout = NewWorkoutPage;
export default NewWorkout;
