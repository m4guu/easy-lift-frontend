import React from "react";

import { Box, Alert, Typography } from "@mui/material";

import { useProgram } from "../../../../hooks/queryHooks/programsHooks/useProgram";

import { Status } from "../../../../shared/enums";

import { ProgramFormProvider } from "../ProgramFormProvider/ProgramFormProvider";

export const EditProgramFormProvider: React.FC<{ programId: string }> = ({
  programId,
}) => {
  const { status, error, data: editProgram } = useProgram(programId);

  return (
    <Box>
      {status === Status.LOADING && <Typography>loading...</Typography>}
      {status === Status.ERROR && <Typography>error</Typography>}

      {editProgram && editProgram ? (
        <ProgramFormProvider editProgram={editProgram} />
      ) : (
        <Alert variant="outlined" severity="info">
          There are no program with provided id. Try again later.
        </Alert>
      )}
    </Box>
  );
};
