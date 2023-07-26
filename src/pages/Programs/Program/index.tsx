import React from "react";

import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import { useProgram } from "../../../hooks/queryHooks/programsHooks/useProgram";

import { Header } from "./views/Header/Header";
import { ProgramDetails } from "./views/ProgramDetails/ProgramDetails";

import { ProgramActions } from "./views/ProgramActions/ProgramActions";
import { API_URL } from "../../../config/env/env.config";
import { StatusBar } from "../../../components";

const Program: React.FC = () => {
  const { programId } = useParams();
  const { status, error, data: program } = useProgram(programId!);

  return (
    <Box>
      {program && (
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
            creatorId={program.creator}
            programLength={program.programLength}
          />
          <ProgramActions program={program} />
        </Box>
      )}

      <StatusBar status={status} error={error} />
    </Box>
  );
};

export default Program;
