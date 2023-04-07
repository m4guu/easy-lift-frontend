import React from "react";

import { useParams } from "react-router-dom";

import { Box, Alert } from "@mui/material";
import { styled } from "@mui/system";

import { Status } from "../../../shared/enums";
import { useProgram } from "../../../hooks/queryHooks/programsHooks/useProgram";

import { Header } from "./views/Header/Header";
import { ProgramDetails } from "./views/ProgramDetails/ProgramDetails";

// todo: change dummy img into real Program Image -> change program FORM !
import DUMMY_PROGRAM_IMAGE from "../../../assets/images/programs/dummy-program-image.jpg";
import { ProgramActions } from "./views/ProgramActions/ProgramActions";

// todo: change  program[0] ---> program [when backend will be written]
const ProgramPage: React.FC = () => {
  const { programId } = useParams();

  const { status, error, data: program } = useProgram(programId);
  return (
    <SectionContainer>
      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error!</div>}

      {status === Status.SUCCESS && program?.at(0) && (
        <SectionWrapper>
          <Header
            title={program[0].title}
            price={program[0].price}
            image={DUMMY_PROGRAM_IMAGE}
          />
          <ProgramDetails
            description={program[0].description}
            level={program[0].level}
            frequency={program[0].frequencyPerWeek}
            programLength={program[0].programLength}
          />
          <ProgramActions program={program} />
        </SectionWrapper>
      )}

      {status === "success" && program?.length === 0 && (
        <Alert variant="outlined" severity="info">
          There is no program with provided ID.
        </Alert>
      )}
    </SectionContainer>
  );
};

const SectionContainer = styled(Box)({});
const SectionWrapper = styled(Box)({});

const Program = ProgramPage;
export default Program;
