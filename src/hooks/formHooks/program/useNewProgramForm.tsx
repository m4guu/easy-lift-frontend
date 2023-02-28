import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { ErrorMessages } from "../../../shared/enums";
import { TEMPO_REGEX } from "../../../shared/regex/regex";

import ProgramLevels from "../../../shared/enums/ProgramLevels";
import ProgramItem from "../../../shared/interfaces/ProgramItem";
import { useAddProgramMutation } from "../../queryHooks/programsHooks/useAddProgramMutation";
import { Program } from "../../../shared/interfaces";
import { useUserContext } from "../../../contexts/userContext";

export enum AddProgramFormFields {
  // form step 1
  PROGRAM_TITLE = "programTitle",
  PROGRAM_LEVEL = "programLevel",
  FREQUENCY_PER_WEEK = "frequency",
  PROGRAM_LENGTH = "programLength",
  // form step 2
  PROGRAM = "program",
  // form step 3
  PROGRAM_PRICE = "programPrice",
  PROGRAM_DESCRIPTION = "programDescription",
}

export interface AddProgramForm {
  [AddProgramFormFields.PROGRAM_TITLE]: string;
  [AddProgramFormFields.PROGRAM_LEVEL]: ProgramLevels;
  [AddProgramFormFields.FREQUENCY_PER_WEEK]: number;
  [AddProgramFormFields.PROGRAM_LENGTH]: number;
  [AddProgramFormFields.PROGRAM]: ProgramItem[];
  [AddProgramFormFields.PROGRAM_PRICE]: number;
  [AddProgramFormFields.PROGRAM_DESCRIPTION]: string;
}

const defaultValues = {
  [AddProgramFormFields.PROGRAM_TITLE]: "",
  [AddProgramFormFields.PROGRAM_LEVEL]: ProgramLevels.NOVICE,
  [AddProgramFormFields.FREQUENCY_PER_WEEK]: 2,
  [AddProgramFormFields.PROGRAM_LENGTH]: 4,
  [AddProgramFormFields.PROGRAM]: [],
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
          .min(2)
          .max(7),
      })
    )
    .required()
    .min(4)
    .max(12),
  [AddProgramFormFields.PROGRAM_LENGTH]: yup.number().required().min(4).max(12),
  [AddProgramFormFields.PROGRAM_PRICE]: yup.number().required().min(0),
  [AddProgramFormFields.PROGRAM_DESCRIPTION]: yup.string().min(20).max(150),
});

export const useNewProgramForm = () => {
  const [pending, setPending] = useState(false);
  const [isProgramAdded, setIsProgramAdded] = useState(false);
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
    programPrice,
    programDescription,
  } = watch();

  const canSubmit =
    programTitle &&
    programLevel &&
    frequency &&
    programLength &&
    program &&
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
        creator: user!.id,
        title: formValues.programTitle,
        level: formValues.programLevel,
        frequencyPerWeek: formValues.frequency,
        programLength: formValues.programLength,
        program: formValues.program,
        price: formValues.programPrice,
        description: formValues.programDescription,
      };
      addQueryProgram(newProgram)
        .then(resetForm)
        .finally(() => {
          setPending(false);
          setIsProgramAdded(true);
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
    isProgramAdded,
    resetForm,
  };
};
