import React, { useEffect, useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import {
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { AddProgramFormFields } from "../../../../../../../../hooks/formHooks/program/useNewProgramForm";

import { WorkoutListItem } from "./views/WorkoutListItem";
import ProgramItem from "../../../../../../../../shared/interfaces/ProgramItem";

type ProgramWeekListItemProps = {
  weekIndex: number;
  programFrequency: number;
};

export const ProgramWeekListItem: React.FC<ProgramWeekListItemProps> = ({
  weekIndex,
  programFrequency,
}) => {
  const { control, watch } = useFormContext();

  const {
    fields: workoutFields,
    append: appendWorkout,
    remove: removeWorkout,
    update: updateWorkoutField,
  } = useFieldArray({
    control,
    name: `program.${weekIndex}.weekWorkouts`,
  });

  const program: ProgramItem[] = watch(AddProgramFormFields.PROGRAM);

  const generateFields = useCallback(() => {
    const currentCount = workoutFields.length;

    if (currentCount > programFrequency) {
      // remove extra workouts
      for (let i = currentCount - 1; i >= programFrequency; i -= 1) {
        removeWorkout(i);
      }
    } else if (currentCount < programFrequency) {
      // add additional workouts
      for (let i = currentCount; i < programFrequency; i += 1) {
        appendWorkout({});
      }
    }
  }, [workoutFields, programFrequency, removeWorkout, appendWorkout]);

  useEffect(() => {
    generateFields();
  }, [generateFields]);

  return (
    <Item>
      <WorkoutAccordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color="primary">Week #{weekIndex + 1}</Typography>
        </AccordionSummary>

        <WorkoutAccordionDetails>
          <WorkoutList>
            {program[weekIndex].weekWorkouts.map(
              (weekWorkout, workoutIndex) => {
                if (weekWorkout.id) {
                  return (
                    <FlexBox key={uuidv4()}>
                      <Typography color="success.main">
                        {weekWorkout.title}
                      </Typography>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        color="success"
                      />
                    </FlexBox>
                  );
                }
                return (
                  <WorkoutListItem
                    key={uuidv4()}
                    workoutIndex={workoutIndex}
                    updateWorkoutField={updateWorkoutField}
                  />
                );
              }
            )}
          </WorkoutList>
        </WorkoutAccordionDetails>
      </WorkoutAccordion>
    </Item>
  );
};

const Item = styled(ListItem)(({ theme }) => ({
  padding: 0,
  marginBottom: theme.spacing(1),
}));

const WorkoutList = styled(List)({
  padding: 0,
});

const WorkoutAccordion = styled(Accordion)({
  width: "100%",
});

const WorkoutAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: 0,
  paddingBottom: theme.spacing(1),
}));

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignContent: "center",
  padding: `0 ${theme.spacing(2)}`,
}));
