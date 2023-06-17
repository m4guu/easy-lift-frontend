import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
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

import {
  generateNewWorkout,
  generateWorkoutToEdit,
} from "../../../utils/FormExercises";
import { generateUserProgress } from "../../../utils/UserProgress";

import {
  draftSchema,
  workoutTrainerSchema,
  workoutUserSchema,
} from "./constans";
import { FormExercise, Workout } from "../../../shared/interfaces";
import { Role } from "../../../shared/enums";
import { useUpdateWorkoutMutation } from "../../queryHooks/workoutsHooks/useUpdateWorkouteMutation";
import { PATHS } from "../../../pages/paths";

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
  const [pending, setPending] = useState(false);
  const [isDraftSubmited, setIsDraftSubmited] = useState(false);

  const editWorkoutValues = editWorkout
    ? generateWorkoutToEdit(editWorkout)
    : undefined;

  const { user } = useUserContext();
  const { mutateAsync: addQueryWorkout } = useAddWorkoutMutation();
  const { mutateAsync: addQueryUserProgres } = useAddUserProgresMutation();
  const { mutateAsync: updateQueryWorkout } = useUpdateWorkoutMutation();

  const schema =
    user?.role === Role.trainer ? workoutTrainerSchema : workoutUserSchema;

  const methods = useForm<AddWorkoutForm>({
    defaultValues: editWorkoutValues || defaultWorkoutValues,
    resolver: yupResolver(schema),
  });
  const { watch, control, reset, getValues, setError, clearErrors } = methods;

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
      setPending(true);

      const newWorkout = generateNewWorkout(formValues, user!, false);

      // todo: refactory when backend will be written. Delete addQueryUserProgress because it will be done in backend in addNewWorkout route
      if (user?.role === Role.user) {
        if (editWorkout) {
          updateQueryWorkout({
            workoutId: editWorkout.id,
            updatedWorkout: newWorkout,
          }).then(() => navigate(PATHS.NEW_WORKOUT));
        } else {
          addQueryWorkout(newWorkout).then(resetForm);
        }

        // const newUserProgress = generateUserProgress(newWorkout);
        // return newUserProgress.map((userProgres) =>
        //   addQueryUserProgres(userProgres)
        // );

        setPending(false);
      } else {
        updateWorkoutField!(workoutIndex!, newWorkout);
        setPending(false);
      }
    },
    [
      user,
      addQueryWorkout,
      resetForm,
      navigate,
      // addQueryUserProgres,
      updateQueryWorkout,
      editWorkout,
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
        .then(resetForm)
        .finally(() => {
          setPending(false);
          setIsDraftSubmited(true);
        });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        error.inner?.map((inner, index) => {
          const { type, path, errors } = inner;

          return setError(path, { type, message: errors[index] });
        });
      }
      setPending(false);
    }
  }, [getValues, setError, addQueryWorkout, resetForm, clearErrors, user]);

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
