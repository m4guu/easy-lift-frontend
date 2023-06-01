import React from "react";
import { v4 as uuidv4 } from "uuid";

import { ListItem, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Set } from "../../shared/interfaces";

interface ExerciseItemWorkoutProps {
  itemIndex: number;
  name: string;
  sets: Set[];
}

const ExerciseItemWorkout: React.FC<ExerciseItemWorkoutProps> = ({
  itemIndex,
  name,
  sets,
}) => {
  return (
    <ExerciseItem disablePadding>
      <ExerciseNumber variant="caption">{itemIndex + 1}</ExerciseNumber>
      <Content>
        <ExerciseName variant="caption">{name}</ExerciseName>
        <SetsArchived>
          {sets.map((set) => (
            <SetArchived key={uuidv4()} variant="caption">
              {set.archived} |
            </SetArchived>
          ))}
        </SetsArchived>
      </Content>
    </ExerciseItem>
  );
};

const ExerciseItem = styled(ListItem)(({ theme }) => ({
  alignItems: "flex-start",
  marginBottom: theme.spacing(1),
}));
const ExerciseNumber = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom_grey.tint_1,
  fontSize: "0.9rem",
  marginRight: theme.spacing(2),
}));
const Content = styled(Box)({});
const ExerciseName = styled(Typography)({
  fontSize: "1rem",
});
const SetsArchived = styled(Box)({
  display: "flex",
});
const SetArchived = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  color: theme.palette.custom_grey.tint_1,
}));

export default ExerciseItemWorkout;
