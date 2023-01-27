import React from "react";

import { List, Alert } from "@mui/material";

import { useTrainerPrograms } from "../../../../../hooks/queryHooks/programsHooks/useTrainerPrograms";
import { useGetUserId } from "../../../../../store/redux-store/slices/user/user.hooks";

import { Status } from "../../../../../shared/enums";
import { Program } from "../../../../../shared/interfaces";
import { ProgramItem } from "../../../../../components";

export const YoursProgramsList: React.FC = () => {
  const { id: userId } = useGetUserId();
  const {
    status,
    error,
    data: userPrograms,
  } = useTrainerPrograms(userId || "");

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
