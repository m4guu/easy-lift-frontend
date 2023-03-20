import { useCallback, useState } from "react";
import {
  useFieldArray,
  useForm,
  UseFieldArrayUpdate,
  FieldValues,
} from "react-hook-form";

import { ValidationError } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAddWorkoutMutation } from "../../queryHooks/workoutsHooks/useAddWorkoutMutation";
import { useAddUserProgresMutation } from "../../queryHooks/userProgressHooks/useAddUserProgresMutation";
import { useUserContext } from "../../../contexts/userContext";

import { generateNewWorkout } from "../../../utils/FormExercises";
import { generateUserProgress } from "../../../utils/UserProgress";

import {
  draftSchema,
  workoutTrainerSchema,
  workoutUserSchema,
} from "./constans";
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
  const [isDraftSubmited, setIsDraftSubmited] = useState(false);

  const { user } = useUserContext();
  const { mutateAsync: addQueryWorkout } = useAddWorkoutMutation();
  const { mutateAsync: addQueryUserProgres } = useAddUserProgresMutation();

  const schema =
    user?.role === Role.trainer ? workoutTrainerSchema : workoutUserSchema;

  const methods = useForm<AddWorkoutForm>({
    defaultValues: defaultWorkoutValues,
    resolver: yupResolver(schema),
  });
  const { watch, control, reset, getValues, setError, clearErrors } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { workoutTitle, startTime, exercises } = watch();

  const canSubmit = workoutTitle && startTime && exercises;

  const {
    fields: exerciseFields,
    append: appendExercise,
    remove: removeExercise,
  } = useFieldArray({
    control,
    name: AddWorkoutFormFields.EXERCISES,
  });

  const onSubmit = useCallback(
    (formValues: AddWorkoutForm) => {
      setPending(true);
      const newWorkout = generateNewWorkout(formValues, user!, false);

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

  const onDraftSave = useCallback(async () => {
    setPending(true);
    clearErrors();
    const formData: AddWorkoutForm = getValues();
    try {
      // validate for draft save
      await draftSchema.validate(formData, { abortEarly: false });
      // add draft workout
      const newDraftWorkout = generateNewWorkout(formData, user!, true);

      // todo: refactory when backend will be written. Delete addQueryUserProgress because it will be done in backend in addNewWorkout route
      addQueryWorkout(newDraftWorkout)
        .then(() => {
          resetForm();

          const newUserProgress = generateUserProgress(newDraftWorkout);
          return newUserProgress.map((userProgres) =>
            addQueryUserProgres(userProgres)
          );
        })
        .finally(() => {
          setPending(false);
          setIsDraftSubmited(true);
        });
    } catch (error: unknown) {
      // ? question -  do i have to handle else ?
      // ?          -  path from ValidationError is string, setError requires one of AddWorkoutFormFields enum how to resolve it ?
      if (error instanceof ValidationError) {
        error.inner?.map((inner, index) => {
          const { type, path, errors } = inner;

          return setError(path, { type, message: errors[index] });
        });
      }
      setPending(false);
    }
  }, [
    getValues,
    setError,
    addQueryWorkout,
    addQueryUserProgres,
    resetForm,
    clearErrors,
    user,
  ]);

  return {
    pending,
    methods,
    onSubmit,
    onDraftSave,
    isDraftSubmited,
    canSubmit,
    exerciseFields,
    appendExercise,
    removeExercise,
    resetForm,
  };
};
