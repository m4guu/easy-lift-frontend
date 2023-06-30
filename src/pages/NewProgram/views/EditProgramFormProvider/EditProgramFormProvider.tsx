import React from "react";

import { Box } from "@mui/material";

import { useProgram } from "../../../../hooks/queryHooks/programsHooks/useProgram";

import { ProgramFormProvider } from "../ProgramFormProvider/ProgramFormProvider";
import { StatusBar } from "../../../../components";

export const EditProgramFormProvider: React.FC<{ programId: string }> = ({
  programId,
}) => {
  const { status, error, data: editProgram } = useProgram(programId);

  return (
    <Box>
      {editProgram && <ProgramFormProvider editProgram={editProgram} />}
      <StatusBar status={status} error={error} />
    </Box>
  );
};
