import React from "react";

import { LoadingButton } from "@mui/lab";

import { useAddProgramMutation } from "../../hooks/queryHooks/programsHooks/useAddProgramMutation";

import { DUMMY_PROGRAM } from "./constans";

import { SectionHeader, SectionContainer } from "../../components";
import { Status } from "../../shared/enums";

const NewProgramPage: React.FC = () => {
  const {
    isLoading,
    status,
    mutate: addQueryProgram,
  } = useAddProgramMutation();

  const addNewProgram = () => {
    addQueryProgram(DUMMY_PROGRAM);
  };

  return (
    <SectionContainer>
      <SectionHeader>New Program</SectionHeader>
      <LoadingButton
        loading={isLoading}
        onClick={addNewProgram}
        variant="contained"
      >
        add new program
      </LoadingButton>
      {status === Status.SUCCESS && <div>program added!</div>}
      {status === Status.ERROR && <div>ERROR</div>}
    </SectionContainer>
  );
};

const NewProgram = NewProgramPage;
export default NewProgram;
