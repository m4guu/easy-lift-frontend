import React, { useState } from "react";

import { Divider, Typography, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
import { Role } from "../../shared/enums";
import { useExerciseProgressModal } from "../../hooks/modalHooks/ExerciseProgress/useExerciseProgressModal";

type ExerciseItemProps = {
  exercise: Exercise;
  appendExercise: any;
  closeModal: () => void;
};

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise,
  appendExercise,
  closeModal,
}) => {
  const [expand, setExpand] = useState(false);
  const { user } = useUserContext();
  const { open: openExerciseProgressModal, Modal: ExerciseProgressModal } =
    useExerciseProgressModal(exercise.id);

  const toggleAcordion = () => {
    setExpand((prevState) => !prevState);
  };

  const addExerciseToWorkout = (choosenExercise: Exercise) => {
    appendExercise({
      name: choosenExercise.name,
      _id: choosenExercise.id,
      sets: [{ goal: "", tempo: "", archived: "", isDone: true }],
    });
    closeModal();
  };

  return (
    <>
      <ExerciseListItem>
        <ExerciseButtton
          disabled={expand}
          onClick={() => addExerciseToWorkout(exercise)}
        >
          <CustomAccordion expanded={expand}>
            {!expand && (
              <AccSummary>
                <AccSummaryContent>
                  <ExerciseImage src={exercise.gifUrl} alt={exercise.name} />
                  {exercise.name}
                </AccSummaryContent>
              </AccSummary>
            )}

            <AccDetails>
              <ExerciseDetailImage src={exercise.gifUrl} alt={exercise.name} />
              <DetailsList>
                <DetailItem>
                  <Typography variant="subtitle1" color="primary">
                    name
                  </Typography>
                  <Typography variant="h3">{exercise.name}</Typography>
                </DetailItem>
                <DetailItem>
                  <Typography variant="subtitle1" color="primary">
                    body part
                  </Typography>
                  <Typography variant="h3">{exercise.bodyPart}</Typography>
                </DetailItem>
                <DetailItem>
                  <Typography variant="subtitle1" color="primary">
                    nessesery equipment
                  </Typography>
                  <Typography variant="h3">{exercise.equipment}</Typography>
                </DetailItem>
              </DetailsList>
            </AccDetails>
          </CustomAccordion>
        </ExerciseButtton>

        <ExtandButton color="primary" onClick={toggleAcordion}>
          <InfoOutlinedIcon />
        </ExtandButton>
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
      </ExerciseListItem>

      <Divider />

      <ExerciseProgressModal />
    </>
  );
};

export default ExerciseItem;
