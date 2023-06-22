import * as yup from "yup";

import { FormSet } from "../../../shared/interfaces";
import { ErrorMessages } from "../../../shared/enums";
import { WEIGHT_REPS_REGEX, TEMPO_REGEX } from "../../../shared/regex/regex";

export const defaultSet: FormSet = {
  goal: "",
  tempo: "",
  archived: "",
};

export const defaultSets: FormSet[] = [defaultSet];

export const workoutTrainerSchema = yup.object().shape({
  title: yup.string().required().min(5),
  startTime: yup.date(),
  exercises: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        id: yup.string().required(),
        sets: yup
          .array()
          .of(
            yup.object().shape({
              goal: yup
                .string()
                .required(ErrorMessages.REQUIRED)
                .matches(WEIGHT_REPS_REGEX, ErrorMessages.WEIGHT_REPS_MATCHES),
              tempo: yup
                .string()
                .required(ErrorMessages.REQUIRED)
                .matches(TEMPO_REGEX, ErrorMessages.TEMPO_MATCHES),
            })
          )
          .required()
          .min(1),
      })
    )
    .required()
    .min(1),
});

export const workoutUserSchema = yup.object().shape({
  title: yup.string().required().min(5).max(20),
  startTime: yup.date(),
  exercises: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        id: yup.string().required(),
        sets: yup
          .array()
          .of(
            yup.object().shape({
              goal: yup
                .string()
                .required(ErrorMessages.REQUIRED)
                .matches(WEIGHT_REPS_REGEX, ErrorMessages.WEIGHT_REPS_MATCHES),
              tempo: yup
                .string()
                .required(ErrorMessages.REQUIRED)
                .matches(TEMPO_REGEX, ErrorMessages.TEMPO_MATCHES),
              archived: yup
                .string()
                .required(ErrorMessages.REQUIRED)
                .matches(WEIGHT_REPS_REGEX, ErrorMessages.WEIGHT_REPS_MATCHES),
            })
          )
          .required()
          .min(1),
      })
    )
    .required()
    .min(1),
});

export const draftSchema = yup.object().shape({
  title: yup.string().required().min(5),
});
