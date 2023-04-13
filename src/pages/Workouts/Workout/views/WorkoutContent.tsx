import React from "react";

import { Box, Alert, Typography, Divider } from "@mui/material";
import { styled } from "@mui/system";

import { useWorkout } from "../../../../hooks/queryHooks/workoutsHooks/useWorkout";
import { Status } from "../../../../shared/enums";

import { AuthorDetails } from "./views/AuthorDetails/AuthorDetails";
import { WorkoutDetails } from "./views/WorkoutDetails/WorkoutDetails";
import { WorkoutActions } from "./views/WorkoutActions/WorkoutActions";

const WorkoutContent: React.FC<{ workoutId: string }> = ({ workoutId }) => {
  const { status, error, data: workout } = useWorkout(workoutId);

  return (
    <Box>
      {status === Status.LOADING && <Box>loading...</Box>}
      {status === Status.ERROR && <Box>error</Box>}
      {status === Status.SUCCESS && workout && workout.length !== 0 && (
        <WorkoutWrapper>
          <WorkoutDetail>
            <SegmentCaption variant="caption" color="primary">
              Author
            </SegmentCaption>
            <NoPaddingDivider />
            <AuthorDetails authorId={workout[0].creator} />
          </WorkoutDetail>

          <WorkoutDetail>
            <SegmentCaption variant="caption" color="primary">
              Title
            </SegmentCaption>
            <NoPaddingDivider />
            <Typography>{workout[0].title}</Typography>
          </WorkoutDetail>

          <WorkoutDetail>
            <SegmentCaption variant="caption" color="primary">
              Workout
            </SegmentCaption>
            <NoPaddingDivider />
            <WorkoutDetails exercises={workout[0].exercises} />
          </WorkoutDetail>

          <WorkoutActions workoutId={workout[0].id} />
        </WorkoutWrapper>
      )}
      {status === Status.SUCCESS && workout?.length === 0 && (
        <Alert variant="outlined" severity="info">
          There is no workout with provided ID.
        </Alert>
      )}
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