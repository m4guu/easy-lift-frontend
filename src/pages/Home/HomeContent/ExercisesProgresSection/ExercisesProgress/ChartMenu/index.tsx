import React, { useEffect, useState, useMemo } from "react";

import { InputLabel, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "@mui/system/styled";

import { v4 as uuidv4 } from "uuid";

import { useGetUserExercisesProgress } from "../../../../../../store/redux-store/slices/user/user.hooks";
import {
  getLastWeekDate,
  getLastMonthDate,
  getLastYearDate,
} from "../../../../../../utils/Date";

type Props = {
  sendData: (childData: {
    labels: string[];
    data: number[];
    dateRange: string;
  }) => void;
};

const ChartMenu: React.FC<Props> = ({ sendData }) => {
  const [formInputs, setFormInputs] = useState({
    exerciseID: {
      name: "exerciseID",
      label: "Exercise",
      value: "DUMMY-EXERCISE-PROGRESS-ID-1",
    },
    dateRange: {
      name: "dateRange",
      label: "Date Range",
      value: "default",
      options: [
        { id: uuidv4(), name: "All Time", value: "default" },
        { id: uuidv4(), name: "Year", value: getLastYearDate() },
        { id: uuidv4(), name: "Month", value: getLastMonthDate() },
        { id: uuidv4(), name: "Week", value: getLastWeekDate() },
      ],
    },
  });

  const { exercisesProgress } = useGetUserExercisesProgress();

  const exerciseProgress = exercisesProgress?.find(
    (item) => item.exerciseID === formInputs.exerciseID.value
  );

  const labels: string[] = useMemo(() => {
    const returnData: string[] = [];
    exerciseProgress?.progress.map((item) => returnData.push(item.date));
    return returnData;
  }, [exerciseProgress]);
  const data: number[] = useMemo(() => {
    const returnData: number[] = [];
    exerciseProgress?.progress.map((item) => returnData.push(item.RM));
    return returnData;
  }, [exerciseProgress]);

  const handleChange = (event: SelectChangeEvent): void => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormInputs((prev) => {
      return {
        ...prev,
        [inputName]: {
          ...prev[inputName as keyof typeof prev],
          value: inputValue,
        },
      };
    });
  };

  useEffect(() => {
    const dateRange = formInputs.dateRange.value;
    sendData({ labels, data, dateRange });
  }, [labels, data, sendData, formInputs.dateRange.value]);

  return (
    <ChartMenuForm>
      <ChartMenuFormControl size="small">
        <InputLabel id="demo-select-small date-range">
          {formInputs.dateRange.label}
        </InputLabel>
        <Select
          labelId="date-range"
          id="demo-select-small"
          value={formInputs.dateRange.value}
          name={formInputs.dateRange.name}
          label={formInputs.dateRange.label}
          onChange={handleChange}
        >
          {formInputs.dateRange.options.map((item) => {
            return (
              <MenuItem key={item.id} value={item.value}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </ChartMenuFormControl>
      <ChartMenuFormControl size="small">
        <InputLabel id="demo-select-small exercise">
          {formInputs.exerciseID.label}
        </InputLabel>
        <Select
          labelId="exercise"
          id="demo-select-small"
          value={formInputs.exerciseID.value}
          name={formInputs.exerciseID.name}
          label={formInputs.exerciseID.label}
          onChange={handleChange}
        >
          {exercisesProgress?.length ? null : (
            <MenuItem value="">
              <em>No exercises yet</em>
            </MenuItem>
          )}
          {exercisesProgress?.map((item) => {
            return (
              <MenuItem key={item.exerciseID} value={item.exerciseID}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </ChartMenuFormControl>
    </ChartMenuForm>
  );
};

const ChartMenuForm = styled("form")(({ theme }) => ({
  margin: `0 ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)}`,
}));

const ChartMenuFormControl = styled(FormControl)(({ theme }) => ({
  m: 1,
  minWidth: 150,
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    minWidth: 100,
    margin: theme.spacing(1),
  },
}));

export default ChartMenu;
