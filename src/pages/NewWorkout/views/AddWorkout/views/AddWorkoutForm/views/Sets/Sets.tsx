import React, { useEffect, useCallback, useRef } from "react";
import { useFieldArray, UseFieldArrayReturn } from "react-hook-form";

import {
  Box,
  Divider,
  List,
  ListItem,
  Typography,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";

import { styled } from "@mui/system";

import { useNewWorkoutForm } from "../../../../../../../../hooks/formHooks/workout/useNewWorkoutForm";

import { Add, DeleteExercise, Details, SetDone } from "./views/SetActions";
import { SetArchived, SetGoal, SetTempo } from "./views/Sets.form";
import { useExerciseProgressModal } from "../../../../../../../../hooks/modalHooks/ExerciseProgress/useExerciseProgressModal";

type SetsProps = {
  exerciseId: string;
  exerciseIndex: number;
  removeExercise: UseFieldArrayReturn["remove"];
};
export const Sets: React.FC<SetsProps> = ({
  exerciseId,
  exerciseIndex,
  removeExercise,
}) => {
  const {
    methods: { control },
  } = useNewWorkoutForm();

  const { open: openExerciseProgressModal, Modal: ExerciseProgressModal } =
    useExerciseProgressModal(exerciseId);

  const {
    fields: setFields,
    append: appendSet,
    remove: removeSet,
  } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.sets`,
  });

  const addNewSet = useCallback(() => {
    appendSet({ goal: "", tempo: "", archived: "" });
  }, [appendSet]);

  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      addNewSet();
      isMounted.current = true;
    }
  }, [addNewSet]);

  return (
    <SetsContainer>
      <SetList>
        {setFields.map((set, i) => {
          return (
            <SetItem key={set.id}>
              <SetContainer>
                <SetNumber variant="h3" color="primary">
                  {i + 1}
                </SetNumber>
                <SetGoal exerciseIndex={exerciseIndex} setIndex={i} />
                <SetTempo exerciseIndex={exerciseIndex} setIndex={i} />
                <SetArchived exerciseIndex={exerciseIndex} setIndex={i} />
              </SetContainer>

              <SetActionsWrapper>
                <SetDone
                  control={control}
                  exerciseIndex={exerciseIndex}
                  setIndex={i}
                />
                <DeleteSet
                  onClick={() => removeSet(i)}
                  color="error"
                  size="small"
                >
                  <RemoveIcon color="error" />
                </DeleteSet>
              </SetActionsWrapper>
            </SetItem>
          );
        })}
      </SetList>

      <Divider />

      <SetsActionsWrapper>
        <Add addNewSet={addNewSet} />
        <Box>
          <DeleteExercise
            exerciseIndex={exerciseIndex}
            removeExercise={removeExercise}
          />
          <Details openModal={openExerciseProgressModal} />
        </Box>
      </SetsActionsWrapper>

      <ExerciseProgressModal />
    </SetsContainer>
  );
};

const SetsContainer = styled(Box)({});
const SetList = styled(List)({});
const SetItem = styled(ListItem)({
  position: "relative",
  padding: 0,
});
const SetContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  display: "flex",
  alignItems: "center",
  padding: 0,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
const SetNumber = styled(Typography)(({ theme }) => ({
  width: "25%",
  [theme.breakpoints.down("sm")]: {
    width: "10%",
  },
}));

const SetsActionsWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

const SetActionsWrapper = styled(Box)({
  position: "absolute",
  right: 0,
  display: "flex",
  justifyContent: "space-between",
});

const DeleteSet = styled(IconButton)({
  positon: "absolute",
  right: 0,
});
