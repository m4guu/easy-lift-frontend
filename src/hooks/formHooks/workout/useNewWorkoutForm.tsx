import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";
import {
  useFieldArray,
  useForm,
  UseFieldArrayUpdate,
  FieldValues,
} from "react-hook-form";

import { ValidationError } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAddWorkoutMutation } from "../../queryHooks/workoutsHooks/useAddWorkoutMutation";
import { useUserContext } from "../../../contexts/userContext";

import {
  generateNewWorkout,
  generateWorkoutToEdit,
} from "../../../utils/FormExercises";

import {
  draftSchema,
  workoutTrainerSchema,
  workoutUserSchema,
} from "./constans";
import { FormExercise, Workout } from "../../../shared/interfaces";
import { Role, SnackbarStatus } from "../../../shared/enums";
import { useUpdateWorkoutMutation } from "../../queryHooks/workoutsHooks/useUpdateWorkouteMutation";
import { PATHS } from "../../../pages/paths";
import useSnackbar from "../../useSnackbar";

export enum AddWorkoutFormFields {
  WORKOUT_TITLE = "title",
  START_TIME = "startTime",
  EXERCISES = "exercises",
}

export interface AddWorkoutForm {
  [AddWorkoutFormFields.WORKOUT_TITLE]: string;
  [AddWorkoutFormFields.START_TIME]: Dayjs;
  [AddWorkoutFormFields.EXERCISES]: FormExercise[];
}

export const defaultWorkoutValues: AddWorkoutForm = {
  [AddWorkoutFormFields.WORKOUT_TITLE]: "",
  [AddWorkoutFormFields.START_TIME]: dayjs(new Date()),
  [AddWorkoutFormFields.EXERCISES]: [],
};

type UseNewWorkoutFormProps = {
  workoutIndex?: number;
  updateWorkoutField?: UseFieldArrayUpdate<
    FieldValues,
    `program.${number}.weekWorkouts`
  >;
  editWorkout?: Workout;
};

export const useNewWorkoutForm = ({
  workoutIndex,
  updateWorkoutField,
  editWorkout,
}: UseNewWorkoutFormProps) => {
  const navigate = useNavigate();
  const [isDraftSubmited, setIsDraftSubmited] = useState(false);

  const editWorkoutValues = editWorkout
    ? generateWorkoutToEdit(editWorkout)
    : undefined;

  const { user } = useUserContext();
  const snackbar = useSnackbar();

  const {
    error: addWorkoutError,
    isLoading: isAddingWorkout,
    mutateAsync: addQueryWorkout,
  } = useAddWorkoutMutation();
  const {
    error: updateWorkoutError,
    isLoading: isUpdatingWorkout,
    mutateAsync: updateQueryWorkout,
  } = useUpdateWorkoutMutation();

  const pending = isAddingWorkout || isUpdatingWorkout;

  const schema =
    user?.role === Role.trainer ? workoutTrainerSchema : workoutUserSchema;

  const methods = useForm<AddWorkoutForm>({
    defaultValues: editWorkoutValues || defaultWorkoutValues,
    resolver: yupResolver(schema),
  });
  const {
    watch,
    control,
    reset,
    getValues,
    setError,
    clearErrors,
    formState: { isSubmitSuccessful },
  } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { title, startTime, exercises } = watch();

  const canSubmit = title && startTime && exercises;

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
      const newWorkout = generateNewWorkout(formValues, user!, false);

      if (user?.role === Role.user) {
        if (editWorkout) {
          updateQueryWorkout({
            workoutId: editWorkout.id,
            updatedWorkout: newWorkout,
          }).then(() => navigate(PATHS.NEW_WORKOUT));
        } else {
          addQueryWorkout(newWorkout).then(resetForm);
        }
      } else {
        updateWorkoutField!(workoutIndex!, { id: uuidv4(), ...newWorkout });
      }
    },
    [
      user,
      addQueryWorkout,
      resetForm,
      navigate,
      updateQueryWorkout,
      editWorkout,
      updateWorkoutField,
      workoutIndex,
    ]
  );

  const onDraftSave = useCallback(async () => {
    clearErrors();

    const formData: AddWorkoutForm = getValues();
    try {
      // validate for draft save
      await draftSchema.validate(formData, { abortEarly: false });
      // add draft workout
      const newDraftWorkout = generateNewWorkout(formData, user!, true);

      addQueryWorkout(newDraftWorkout)
        .then(resetForm)
        .finally(() => {
          setIsDraftSubmited(true);
        });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        error.inner?.map((inner, index) => {
          const { type, path, errors } = inner;

          return setError(path, { type, message: errors[index] });
        });
      }
    }
  }, [getValues, setError, addQueryWorkout, resetForm, clearErrors, user]);

  // snackbars
  useEffect(() => {
    if (addWorkoutError || updateWorkoutError) {
      snackbar(
        addWorkoutError?.message || updateWorkoutError?.message,
        SnackbarStatus.ERROR
      );
    }
  }, [snackbar, updateWorkoutError, addWorkoutError]);

  useEffect(() => {
    if ((isSubmitSuccessful && user?.role === Role.user) || isDraftSubmited) {
      snackbar(
        `Workout ${isDraftSubmited ? "saved" : "added"} successfuly.`,
        SnackbarStatus.SUCCESS
      );
    }
  }, [snackbar, isSubmitSuccessful, user, isDraftSubmited]);

  return {
    methods,
    pending,
    onSubmit,
    onDraftSave,
    isDraftSubmited,
    canSubmit,
    exerciseFields,
    appendExercise,
    removeExercise,
    addWorkoutError,
    updateWorkoutError,
    resetForm,
  };
};
