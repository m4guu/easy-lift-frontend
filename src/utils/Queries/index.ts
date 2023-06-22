import {
  ProgramQueries,
  TrainerQueries,
  WorkoutsQueries,
} from "../../shared/interfaces";

export const generateProgramQueriesPath = (queries: ProgramQueries) => {
  let queryString = ``;

  if (queries) {
    const {
      limit,
      creator,
      name,
      maxPrice,
      minPrice,
      minFreqTraining,
      maxFreqTraining,
      minProgramLength,
      maxProgramLength,
      programLevel,
    } = queries;

    if (limit) queryString += `&limit=${limit}`;
    if (creator) queryString += `&creator=${creator}`;
    if (name) queryString += `&name=${name}`;
    if (programLevel) queryString += `&programLevel=${programLevel}`;
    if (maxPrice) queryString += `&maxPrice=${maxPrice}`;
    if (minPrice) queryString += `&minPrice=${minPrice}`;
    if (minFreqTraining) queryString += `&minFreqTraining=${minFreqTraining}`;
    if (maxFreqTraining) queryString += `&maxFreqTraining=${maxFreqTraining}`;
    if (minProgramLength)
      queryString += `&minProgramLength=${minProgramLength}`;
    if (maxProgramLength)
      queryString += `&maxProgramLength=${maxProgramLength}`;
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

export const generateTrainerQueriesPath = (queries: TrainerQueries) => {
  let queryString = ``;

  if (queries) {
    const { name, personalTraining } = queries;
    if (name) queryString += `&name=${name}`;
    if (personalTraining)
      queryString += `&personalTraining=${personalTraining}`;
  }

  return queryString;
};
