import React, { useState, useEffect } from "react";

import { Box } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { styled } from "@mui/system";

import { DaySlot } from "./views/DaySlot";
import { useUserWorkoutsByMonth } from "../../../hooks/queryHooks/workoutsHooks/useUserWorkoutsByMonth";
import { Workout } from "../../../pages";

interface TrainingCalendarProps {
  userId: string;
}

export const TrainingCalendar: React.FC<TrainingCalendarProps> = ({
  userId,
}) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  const [monthNumber, setMonthNumber] = useState<number>(currentMonth);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);

  const { data: monthWorkouts, refetch } = useUserWorkoutsByMonth(
    userId,
    monthNumber
  );

  const onMonthChange = (month: any) => {
    setMonthNumber(month.$d.getMonth() + 1);
  };

  useEffect(() => {
    const monthHighlightedDays = monthWorkouts
      ? monthWorkouts.map((monthWorkout) =>
          new Date(monthWorkout.date).getDate()
        )
      : [];

    setHighlightedDays(monthHighlightedDays);
  }, [monthWorkouts, monthNumber]);

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
