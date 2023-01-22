import React, { useEffect, useState, useMemo } from "react";

import { InputLabel, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "@mui/system/styled";

import { useGetUserExercisesProgress } from "../../../../../../store/redux-store/slices/user/user.hooks";

import { ChartMenuData } from "../../../../../../shared/interfaces";

import { initialFormInputs } from "./constans";

type ChartMenuProps = {
  sendData: (childData: ChartMenuData) => void;
};

export const ChartMenu: React.FC<ChartMenuProps> = ({ sendData }) => {
  const [formInputs, setFormInputs] = useState(initialFormInputs);
  const { exercisesProgress } = useGetUserExercisesProgress();

  const exerciseProgress = exercisesProgress?.find(
    (item) => item.exerciseID === formInputs.exerciseID.value
  );

  const labels: string[] = useMemo(() => {
    if (exerciseProgress) {
      return exerciseProgress.progress.map((item) => item.date);
    }
    // securing the undefined type that the find method can return
    return [];
  }, [exerciseProgress]);

  const data: number[] = useMemo(() => {
    if (exerciseProgress) {
      return exerciseProgress?.progress.map((item) => item.RM);
    }
    // securing the undefined type that the find method can return
    return [];
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
          {exercisesProgress?.length === 0 && (
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
