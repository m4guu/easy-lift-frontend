import { ProgramQueries, WorkoutsQueries } from "../../shared/interfaces";

export const generateProgramQueriesPath = (queries: ProgramQueries) => {
  let queryString = ``;

  if (queries) {
    const { limit, creator } = queries;
    if (limit) queryString += `&limit=${limit}`;
    if (creator) queryString += `&creator=${creator}`;
  }

  return queryString;
};

export const generateWorkoutQueriesPath = (queries: WorkoutsQueries) => {
  let queryString = ``;

  if (queries) {
    const { creator, monthNumber } = queries;
    if (creator) queryString += `&creator=${creator}`;
    if (monthNumber) queryString += `&monthNumber=${monthNumber}`;
  }

  return queryString;
};
