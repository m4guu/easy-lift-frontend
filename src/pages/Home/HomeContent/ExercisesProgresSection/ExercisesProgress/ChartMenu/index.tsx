import React, { useEffect, useState, useMemo } from "react";

import { InputLabel, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "@mui/system/styled";

import { useUserProgress } from "../../../../../../hooks/queryHooks/userProgressHooks/useUserExercisesProgress";
import { useGetUserId } from "../../../../../../store/redux-store/slices/user/user.hooks";

import { ChartMenuData } from "../../../../../../shared/interfaces";

import { initialFormInputs } from "./constans";

type ChartMenuProps = {
  sendData: (childData: ChartMenuData) => void;
};

export const ChartMenu: React.FC<ChartMenuProps> = ({ sendData }) => {
  const [formInputs, setFormInputs] = useState(initialFormInputs);
  const { id: userId } = useGetUserId();
  const { status, error, data: userProgress } = useUserProgress(userId);

  const menuItemProgressData = [
    ...new Map(
      userProgress?.map((progres) => [progres["exerciseId"], progres])
    ).values(),
  ];

  const exerciseProgress = useMemo(() => {
    return userProgress?.filter(
      (progres) => progres.exerciseId === formInputs.exerciseID.value
    );
  }, [formInputs.exerciseID.value, userProgress]);

  const labels: string[] = useMemo(() => {
    if (!exerciseProgress) {
      // securing the undefined type that the find method can return
      return [];
    }
    return exerciseProgress.map((item) => item.date);
  }, [exerciseProgress]);

  const data: number[] = useMemo(() => {
    if (!exerciseProgress) {
      // securing the undefined type that the find method can return
      return [];
    }
    return exerciseProgress?.map((item) => item.repMax);
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
          {menuItemProgressData?.length === 0 && (
            <MenuItem value="">
              <em>No exercises yet</em>
            </MenuItem>
          )}
          {menuItemProgressData?.map((item) => {
            return (
              <MenuItem key={item.exerciseId} value={item.exerciseId}>
                {item.exerciseName}
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
