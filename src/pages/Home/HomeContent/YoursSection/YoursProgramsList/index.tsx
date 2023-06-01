import React from "react";

import { List, Alert, Typography } from "@mui/material";

import { useTrainerPrograms } from "../../../../../hooks/queryHooks/programsHooks/useTrainerPrograms";

import { Status } from "../../../../../shared/enums";
import { Program } from "../../../../../shared/interfaces";
import { ProgramItem } from "../../../../../components";

export const YoursProgramsList: React.FC<{ userId: string }> = ({ userId }) => {
  const { status, error, data: userPrograms } = useTrainerPrograms(userId);

  return (
    <List disablePadding>
      {status === Status.LOADING && <Typography>loading...</Typography>}
      {status === Status.ERROR && <Typography>error</Typography>}

      {userPrograms?.map((program: Program) => {
        return <ProgramItem key={program.id} program={program} />;
      })}

      {userPrograms?.length === 0 && (
        <Alert variant="outlined" severity="info">
          You dont have training programs yet.
        </Alert>
      )}
    </List>
  );
};
