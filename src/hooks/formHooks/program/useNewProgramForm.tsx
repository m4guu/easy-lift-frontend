import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAddProgramMutation } from "../../queryHooks/programsHooks/useAddProgramMutation";
import { useUserContext } from "../../../contexts/userContext";

import {
  Program,
  ProgramItem,
  ProgramUpdates,
} from "../../../shared/interfaces";
import { ProgramLevels } from "../../../shared/enums";
import {
  minFreqTraining,
  maxFreqTraining,
  minProgramLength,
  maxProgramLength,
} from "./constans";
import { useUpdateProgramMutation } from "../../queryHooks/programsHooks/useUpdateProgramMutation";
import { workoutTrainerSchema } from "../workout/constans";
import { PATHS } from "../../../pages/paths";

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
  [AddProgramFormFields.IMAGE]: File[];
  [AddProgramFormFields.PROGRAM_PRICE]: number;
  [AddProgramFormFields.PROGRAM_DESCRIPTION]: string;
}

const defaultProgramValues: AddProgramForm = {
  [AddProgramFormFields.PROGRAM_TITLE]: "",
  [AddProgramFormFields.PROGRAM_LEVEL]: ProgramLevels.NOVICE,
  [AddProgramFormFields.FREQUENCY_PER_WEEK]: minFreqTraining,
  [AddProgramFormFields.PROGRAM_LENGTH]: minProgramLength,
  [AddProgramFormFields.PROGRAM]: [],
  [AddProgramFormFields.IMAGE]: undefined as unknown as File[],
  [AddProgramFormFields.PROGRAM_PRICE]: 0,
  [AddProgramFormFields.PROGRAM_DESCRIPTION]: "",
};

const programUpdateSchema = yup.object().shape({
  [AddProgramFormFields.PROGRAM_TITLE]: yup.string().required().min(5).max(20),
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
          .of(workoutTrainerSchema)
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
  [AddProgramFormFields.PROGRAM_PRICE]: yup.number().required().min(0),
  [AddProgramFormFields.PROGRAM_DESCRIPTION]: yup.string().min(20).max(150),
});
type UseProgramFormProps = {
  editProgram?: Program;
};

export const useNewProgramForm = ({ editProgram }: UseProgramFormProps) => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [pending, setPending] = useState(false);
  const { mutateAsync: addQueryProgram } = useAddProgramMutation();
  const { mutateAsync: updateQueryProgram } = useUpdateProgramMutation(
    editProgram ? editProgram.id : ""
  );

  const defaultValues = editProgram
    ? {
        ...defaultProgramValues,
        [AddProgramFormFields.PROGRAM]: editProgram.program,
        [AddProgramFormFields.PROGRAM_TITLE]: editProgram.title,
        [AddProgramFormFields.IMAGE]: undefined as unknown as File[],
        [AddProgramFormFields.PROGRAM_PRICE]: editProgram.price,
        [AddProgramFormFields.PROGRAM_DESCRIPTION]: editProgram.description,
      }
    : defaultProgramValues;

  const schema = editProgram
    ? programUpdateSchema
    : programUpdateSchema.shape({
        [AddProgramFormFields.IMAGE]: yup.mixed().required(),
      });

  const methods = useForm<AddProgramForm>({
    defaultValues,
    resolver: yupResolver(schema),
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

      const newProgram: Omit<Program, "id"> = {
        creator: user!.id,
        title: formValues.programTitle,
        level: formValues.programLevel,
        frequencyPerWeek: formValues.frequency,
        programLength: formValues.programLength,
        program: formValues.program,
        image: formValues.image ? formValues.image[0] : "",
        price: formValues.programPrice,
        description: formValues.programDescription,
      };
      const newProgramFormData = new FormData();
      Object.entries(newProgram).forEach(([fieldName, fieldValue]) => {
        if (fieldValue instanceof File) {
          newProgramFormData.append(fieldName, fieldValue);
        } else if (Array.isArray(fieldValue)) {
          newProgramFormData.append(fieldName, JSON.stringify(fieldValue));
        } else {
          newProgramFormData.append(fieldName, fieldValue.toString());
        }
      });

      const updatedProgram: ProgramUpdates = {
        title: formValues.programTitle,
        image: formValues.image ? formValues.image[0] : "",
        price: formValues.programPrice,
        description: formValues.programDescription,
      };
      const updatedFormData = new FormData();
      Object.entries(updatedProgram).forEach(([fieldName, fieldValue]) => {
        if (fieldValue instanceof File) {
          updatedFormData.append(fieldName, fieldValue);
        } else {
          updatedFormData.append(fieldName, fieldValue.toString());
        }
      });

      const method = editProgram
        ? updateQueryProgram({
            updatedProgram: updatedFormData,
            programId: editProgram.id,
          })
        : addQueryProgram(newProgramFormData);

      method.then(() => {
        resetForm();
        navigate(PATHS.default);
      });
      setPending(false);
    },
    [
      user,
      addQueryProgram,
      resetForm,
      updateQueryProgram,
      editProgram,
      navigate,
    ]
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
