import React, { useState, useEffect } from "react";

import { Box, List, ListItem } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { styled } from "@mui/system";

import { usePaginatedResultItems } from "../../../hooks";
import { useWorkouts } from "../../../hooks/queryHooks/workoutsHooks/useWorkouts";

import { getCurrentMonth } from "../../../utils/Date";
import { generateQueriesPath } from "../../../utils/Queries";

import { DaySlot } from "./views/DaySlot";
import { QueryKey } from "../../../shared/enums";
import { Workout } from "../../../shared/interfaces";
import { WorkoutItem } from "../../../components";
import { WorkoutQueries } from "../../../hooks/filters/useWorkoutFilter";

interface TrainingCalendarProps {
  userId: string;
}

export const TrainingCalendar: React.FC<TrainingCalendarProps> = ({
  userId,
}) => {
  const [monthNumber, setMonthNumber] = useState<number>(getCurrentMonth);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  const [todaysWorkouts, setTodaysWorkouts] = useState<Workout[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>();

  const workoutQueries: WorkoutQueries = {
    creator: userId,
    monthNumber,
  };
  const queryPath = generateQueriesPath(workoutQueries);

  const { data: infinityUserWorkouts, refetch } = useWorkouts(
    queryPath,
    QueryKey.USER_WORKOUTS_BY_MONTH
  );

  const monthWorkouts = usePaginatedResultItems(
    infinityUserWorkouts,
    (response) => response
  );

  const onMonthChange = (month: any) => {
    setMonthNumber(month.$d.getMonth() + 1);
  };

  const onDayChange = (selectProps: unknown) => {
    setSelectedDay(selectProps.$D);
    const dayWorkouts = monthWorkouts.filter((workout) => {
      return selectProps.$D === new Date(workout.date).getDate();
    });
    setTodaysWorkouts(dayWorkouts);
  };

  useEffect(() => {
    const monthHighlightedDays = monthWorkouts.map((monthWorkout) =>
      new Date(monthWorkout.date).getDate()
    );
    setHighlightedDays(monthHighlightedDays);
    onDayChange({ $D: selectedDay });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infinityUserWorkouts]);

  useEffect(() => {
    refetch();
  }, [refetch, monthNumber]);

  return (
    <Container>
      <Calendar
        views={["day"]}
        slots={{
          day: DaySlot as any,
        }}
        slotProps={{ day: { highlightedDays } as any }}
        onMonthChange={onMonthChange}
        onChange={onDayChange}
      />

      {todaysWorkouts.length !== 0 && (
        <TodaysWorkoutsList>
          {todaysWorkouts.map((workout) => {
            return <WorkoutItem key={workout.id} workout={workout} />;
          })}
        </TodaysWorkoutsList>
      )}
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  marginRight: `-${theme.spacing(2)}`,
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const Calendar = styled(DateCalendar)(({ theme }) => ({
  width: "100%",
  background: theme.palette.background.default,
  borderStartStartRadius: theme.shape.borderRadius,
}));

const TodaysWorkoutsList = styled(List)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.background.default,
  marginTop: theme.spacing(-6),
  borderEndStartRadius: theme.shape.borderRadius,
}));
