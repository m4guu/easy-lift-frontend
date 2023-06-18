import React from "react";

import { useParams } from "react-router-dom";

import { Box, Alert, Typography } from "@mui/material";

import { Status } from "../../../shared/enums";
import { useProgram } from "../../../hooks/queryHooks/programsHooks/useProgram";

import { Header } from "./views/Header/Header";
import { ProgramDetails } from "./views/ProgramDetails/ProgramDetails";

import { ProgramActions } from "./views/ProgramActions/ProgramActions";
import { API_URL } from "../../../config/env.config";

const Program: React.FC = () => {
  const { programId } = useParams();

  const { status, error, data: program } = useProgram(programId);
  return (
    <Box>
      {status === Status.LOADING && <Typography>loading...</Typography>}
      {status === Status.ERROR && <Typography>error</Typography>}

      {status === Status.SUCCESS && program ? (
        <Box>
          <Header
            title={program.title}
            price={program.price}
            image={`${API_URL}${program.image}`}
          />
          <ProgramDetails
            description={program.description}
            level={program.level}
            frequency={program.frequencyPerWeek}
            programLength={program.programLength}
          />
          <ProgramActions program={program} />
        </Box>
      ) : (
        <Alert variant="outlined" severity="info">
          There is no program with provided ID.
        </Alert>
      )}
    </Box>
  );
};

export default Program;
