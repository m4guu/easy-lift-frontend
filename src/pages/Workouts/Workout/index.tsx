import React from "react";
import { useParams } from "react-router-dom";

import { styled } from "@mui/system";

import { SectionHeader } from "../../../components";
import WorkoutContent from "./views/WorkoutContent";

const Workout: React.FC = () => {
  const { workoutId } = useParams();

  return (
    <SectionContainer>
      <SectionHeader>Workout</SectionHeader>
      {workoutId && <WorkoutContent workoutId={workoutId} />}
    </SectionContainer>
  );
};
const SectionContainer = styled("section")(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),
}));
export default Workout;
