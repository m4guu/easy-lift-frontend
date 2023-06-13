import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../../../shared/interfaces";

export enum UserUpdateFields {
  EMAIL = "email",
  NAME = "name",
  HEIGHT = "height",
  IMAGE = "image",
}

export interface UserUpdate {
  [UserUpdateFields.EMAIL]: string;
  [UserUpdateFields.IMAGE]: File[] | string;
  [UserUpdateFields.NAME]: string;
  [UserUpdateFields.HEIGHT]: number;
}

const schema = yup.object().shape({
  [UserUpdateFields.EMAIL]: yup.string().email().required(),
  [UserUpdateFields.IMAGE]: yup.mixed().required(),
  [UserUpdateFields.NAME]: yup.string().required().min(4).max(15),
  [UserUpdateFields.HEIGHT]: yup.number().required().min(60).max(260),
});

type UseUserUpdateProps = {
  user: User;
};

export const useUserUpdateForm = ({ user }: UseUserUpdateProps) => {
  const defaultValues = {
    [UserUpdateFields.EMAIL]: user.email,
    [UserUpdateFields.IMAGE]: user.image as string,
    [UserUpdateFields.NAME]: user.name,
    [UserUpdateFields.HEIGHT]: user.height,
  };

  const methods = useForm<UserUpdate>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { watch, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { email, name, height, image } = watch();
  const canSubmit = name && height && email && image;

  const onSubmit = useCallback((formValues: UserUpdate) => {
    const updatedUser: Partial<User> = {
      email: formValues.email,
      image: formValues.image[0],
      name: formValues.name,
      height: formValues.height,
    };
    const formData = new FormData();
    Object.entries(updatedUser).forEach(([fieldName, fieldValue]) => {
      if (fieldValue instanceof File) {
        formData.append(fieldName, fieldValue);
      } else {
        formData.append(fieldName, fieldValue.toString());
      }
    });

    // todo: update user query hook
    console.log(updatedUser);
  }, []);

  return {
    methods,
    canSubmit,
    onSubmit,
    resetForm,
  };
};
