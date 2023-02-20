import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAddWorkoutMutation } from "../../queryHooks/workoutsHooks/useAddWorkoutMutation";
import { useAddUserProgresMutation } from "../../queryHooks/userProgressHooks/useAddUserProgresMutation";
import { useUserContext } from "../../../contexts/userContext";

import { generateWorkoutExercises } from "../../../utils/FormExercises";
import { generateUserProgress } from "../../../utils/UserProgress";

import { FormExercise } from "../../../shared/interfaces";
import { ErrorMessages } from "../../../shared/enums";
import { WEIGHT_REPS_REGEX, TEMPO_REGEX } from "../../../shared/regex/regex";

export enum AddWorkoutFormFields {
  WORKOUT_TITLE = "workoutTitle",
  START_TIME = "startTime",
  EXERCISES = "exercises",
}

export interface AddWorkoutForm {
  [AddWorkoutFormFields.WORKOUT_TITLE]: string;
  [AddWorkoutFormFields.START_TIME]: Date;
  [AddWorkoutFormFields.EXERCISES]: FormExercise[];
}

const defaultValues = {
  [AddWorkoutFormFields.WORKOUT_TITLE]: "",
  [AddWorkoutFormFields.START_TIME]: new Date(),
  [AddWorkoutFormFields.EXERCISES]: [],
};

const schema = yup.object().shape({
  workoutTitle: yup.string().required().min(5),
  startTime: yup.date().required(),
  exercises: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        id: yup.string().required(),
        sets: yup
          .array()
          .of(
            yup.object().shape({
              goal: yup
                .string()
                .required(ErrorMessages.REQUIRED)
                .matches(WEIGHT_REPS_REGEX, ErrorMessages.WEIGHT_REPS_MATCHES),
              tempo: yup
                .string()
                .required(ErrorMessages.REQUIRED)
                .matches(TEMPO_REGEX, ErrorMessages.TEMPO_MATCHES),
              archived: yup
                .string()
                .required(ErrorMessages.REQUIRED)
                .matches(WEIGHT_REPS_REGEX, ErrorMessages.WEIGHT_REPS_MATCHES),
            })
          )
          .required()
          .min(1),
      })
    )
    .required()
    .min(1),
});

export const useNewWorkoutForm = () => {
  const [pending, setPending] = useState(false);

  const { user } = useUserContext();
  const { mutateAsync: addQueryWorkout } = useAddWorkoutMutation();
  const { mutateAsync: addQueryUserProgres } = useAddUserProgresMutation();

  const methods = useForm<AddWorkoutForm>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { watch, control, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { workoutTitle, startTime, exercises } = watch();

  const canSubmit = workoutTitle && startTime && exercises;

  const {
    fields: exerciseFields,
    append: appendExercise,
    remove: removeExercise,
  } = useFieldArray({
    control,
    name: "exercises",
  });

  // question: how to manage saving drafts ? add another database field "draftWorkouts" or add type: isDraft on existing workout database field ?
  const onSubmit = useCallback(
    (formValues: AddWorkoutForm) => {
      setPending(true);
      const newWorkout = {
        id: uuidv4(),
        creator: user!.id,
        title: formValues.workoutTitle,
        date: format(formValues.startTime, "yyyy-MM-dd"),
        exercises: generateWorkoutExercises(formValues.exercises),
      };

      // todo: refactory when backend will be written. Delete addQueryUserProgress because it will be done in backend in addNewWorkout route
      addQueryWorkout(newWorkout)
        .then(() => {
          resetForm();

          const newUserProgress = generateUserProgress(newWorkout);
          return newUserProgress.map((userProgres) =>
            addQueryUserProgres(userProgres)
          );
        })
        .finally(() => setPending(false));
    },
    [addQueryWorkout, addQueryUserProgres, resetForm, user]
  );

  return {
    pending,
    methods,
    onSubmit,
    canSubmit,
    exerciseFields,
    appendExercise,
    removeExercise,
    resetForm,
  };
};
