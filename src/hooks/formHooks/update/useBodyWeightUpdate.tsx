import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUserContext } from "../../../contexts/userContext";
import { useUpdateUserMutation } from "../../queryHooks/auth/useUpdateUserMutation";

import { getTodayDate } from "../../../utils/Date";

import { User } from "../../../shared/interfaces";

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
  const [pending, setPending] = useState(false);
  const { user } = useUserContext();
  const { mutateAsync: updateUserQuery } = useUpdateUserMutation();

  const methods = useForm<BodyWeightUpdate>({
    defaultValues: {
      [BodyWeightUpdateFields.BODY_WEIGHT]:
        user?.bodyWeights?.at(-1)?.weight || 100,
    },
    resolver: yupResolver(schema),
  });
  const { watch, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { bodyWeight } = watch();
  const canSubmit = !!bodyWeight;

  const onSubmit = useCallback(
    (formValues: BodyWeightUpdate) => {
      setPending(true);
      const updatedUser: User = {
        ...user!,
        bodyWeights: [
          ...user!.bodyWeights!,
          {
            date: getTodayDate(),
            weight: formValues[BodyWeightUpdateFields.BODY_WEIGHT],
          },
        ],
      };
      updateUserQuery(updatedUser)
        .then(() => {
          resetForm();
        })
        .finally(() => setPending(false));
      setPending(false);
    },
    [user, updateUserQuery, resetForm]
  );

  return {
    pending,
    methods,
    canSubmit,
    onSubmit,
    resetForm,
  };
};
