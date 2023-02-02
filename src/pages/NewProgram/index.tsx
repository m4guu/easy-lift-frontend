import React from "react";
import { Link } from "react-router-dom";

import { LoadingButton } from "@mui/lab";

import { useAddProgramMutation } from "../../hooks/queryHooks/programsHooks/useAddProgramMutation";

import { DUMMY_PROGRAM } from "./constans";

import { SectionHeader, SectionContainer } from "../../components";
import { Status } from "../../shared/enums";
import { PATHS } from "../paths";

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

      <Link to={PATHS.NEW_WORKOUT}>add new workout</Link>

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
