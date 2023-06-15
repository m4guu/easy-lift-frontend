import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useConfigureTrainerMutation } from "../../queryHooks/auth/useConfigureTrainerMutation";
import { useUserContext } from "../../../contexts/userContext";

import { User } from "../../../shared/interfaces";
import { PATHS } from "../../../pages/paths";

export enum TrainerConfigFields {
  NAME = "name",
  DESCRIPTION = "description",
  IMAGE = "image",
  GYMS = "gyms",
}

export interface TrainerConfig {
  [TrainerConfigFields.NAME]: string;
  [TrainerConfigFields.DESCRIPTION]: string;
  [TrainerConfigFields.IMAGE]: File[];
  [TrainerConfigFields.GYMS]: string[];
}

export const defaultValues = {
  [TrainerConfigFields.NAME]: "",
  [TrainerConfigFields.DESCRIPTION]: "",
  [TrainerConfigFields.GYMS]: [],
  [TrainerConfigFields.IMAGE]: undefined as unknown as File[],
};

const schema = yup.object().shape({
  [TrainerConfigFields.NAME]: yup.string().required().min(4).max(15),
  [TrainerConfigFields.DESCRIPTION]: yup.string().required().min(20).max(100),
  [TrainerConfigFields.GYMS]: yup.array().of(yup.string()),
  [TrainerConfigFields.IMAGE]: yup.mixed().required(),
});

export const useTrainerConfigForm = ({
  defaultUpdateValues,
}: {
  defaultUpdateValues?: TrainerConfig;
}) => {
  const {
    status: updateTrainerStatus,
    error: updateTrainerError,
    isLoading: isUpdatingTrainer,
    mutateAsync: configureTrainerQuery,
  } = useConfigureTrainerMutation();
  const { user, autoLogin } = useUserContext();
  const navigate = useNavigate();

  const methods = useForm<TrainerConfig>({
    defaultValues: defaultUpdateValues || defaultValues,
    resolver: yupResolver(schema),
  });

  const { watch, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { name, description, gyms, image } = watch();

  const canSubmit = name && description && gyms && image;

  const onSubmit = useCallback(
    (formValues: TrainerConfig) => {
      const updatedTrainer: Partial<User> = {
        name: formValues.name,
        image: formValues.image[0],
        description: formValues.description,
        gyms: formValues.gyms,
      };

      const formData = new FormData();
      Object.entries(updatedTrainer).forEach(([fieldName, fieldValue]) => {
        if (fieldValue instanceof File) {
          formData.append(fieldName, fieldValue);
        } else if (Array.isArray(fieldValue)) {
          formData.append(fieldName, JSON.stringify(fieldValue));
        } else {
          formData.append(fieldName, fieldValue.toString());
        }
      });

      configureTrainerQuery({
        updatedTrainer: formData,
        userId: user!.id,
      }).then(() => {
        autoLogin();
        resetForm();
        navigate(PATHS.default);
      });
    },
    [configureTrainerQuery, resetForm, user, navigate, autoLogin]
  );

  return {
    methods,
    canSubmit,
    onSubmit,
    resetForm,
    updateTrainerStatus,
    updateTrainerError,
    isUpdatingTrainer,
  };
};
