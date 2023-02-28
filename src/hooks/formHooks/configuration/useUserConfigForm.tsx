import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUpdateUserMutation } from "../../queryHooks/auth/useUpdateUserMutation";
import { useUserContext } from "../../../contexts/userContext";

import { User } from "../../../shared/interfaces";

export enum UserConfigFields {
  NAME = "name",
  HEIGHT = "height",
  WEIGHT = "weight",
  IMAGE = "image",
}
export interface UserConfig {
  [UserConfigFields.NAME]: string;
  [UserConfigFields.HEIGHT]: number;
  [UserConfigFields.WEIGHT]: number;
  [UserConfigFields.IMAGE]: File | null;
}

export const defaultValues = {
  [UserConfigFields.NAME]: "",
  [UserConfigFields.HEIGHT]: 60,
  [UserConfigFields.WEIGHT]: 30,
  [UserConfigFields.IMAGE]: null,
};

const schema = yup.object().shape({
  [UserConfigFields.NAME]: yup.string().required().min(4).max(15),
  [UserConfigFields.HEIGHT]: yup.number().required().min(60).max(260),
  [UserConfigFields.WEIGHT]: yup.number().required().min(30).max(610),
  [UserConfigFields.IMAGE]: yup.mixed().required(),
});

export const useUserConfigForm = () => {
  const [pending, setPending] = useState(false);
  const { mutateAsync: updateUserQuery } = useUpdateUserMutation();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const methods = useForm<UserConfig>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { watch, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { name, height, weight, image } = watch();
  const canSubmit = name && height && weight && image;

  const onSubmit = useCallback(
    (formValues: UserConfig) => {
      setPending(true);
      const updatedUser: User = {
        ...user,
        name: formValues.name,
        image: formValues.image,
        height: formValues.height,
        bodyWeights: [{ weight: formValues.weight, date: "" }],
        isConfigured: true,
      };
      updateUserQuery(updatedUser)
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
