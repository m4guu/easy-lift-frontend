import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUpdateUserMutation } from "../../queryHooks/auth/useUpdateUserMutation";
import { useUserContext } from "../../../contexts/userContext";

import { User } from "../../../shared/interfaces";

export enum TrainerConfigFields {
  NAME = "name",
  DESCRIPTION = "description",
  IMAGE = "image",
  GYMS = "gyms",
}

export interface TrainerConfig {
  [TrainerConfigFields.NAME]: string;
  [TrainerConfigFields.DESCRIPTION]: string;
  [TrainerConfigFields.IMAGE]: File | null;
  [TrainerConfigFields.GYMS]: string[];
}

export const defaultValues = {
  [TrainerConfigFields.NAME]: "",
  [TrainerConfigFields.DESCRIPTION]: "",
  [TrainerConfigFields.GYMS]: ["default"],
  [TrainerConfigFields.IMAGE]: null,
};

const schema = yup.object().shape({
  [TrainerConfigFields.NAME]: yup.string().required().min(4).max(15),
  [TrainerConfigFields.DESCRIPTION]: yup.string().required().min(20).max(100),
  [TrainerConfigFields.GYMS]: yup.array().of(yup.string()),
  [TrainerConfigFields.IMAGE]: yup.mixed().required(),
});

export const useTrainerConfigForm = () => {
  const [pending, setPending] = useState(false);
  const { mutateAsync: updateUserQuery } = useUpdateUserMutation();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const methods = useForm<TrainerConfig>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { watch, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { name, description, gyms, image } = watch();

  const canSubmit = name && description && gyms && image;

  const onSubmit = useCallback(
    (formValues: TrainerConfig) => {
      setPending(true);
      const updatedTrainer: User = {
        ...user!,
        name: formValues.name,
        image: formValues.image,
        description: formValues.description,
        gyms: formValues.gyms,
        isConfigured: true,
      };

      updateUserQuery(updatedTrainer)
        .then(() => {
          resetForm();
          navigate(0);
        })
        .finally(() => setPending(false));
    },
    [updateUserQuery, resetForm, user, navigate]
  );

  return {
    pending,
    methods,
    canSubmit,
    onSubmit,
    resetForm,
  };
};
