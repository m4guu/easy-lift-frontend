import React from "react";

import { List, Alert } from "@mui/material";

import { useUserContext } from "../../../../../contexts/userContext";
import { useTrainerPrograms } from "../../../../../hooks/queryHooks/programsHooks/useTrainerPrograms";

import { Status } from "../../../../../shared/enums";
import { Program } from "../../../../../shared/interfaces";
import { ProgramItem } from "../../../../../components";

export const YoursProgramsList: React.FC = () => {
  const { user } = useUserContext();
  const { status, error, data: userPrograms } = useTrainerPrograms(user?.id);

  return (
    <List>
      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error</div>}

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
