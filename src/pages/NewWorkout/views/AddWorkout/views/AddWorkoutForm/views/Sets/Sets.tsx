import React, { useCallback } from "react";
import {
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
} from "react-hook-form";

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

import { useExerciseProgressModal } from "../../../../../../../../hooks/modalHooks/ExerciseProgress/useExerciseProgressModal";

import { Add, DeleteExercise, Details, SetDone } from "./views/SetActions";
import { SetArchived, SetGoal, SetTempo } from "./views/Sets.form";

import { defaultSet } from "../../../../../../../../hooks/formHooks/workout/constans";

import {
  Role,
  ExerciseFormActions,
} from "../../../../../../../../shared/enums";
import { ExerciseProgressModal } from "../../../../../../../../modals";
import { useUserContext } from "../../../../../../../../contexts/userContext";

type SetsProps = {
  exerciseId: string;
  exerciseIndex: number;
  removeExercise: UseFieldArrayReturn[ExerciseFormActions.REMOVE];
};
export const Sets: React.FC<SetsProps> = ({
  exerciseId,
  exerciseIndex,
  removeExercise,
}) => {
  const { user } = useUserContext();
  const { control, clearErrors } = useFormContext();

  const {
    open: openExerciseProgressModal,
    close: closeExerciseProgressModal,
    isOpen: isExerciseProgressModalOpen,
  } = useExerciseProgressModal();

  const {
    fields: setFields,
    append: appendSet,
    remove: removeSet,
    update: updateSet,
  } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.sets`,
  });

  const addNewSet = useCallback(() => {
    appendSet(defaultSet);
    clearErrors();
  }, [appendSet, clearErrors]);

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
                {user?.role === Role.user && (
                  <SetArchived exerciseIndex={exerciseIndex} setIndex={i} />
                )}
              </SetContainer>

              <SetActionsWrapper>
                {user?.role === Role.user && (
                  <SetDone
                    control={control}
                    exerciseIndex={exerciseIndex}
                    setIndex={i}
                    updateSet={updateSet}
                  />
                )}
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
          {user?.role === Role.user && (
            <Details openModal={openExerciseProgressModal} />
          )}
        </Box>
      </SetsActionsWrapper>

      {isExerciseProgressModalOpen && (
        <ExerciseProgressModal
          exerciseId={exerciseId}
          isOpen={isExerciseProgressModalOpen}
          closeModal={closeExerciseProgressModal}
        />
      )}
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
