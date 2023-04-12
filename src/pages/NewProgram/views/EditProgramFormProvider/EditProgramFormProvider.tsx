import React from "react";

import { Box, Alert } from "@mui/material";

import { useProgram } from "../../../../hooks/queryHooks/programsHooks/useProgram";

import { Status } from "../../../../shared/enums";

import { ProgramFormProvider } from "../ProgramFormProvider/ProgramFormProvider";

export const EditProgramFormProvider: React.FC<{ programId: string }> = ({
  programId,
}) => {
  const { status, error, data: editProgram } = useProgram(programId);

  return (
    <Box>
      {status === Status.LOADING && <Box>loading...</Box>}
      {status === Status.ERROR && <Box>error</Box>}

      {editProgram?.length === 0 ? (
        <Alert variant="outlined" severity="info">
          There are no program with provided id. Try again later.
        </Alert>
      ) : (
        <ProgramFormProvider editProgram={editProgram?.at(0)} />
      )}
    </Box>
  );
};
