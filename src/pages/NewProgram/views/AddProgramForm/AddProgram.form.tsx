import React, { useEffect } from "react";
import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { MenuItem } from "@mui/material";
import { styled } from "@mui/system";

import { ControlledTextField, ImagePicker } from "../../../../features";

import {
  AddProgramForm,
  AddProgramFormFields,
} from "../../../../hooks/formHooks/program/useNewProgramForm";

import {
  ProgramLevels,
  ImagePickerSize,
  ImagePickerType,
} from "../../../../shared/enums";
import { ProgramItem } from "../../../../shared/interfaces";
import { programFrequencies, programLengths } from "./constans";

import { ProgramWeekList } from "./styles/AddProgramForm.styles";
import { ProgramWeekListItem } from "./views/ProgramWeekListItem/ProgramWeekListItem";

// Program Title //
export const ProgramTitle = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Program Title"
    type="text"
    placeholder="New Training Program #1402"
    fieldName={AddProgramFormFields.PROGRAM_TITLE}
  />
))``;
//

// Program Level //
export const ProgramLevel = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Level"
    select
    fieldName={AddProgramFormFields.PROGRAM_LEVEL}
  >
    {Object.values(ProgramLevels).map((programLevel) => {
      return (
        <MenuItem key={programLevel} value={programLevel}>
          {programLevel}
        </MenuItem>
      );
    })}
  </ControlledTextField>
))``;
//

// Program Frequency //
export const ProgramFrequency = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Frequency"
    select
    placeholder="2 trainings per week"
    fieldName={AddProgramFormFields.FREQUENCY_PER_WEEK}
  >
    {programFrequencies.map((freq) => {
      return (
        <MenuItem key={freq.value} value={freq.value}>
          {freq.label}
        </MenuItem>
      );
    })}
  </ControlledTextField>
))``;
//

// Program Length //
export const ProgramLength = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Length"
    select
    fieldName={AddProgramFormFields.PROGRAM_LENGTH}
  >
    {programLengths.map((programLength) => {
      return (
        <MenuItem key={programLength.value} value={programLength.value}>
          {programLength.label}
        </MenuItem>
      );
    })}
  </ControlledTextField>
))``;
//

// Program //

type ProgramProps = {
  programLength: number;
  programFrequency: number;
  programFields: ProgramItem[];
  appendProgram: UseFieldArrayAppend<
    AddProgramForm,
    AddProgramFormFields.PROGRAM
  >;
  removeProgram: UseFieldArrayRemove;
};
export const Program: React.FC<ProgramProps> = ({
  programLength,
  programFrequency,
  programFields,
  appendProgram,
  removeProgram,
}) => {
  useEffect(() => {
    removeProgram();

    for (let i = 0; i < programLength; i += 1) {
      appendProgram({ id: uuidv4(), weekWorkouts: [] });
    }
  }, [programLength, appendProgram, removeProgram]);

  return (
    <ProgramWeekList>
      {programFields.map((programField, i) => {
        return (
          <ProgramWeekListItem
            key={programField.id}
            programFrequency={programFrequency}
            weekIndex={i}
          />
        );
      })}
    </ProgramWeekList>
  );
};

//
// Program Image //
export const Image = styled(() => (
  <ImagePicker
    fieldName={AddProgramFormFields.IMAGE}
    type={ImagePickerType.SQUARE}
    size={ImagePickerSize.LARGE}
    fullWidth
  />
))``; //

// Program Price //
export const ProgramPrice = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Price"
    type="tel"
    placeholder="999 $"
    fieldName={AddProgramFormFields.PROGRAM_PRICE}
  />
))``;
//

// Program Description //
export const ProgramDescription = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Description"
    type="string"
    multiline
    rows={5}
    fieldName={AddProgramFormFields.PROGRAM_DESCRIPTION}
  />
))``;
//
