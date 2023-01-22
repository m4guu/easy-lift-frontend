import React from "react";

import { List, Alert } from "@mui/material";

import { useQuery } from "react-query";
import { useGetUserId } from "../../../../../store/redux-store/slices/user/user.hooks";

import { ProgramsService } from "../../../../../services";

import { Program } from "../../../../../shared/interfaces";
import { ProgramItem } from "../../../../../components";

const YoursProgramsList: React.FC = () => {
  const { id: userId } = useGetUserId();
  const {
    status,
    error,
    data: userPrograms,
  } = useQuery(["workouts"], () => ProgramsService.getTrainerPrograms(userId));

  return (
    <List>
      {status === "loading" && <div>loading...</div>}
      {status === "error" && <div>error</div>}

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

export default YoursProgramsList;
