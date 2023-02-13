import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export enum AddWorkoutFormFields {
  WORKOUT_TITLE = "workoutTitle",
  START_TIME = "startTime",
  EXERCISES = "exercises",
}

export interface AddWorkoutForm {
  // todo: add custom type
  exercises: any[];
  workoutTitle: string;
  startTime: Date;
}

const defaultValues: AddWorkoutForm = {
  workoutTitle: "f",
  startTime: new Date(),
  exercises: [],
};

const schema = yup.object().shape({
  workoutTitle: yup.string().required().min(5),
  startTime: yup.date().required(),
  exercises: yup.array().required().min(1),
});

export const useNewWorkoutForm = () => {
  const [pending, setPending] = useState(false);

  const methods = useForm<AddWorkoutForm>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { watch } = methods;

  const { workoutTitle, startTime, exercises } = watch();

  const canSubmit = workoutTitle && startTime && exercises;

  const onSubmit = useCallback((formValues: AddWorkoutForm) => {
    setPending(true);
    console.log(formValues);
    setPending(false);
  }, []);

  return { pending, methods, onSubmit, canSubmit };
};
