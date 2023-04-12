import React from "react";
import { UseFieldArrayAppend } from "react-hook-form";

import { Box, Typography, Button, Modal, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useExercises } from "../../hooks/queryHooks/exerciseDB/useExercises";
import { usePaginatedResultItems } from "../../hooks";

import {
  AddWorkoutForm,
  AddWorkoutFormFields,
} from "../../hooks/formHooks/workout/useNewWorkoutForm";

import { Status } from "../../shared/enums";
import { InfiniteList } from "../../features";
import { ExerciseItem } from "../../components";
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
  const theme = useTheme();
  const isBelowSm = useMediaQuery(theme.breakpoints.down("sm"));

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
  const Item = ({ index, style }: { index: number; style: any }) => {
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

  const itemSize = isBelowSm ? 100 : 150;

  return (
    <ExercisesMuiModal
      open={isOpen}
      onClose={closeModal}
      slotProps={{ backdrop: { style: { backgroundColor: "inherit" } } }}
    >
      <Container>
        <Header>Exercise list</Header>

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
            itemSize={itemSize}
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

const ExercisesMuiModal = styled(Modal)(({ theme }) => ({
  margin: 0,
  backgroundColor: theme.palette.background.default,
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    display: "none",
  },
}));

const Container = styled("section")(({ theme }) => ({
  paddinf: theme.spacing(2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const Header = styled("header")(({ theme }) => ({
  padding: theme.spacing(2),
  fontSize: "1.2rem",
  textTransform: "uppercase",
  background: theme.palette.background.layout,
}));

const CloseModalButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(2),
  top: theme.spacing(2),
}));

export default ExercisesModal;
