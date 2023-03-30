import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAddProgramMutation } from "../../queryHooks/programsHooks/useAddProgramMutation";
import { useUserContext } from "../../../contexts/userContext";

import { Program, ProgramItem } from "../../../shared/interfaces";
import { ErrorMessages, ProgramLevels } from "../../../shared/enums";
import { TEMPO_REGEX } from "../../../shared/regex/regex";
import {
  minFreqTraining,
  maxFreqTraining,
  minProgramLength,
  maxProgramLength,
} from "./constans";

export enum AddProgramFormFields {
  // form step 1
  PROGRAM_LENGTH = "programLength",
  FREQUENCY_PER_WEEK = "frequency",
  PROGRAM_LEVEL = "programLevel",
  // form step 2
  PROGRAM = "program",
  // form step 3
  IMAGE = "image",
  PROGRAM_TITLE = "programTitle",
  PROGRAM_PRICE = "programPrice",
  PROGRAM_DESCRIPTION = "programDescription",
}

export interface AddProgramForm {
  [AddProgramFormFields.PROGRAM_TITLE]: string;
  [AddProgramFormFields.PROGRAM_LEVEL]: ProgramLevels;
  [AddProgramFormFields.FREQUENCY_PER_WEEK]: number;
  [AddProgramFormFields.PROGRAM_LENGTH]: number;
  [AddProgramFormFields.PROGRAM]: ProgramItem[];
  [AddProgramFormFields.IMAGE]: File | null;
  [AddProgramFormFields.PROGRAM_PRICE]: number;
  [AddProgramFormFields.PROGRAM_DESCRIPTION]: string;
}

const defaultValues: AddProgramForm = {
  [AddProgramFormFields.PROGRAM_TITLE]: "",
  [AddProgramFormFields.PROGRAM_LEVEL]: ProgramLevels.NOVICE,
  [AddProgramFormFields.FREQUENCY_PER_WEEK]: minFreqTraining,
  [AddProgramFormFields.PROGRAM_LENGTH]: minProgramLength,
  [AddProgramFormFields.PROGRAM]: [],
  [AddProgramFormFields.IMAGE]: null,
  [AddProgramFormFields.PROGRAM_PRICE]: 0,
  [AddProgramFormFields.PROGRAM_DESCRIPTION]: "",
};

const programSchema = yup.object().shape({
  [AddProgramFormFields.PROGRAM_TITLE]: yup.string().required().min(5),
  [AddProgramFormFields.PROGRAM_LEVEL]: yup
    .mixed<ProgramLevels>()
    .oneOf(Object.values(ProgramLevels)),
  [AddProgramFormFields.FREQUENCY_PER_WEEK]: yup
    .number()
    .required()
    .min(2)
    .max(7),
  [AddProgramFormFields.PROGRAM]: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        weekWorkouts: yup
          .array()
          .of(
            yup.object().shape({
              id: yup.string().required(),
              creator: yup.string().required(),
              title: yup.string().required(),
              date: yup.string(),
              exercises: yup.array().of(
                yup.object().shape({
                  id: yup.string().required(),
                  name: yup.string().required(),
                  sets: yup.array().of(
                    yup.object().shape({
                      weight: yup.number().required(),
                      reps: yup.number().required(),
                      tempo: yup
                        .string()
                        .required()
                        .matches(TEMPO_REGEX, ErrorMessages.TEMPO_MATCHES),
                      repMax: yup.number().required(),
                    })
                  ),
                })
              ),
            })
          )
          .required()
          .min(minFreqTraining)
          .max(maxFreqTraining),
      })
    )
    .required()
    .min(minProgramLength)
    .max(maxProgramLength),
  [AddProgramFormFields.PROGRAM_LENGTH]: yup
    .number()
    .required()
    .min(minProgramLength)
    .max(maxProgramLength),
  [AddProgramFormFields.IMAGE]: yup.mixed().required(),
  [AddProgramFormFields.PROGRAM_PRICE]: yup.number().required().min(0),
  [AddProgramFormFields.PROGRAM_DESCRIPTION]: yup.string().min(20).max(150),
});

export const useNewProgramForm = () => {
  const [pending, setPending] = useState(false);
  const { mutateAsync: addQueryProgram } = useAddProgramMutation();
  const { user } = useUserContext();

  const methods = useForm<AddProgramForm>({
    defaultValues,
    resolver: yupResolver(programSchema),
  });

  const { watch, control, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const {
    programTitle,
    programLevel,
    frequency,
    programLength,
    program,
    image,
    programPrice,
    programDescription,
  } = watch();

  const canSubmit =
    programTitle &&
    programLevel &&
    frequency &&
    programLength &&
    program &&
    image &&
    programPrice &&
    programDescription;

  const {
    fields: programFields,
    append: appendProgramField,
    remove: removeProgramField,
  } = useFieldArray({
    control,
    name: AddProgramFormFields.PROGRAM,
  });

  const onSubmit = useCallback(
    (formValues: AddProgramForm) => {
      setPending(true);
      const newProgram: Program = {
        id: uuidv4(),
        creator: { id: user!.id, name: user!.name },
        title: formValues.programTitle,
        level: formValues.programLevel,
        frequencyPerWeek: formValues.frequency,
        programLength: formValues.programLength,
        program: formValues.program,
        image: formValues.image,
        price: formValues.programPrice,
        description: formValues.programDescription,
      };
      addQueryProgram(newProgram)
        .then(resetForm)
        .finally(() => {
          setPending(false);
        });
    },
    [user, addQueryProgram, resetForm]
  );

  return {
    pending,
    methods,
    onSubmit,
    canSubmit,
    programFields,
    appendProgramField,
    removeProgramField,
    resetForm,
  };
};
