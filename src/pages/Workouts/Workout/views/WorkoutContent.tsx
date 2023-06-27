import React from "react";

import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/system";

import { useWorkout } from "../../../../hooks/queryHooks/workoutsHooks/useWorkout";

import { AuthorDetails } from "./views/AuthorDetails/AuthorDetails";
import { WorkoutDetails } from "./views/WorkoutDetails/WorkoutDetails";
import { WorkoutActions } from "./views/WorkoutActions/WorkoutActions";
import { StatusBar } from "../../../../components";

const WorkoutContent: React.FC<{ workoutId: string }> = ({ workoutId }) => {
  const { status, error, data: workout } = useWorkout(workoutId);

  return (
    <Box>
      {workout && (
        <WorkoutWrapper>
          <WorkoutDetail>
            <SegmentCaption variant="caption" color="primary">
              Author
            </SegmentCaption>
            <NoPaddingDivider />
            <AuthorDetails authorId={workout.creator} />
          </WorkoutDetail>

          <WorkoutDetail>
            <SegmentCaption variant="caption" color="primary">
              Title
            </SegmentCaption>
            <NoPaddingDivider />
            <Typography>{workout.title}</Typography>
          </WorkoutDetail>

          <WorkoutDetail>
            <SegmentCaption variant="caption" color="primary">
              Workout
            </SegmentCaption>
            <NoPaddingDivider />
            <WorkoutDetails exercises={workout.exercises} />
          </WorkoutDetail>

          <WorkoutActions workoutId={workout.id} />
        </WorkoutWrapper>
      )}

      <StatusBar status={status} error={error} />
    </Box>
  );
};

const WorkoutWrapper = styled(Box)({});

const WorkoutDetail = styled("li")({
  listStyle: "none",
});

const SegmentCaption = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  [theme.breakpoints.up("lg")]: {
    fontSize: "0.9rem",
  },
}));

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0 -${theme.spacing(2)} ${theme.spacing(1)} -${theme.spacing(2)}`,
}));

export default WorkoutContent;
