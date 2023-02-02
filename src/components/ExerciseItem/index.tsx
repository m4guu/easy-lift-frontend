import React, { useState } from "react";

import { Divider, Typography, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
  ButtonLink,
  DetailsList,
  DetailItem,
} from "./ExerciseItem.styles";

import { useGetUserRole } from "../../store/redux-store/slices/user/user.hooks";

import { PATHS } from "../../pages/paths";
import { Exercise } from "../../shared/interfaces";
import { Role } from "../../shared/enums";

type ExerciseItemProps = {
  exercise: Exercise;
};

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise }) => {
  const { role } = useGetUserRole();
  const [expand, setExpand] = useState(false);

  const toggleAcordion = () => {
    setExpand((prevState) => !prevState);
  };

  // todo: add workout slice and slice hooks to handle addExerciseToWorkout
  const addExerciseToWorkout = (choosenExercise: Exercise) => {};

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
            {role === Role.user && (
              <Button variant="contained">
                <ButtonLink to={`${PATHS.EXERCISES_PROGRESS}/${exercise.id}`}>
                  yours progress{" "}
                </ButtonLink>
              </Button>
            )}
          </ButtonsContainer>
        )}
      </ExerciseListItem>

      <Divider />
    </>
  );
};

export default ExerciseItem;
