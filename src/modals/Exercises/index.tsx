import React from "react";
import { UseFieldArrayAppend } from "react-hook-form";

import { Box, Typography, Button, Modal } from "@mui/material";
import { styled } from "@mui/system";

import { useExercises } from "../../hooks/queryHooks/exerciseDB/useExercises";
import { usePaginatedResultItems } from "../../hooks";

import {
  AddWorkoutForm,
  AddWorkoutFormFields,
} from "../../hooks/formHooks/workout/useNewWorkoutForm";

import { Status } from "../../shared/enums";
import { InfiniteList } from "../../features";
import {
  SectionContainer,
  SectionHeader,
  ExerciseItem,
} from "../../components";
import { FilterPanel } from "./views/FilterPanel/FilterPanel";
import { useExerciseFilter } from "../../hooks/filters/useExerciseFilter";

type ExercisesProps = {
  appendExercise: UseFieldArrayAppend<
    AddWorkoutForm,
    AddWorkoutFormFields.EXERCISES
  >;
  isOpen: boolean;
  closeModal: () => void;
};

const ExercisesModal: React.FC<ExercisesProps> = ({
  appendExercise,
  closeModal,
  isOpen,
}) => {
  const {
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    data: infinityExercises,
  } = useExercises();

  //! REFACTORY FILTERING WHEN BACKEND WILL BE WRITTEN
  // const { updatedExercises, filterPanelProps } = useExerciseFilter(exercises);

  const exercises = usePaginatedResultItems(
    infinityExercises,
    (response) => response
  );
  const noExercises = status === Status.SUCCESS && exercises.length === 0;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) =>
    !hasNextPage || index < exercises.length;
  // Render an item or a loading indicator.
  const Item = ({ index, style }) => {
    return (
      <Box style={style}>
        {isItemLoaded(index) ? (
          <ExerciseItem
            exercise={exercises[index]}
            appendExercise={appendExercise}
            closeModal={closeModal}
          />
        ) : (
          <Box>loading...</Box>
        )}
      </Box>
    );
  };

  return (
    <ExercisesMuiModal
      open={isOpen}
      onClose={closeModal}
      slotProps={{ backdrop: { style: { backgroundColor: "inherit" } } }}
    >
      <Container>
        <SectionHeader>Exercise list</SectionHeader>
        {status === Status.LOADING && <Box>loading...</Box>}
        {noExercises && (
          <Typography>Somethings goes wrong. Please try later.</Typography>
        )}

        {/* <FilterPanel filterHandlers={filterPanelProps} /> */}

        <Box sx={{ flex: 1 }}>
          <InfiniteList
            items={exercises}
            Item={Item}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            itemSize={150}
          />
        </Box>

        <CloseModalButton
          onClick={closeModal}
          color="error"
          variant="contained"
          size="small"
        >
          close modal
        </CloseModalButton>
      </Container>
    </ExercisesMuiModal>
  );
};

const Container = styled("section")(({ theme }) => ({
  paddinf: theme.spacing(2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const CloseModalButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(2),
  top: theme.spacing(2),
}));

const ExercisesMuiModal = styled(Modal)(({ theme }) => ({
  margin: 0,
  backgroundColor: theme.palette.background.default,
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    display: "none",
  },
}));

export default ExercisesModal;
