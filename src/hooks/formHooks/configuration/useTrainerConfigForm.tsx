import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useConfigureTrainerMutation } from "../../queryHooks/auth/useConfigureTrainerMutation";
import { useUserContext } from "../../../contexts/userContext";

import { Gym, User } from "../../../shared/interfaces";
import { PATHS } from "../../../pages/paths";
import { gyms as allGyms } from "../../../pages/Configuration/views/ConfigurationForm/views/Trainer/form/constans";

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

const defaultSchema = yup.object().shape({
  [TrainerConfigFields.NAME]: yup.string().required().min(4).max(15),
  [TrainerConfigFields.DESCRIPTION]: yup.string().required().min(20).max(100),
  [TrainerConfigFields.GYMS]: yup.array().of(yup.string()),
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
  const initSelectedGyms = defaultUpdateValues?.gyms
    ? allGyms.filter((gym) => defaultUpdateValues?.gyms?.includes(gym.id))
    : [];
  const [selectedGyms, setSelectedGyms] = useState<Gym[]>(initSelectedGyms);

  const schema = defaultUpdateValues
    ? defaultSchema
    : defaultSchema.shape({
        [TrainerConfigFields.IMAGE]: yup.mixed().required(),
      });

  const methods = useForm<TrainerConfig>({
    defaultValues: defaultUpdateValues || defaultValues,
    resolver: yupResolver(schema),
  });

  const { watch, reset, setValue } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { name, description, gyms } = watch();

  const canSubmit = name && description && gyms;

  const onSubmit = useCallback(
    (formValues: TrainerConfig) => {
      const updatedTrainer: Partial<User> = {
        name: formValues.name,
        description: formValues.description,
        gyms: formValues.gyms,
        image: formValues.image ? formValues.image[0] : "",
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

  const removeGym = (gym: Gym) => {
    const updatedGyms = selectedGyms.filter(
      (selectedGym) => selectedGym.id !== gym.id
    );
    const updatedGymsIds = updatedGyms.map((updatedGym) => updatedGym.id);
    // remove existing gym
    setSelectedGyms(updatedGyms);
    // remove form field existing gym
    setValue(TrainerConfigFields.GYMS, updatedGymsIds);
  };

  const gymsChangeHandler = (selectedGym: Gym) => {
    const isSelected = !!selectedGyms.filter((gym) => gym.id === selectedGym.id)
      .length;

    if (isSelected) {
      removeGym(selectedGym);
    } else {
      const updatedGyms = [...selectedGyms, selectedGym];
      const updatedGymsIds = updatedGyms.map((updatedGym) => updatedGym.id);
      // change existing gyms
      setSelectedGyms(updatedGyms);
      // update form field gyms
      setValue(TrainerConfigFields.GYMS, updatedGymsIds);
    }
  };

  return {
    methods,
    canSubmit,
    onSubmit,
    resetForm,
    updateTrainerStatus,
    updateTrainerError,
    isUpdatingTrainer,
    removeGym,
    gymsChangeHandler,
    selectedGyms,
  };
};
