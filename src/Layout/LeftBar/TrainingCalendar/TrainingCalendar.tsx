import React, { useState, useEffect } from "react";

import { Box } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { styled } from "@mui/system";

import { DaySlot } from "./views/DaySlot";
import { useWorkouts } from "../../../hooks/queryHooks/workoutsHooks/useWorkouts";
import { getCurrentMonth } from "../../../utils/Date";
import { generateWorkoutQueriesPath } from "../../../utils/Queries";
import { QueryKey } from "../../../shared/enums";
import { usePaginatedResultItems } from "../../../hooks";

interface TrainingCalendarProps {
  userId: string;
}

export const TrainingCalendar: React.FC<TrainingCalendarProps> = ({
  userId,
}) => {
  const [monthNumber, setMonthNumber] = useState<number>(getCurrentMonth);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  const queryPath = generateWorkoutQueriesPath({
    creator: userId,
    monthNumber,
  });
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

  // todo: refactory when fix finding workouts by month number
  useEffect(() => {
    if (monthWorkouts) {
      const monthHighlightedDays = monthWorkouts.map((monthWorkout) =>
        new Date(monthWorkout.date).getDate()
      );
      setHighlightedDays(monthHighlightedDays);
    }
  }, []);

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
      />
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
  marginLeft: 0,
  marginBottom: `${theme.spacing(2)}`,
  background: theme.palette.background.default,
  borderRadius: " 0.7rem",
  borderEndEndRadius: 0,
  borderStartEndRadius: 0,
}));
