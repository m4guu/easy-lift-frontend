import React, { useState } from "react";
import { UseFieldArrayAppend, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Divider, Typography, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useExerciseProgressModal } from "../../hooks/modalHooks/ExerciseProgress/useExerciseProgressModal";
import { useUserContext } from "../../contexts/userContext";

import {
  ExerciseListItem,
  ExerciseButtton,
  CustomAccordion,
  AccSummary,
  AccSummaryContent,
  AccDetails,
  ExerciseImage,
  ExerciseDetailImage,
  ExtandButton,
  ButtonsContainer,
  DetailsList,
  DetailItem,
} from "./ExerciseItem.styles";
import { Exercise } from "../../shared/interfaces";
import {
  AddWorkoutForm,
  AddWorkoutFormFields,
} from "../../hooks/formHooks/workout/useNewWorkoutForm";
import { defaultSets } from "../../hooks/formHooks/workout/constans";
import { Role } from "../../shared/enums";

import { ExerciseProgressModal } from "../../modals";

type ExerciseItemProps = {
  exercise: Exercise;
  appendExercise: UseFieldArrayAppend<
    AddWorkoutForm,
    AddWorkoutFormFields.EXERCISES
  >;
  closeModal: () => void;
};

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise,
  appendExercise,
  closeModal,
}) => {
  const [expand, setExpand] = useState(false);
  const { user } = useUserContext();
  const { clearErrors } = useFormContext();
  const {
    open: openExerciseProgressModal,
    close: closeExerciseProgressModal,
    isOpen: isExerciseProgressModalOpen,
  } = useExerciseProgressModal();

  const toggleAcordion = () => {
    setExpand((prevState) => !prevState);
  };

  const addExerciseToWorkout = (choosenExercise: Exercise) => {
    appendExercise({
      id: uuidv4(),
      _id: choosenExercise.id,
      name: choosenExercise.exercise_name,
      sets: defaultSets,
    });
    clearErrors();
    closeModal();
  };

  return (
    <ExerciseListItem>
      <ExerciseButtton
        disabled={expand}
        onClick={() => addExerciseToWorkout(exercise)}
      >
        <CustomAccordion expanded={expand}>
          {!expand && (
            <AccSummary>
              <AccSummaryContent>
                <ExerciseImage src={exercise.videoURL.at(0)} autoPlay />
                {exercise.exercise_name}
              </AccSummaryContent>
            </AccSummary>
          )}

          <AccDetails>
            <ExerciseDetailImage src={exercise.videoURL.at(0)} autoPlay />
            <DetailsList>
              <DetailItem>
                <Typography variant="subtitle1" color="primary">
                  name
                </Typography>
                <Typography variant="h3">{exercise.exercise_name}</Typography>
              </DetailItem>
              <DetailItem>
                <Typography variant="subtitle1" color="primary">
                  body part
                </Typography>
                <Typography variant="h3">{exercise.Category}</Typography>
              </DetailItem>
              <DetailItem>
                <Typography variant="subtitle1" color="primary">
                  difficulty
                </Typography>
                <Typography variant="h3">{exercise.Difficulty}</Typography>
              </DetailItem>
            </DetailsList>
          </AccDetails>
        </CustomAccordion>
      </ExerciseButtton>

      {/* <ExtandButton color="primary" onClick={toggleAcordion}>
        <InfoOutlinedIcon />
      </ExtandButton> */}

      {expand && (
        <ButtonsContainer>
          <Button
            onClick={() => addExerciseToWorkout(exercise)}
            variant="outlined"
          >
            add
          </Button>
          {user?.role === Role.user && (
            <Button onClick={openExerciseProgressModal} variant="contained">
              yours progress
            </Button>
          )}
        </ButtonsContainer>
      )}
      <Divider />
      {user && isExerciseProgressModalOpen && (
        <ExerciseProgressModal
          userId={user.id}
          exerciseId={exercise.id}
          isOpen={isExerciseProgressModalOpen}
          closeModal={closeExerciseProgressModal}
        />
      )}
    </ExerciseListItem>
  );
};

export default ExerciseItem;
