import React from "react";

import { Box, Alert, Typography, Divider } from "@mui/material";
import { styled } from "@mui/system";

import { useParams } from "react-router-dom";

import { useWorkout } from "../../../hooks/queryHooks/workoutsHooks/useWorkout";

import { Status } from "../../../shared/enums";
import { SectionHeader } from "../../../components";
import { AuthorDetails } from "./views/AuthorDetails/AuthorDetails";
import { WorkoutDetails } from "./views/WorkoutDetails/WorkoutDetails";
import { WorkoutActions } from "./views/WorkoutActions/WorkoutActions";

// todo: change workout[0] --> workout [when backend wil be written]
const WorkoutPage: React.FC = () => {
  const { workoutId } = useParams();

  const { status, error, data: workout } = useWorkout(workoutId!);

  return (
    <SectionContainer>
      <SectionHeader>Workout</SectionHeader>

      {status === Status.LOADING && null}
      {status === Status.ERROR && null}
      {status === Status.SUCCESS && workout.length !== 0 && (
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
      {status === Status.SUCCESS && workout.length === 0 && (
        <Alert variant="outlined" severity="info">
          There is no workout with provided ID.
        </Alert>
      )}
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),
}));

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
const Workout = WorkoutPage;
export default Workout;
