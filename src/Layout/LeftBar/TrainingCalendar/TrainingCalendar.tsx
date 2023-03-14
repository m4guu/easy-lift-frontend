import React, { useState } from "react";
import { Dayjs } from "dayjs";

import { Box } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { styled } from "@mui/system";

import { DaySlot } from "./views/DaySlot";

interface TrainingCalendarProps {}

export const TrainingCalendar: React.FC<TrainingCalendarProps> = () => {
  const [highlightedDays, setHighlightedDays] = useState([2, 5, 20]);

  const onMonthChange = (date: Dayjs) => {
    // todo: add functionality when backend will be written! --> GET_USER_WORKOUTS_BY_MONTH....
  };

  return (
    <Container>
      <Calendar
        views={["day"]}
        slots={{
          day: DaySlot as any,
        }}
        slotProps={{ day: { highlightedDays } as any }}
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
