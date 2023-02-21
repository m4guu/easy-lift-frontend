import { useCallback, useState } from "react";
import {
  useFieldArray,
  useForm,
  UseFieldArrayUpdate,
  FieldValues,
} from "react-hook-form";

import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import { yupResolver } from "@hookform/resolvers/yup";

import { useAddWorkoutMutation } from "../../queryHooks/workoutsHooks/useAddWorkoutMutation";
import { useAddUserProgresMutation } from "../../queryHooks/userProgressHooks/useAddUserProgresMutation";
import { useUserContext } from "../../../contexts/userContext";

import { generateWorkoutExercises } from "../../../utils/FormExercises";
import { generateUserProgress } from "../../../utils/UserProgress";

import { workoutTraienrSchema, workoutUserSchema } from "./constans";
import { FormExercise } from "../../../shared/interfaces";
import { Role } from "../../../shared/enums";

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

export const defaultWorkoutValues = {
  [AddWorkoutFormFields.WORKOUT_TITLE]: "",
  [AddWorkoutFormFields.START_TIME]: new Date(),
  [AddWorkoutFormFields.EXERCISES]: [],
};

type UseNewWorkoutFormProps = {
  workoutIndex?: number;
  updateWorkoutField?: UseFieldArrayUpdate<
    FieldValues,
    `program.${number}.weekWorkouts`
  >;
};

export const useNewWorkoutForm = ({
  workoutIndex,
  updateWorkoutField,
}: UseNewWorkoutFormProps) => {
  const [pending, setPending] = useState(false);

  const { user } = useUserContext();
  const { mutateAsync: addQueryWorkout } = useAddWorkoutMutation();
  const { mutateAsync: addQueryUserProgres } = useAddUserProgresMutation();

  const schema =
    user?.role === Role.trainer ? workoutTraienrSchema : workoutUserSchema;

  const methods = useForm<AddWorkoutForm>({
    defaultValues: defaultWorkoutValues,
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

  const onSubmit = useCallback(
    (formValues: AddWorkoutForm) => {
      setPending(true);
      const newWorkout = {
        id: uuidv4(),
        creator: user!.id,
        title: formValues.workoutTitle,
        date: format(formValues.startTime, "yyyy-MM-dd"),
        exercises: generateWorkoutExercises(formValues.exercises, user?.role),
      };

      // todo: refactory when backend will be written. Delete addQueryUserProgress because it will be done in backend in addNewWorkout route
      if (user?.role === Role.user) {
        addQueryWorkout(newWorkout)
          .then(() => {
            resetForm();

            const newUserProgress = generateUserProgress(newWorkout);
            return newUserProgress.map((userProgres) =>
              addQueryUserProgres(userProgres)
            );
          })
          .finally(() => setPending(false));
      } else {
        updateWorkoutField!(workoutIndex!, newWorkout);
        setPending(false);
      }
    },
    [
      user,
      addQueryWorkout,
      resetForm,
      addQueryUserProgres,
      updateWorkoutField,
      workoutIndex,
    ]
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
