import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUserContext } from "../../../contexts/userContext";
import { useUpdateWeightMutation } from "../../queryHooks/weightHistory/useUpdateWeightMutation";
import useSnackbar from "../../useSnackbar";

import UpdateWeight from "../../../shared/interfaces/UpdateWeight";
import { SnackbarStatus, Status } from "../../../shared/enums";

export enum BodyWeightUpdateFields {
  BODY_WEIGHT = "bodyWeight",
}

interface BodyWeightUpdate {
  [BodyWeightUpdateFields.BODY_WEIGHT]: number;
}

const schema = yup.object().shape({
  [BodyWeightUpdateFields.BODY_WEIGHT]: yup
    .number()
    .required()
    .min(30)
    .max(610),
});

export const useBodyWeightUpdate = () => {
  const { user } = useUserContext();
  const {
    isLoading: isUpdatingWeight,
    error: updateWeightError,
    status: updateWeightStatus,
    mutateAsync: updateWeightQuery,
  } = useUpdateWeightMutation();
  const snackbar = useSnackbar();

  const methods = useForm<BodyWeightUpdate>({
    defaultValues: {
      [BodyWeightUpdateFields.BODY_WEIGHT]: user?.currentWeight,
    },
    resolver: yupResolver(schema),
  });
  const { watch, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { bodyWeight } = watch();
  const canSubmit = !!bodyWeight;

  const onSubmit = useCallback(
    (formValues: BodyWeightUpdate) => {
      const updatedWeight: UpdateWeight = {
        userId: user?.id!,
        weight: formValues.bodyWeight,
      };
      updateWeightQuery(updatedWeight);
    },
    [updateWeightQuery, user]
  );

  // snackbar
  useEffect(() => {
    if (updateWeightError) {
      snackbar(updateWeightError.message, SnackbarStatus.ERROR);
    }
    if (!isUpdatingWeight && updateWeightStatus === Status.SUCCESS) {
      snackbar("Weight saved successfully!.", SnackbarStatus.SUCCESS);
    }
  }, [snackbar, updateWeightError, isUpdatingWeight, updateWeightStatus]);

  return {
    methods,
    canSubmit,
    onSubmit,
    resetForm,
    isUpdatingWeight,
  };
};
