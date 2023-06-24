import React from "react";

import { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";

import { Badge } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

interface DaySlotProps extends PickersDayProps<Dayjs> {
  highlightedDays?: number[];
}

export const DaySlot: React.FC<DaySlotProps> = (props) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? (
          <FitnessCenterIcon color="primary" fontSize="small" />
        ) : undefined
      }
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
};
