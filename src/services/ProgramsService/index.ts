import { ENDPOINTS, HttpService } from "../api";

import { Program } from "../../shared/interfaces";

export enum ProgramsMethods {
  GET_ALL_PROGRAMS = "getAllPrograms",
  GET_10_PROGRAMS = "get10Programs",
  GET_TRAINER_PROGRAMS = "getTrainerPrograms",
  GET_PROGRAM_BY_ID = "getProgramById",
  CREATE = "create",
  DELETE = "delete",
}

const ProgramsService = {
  [ProgramsMethods.GET_ALL_PROGRAMS]: () =>
    HttpService.get<Program[]>(ENDPOINTS.PROGRAMS),

  [ProgramsMethods.GET_10_PROGRAMS]: () =>
    HttpService.get<Program[]>(`${ENDPOINTS.PROGRAMS}?_limit=10`),

  [ProgramsMethods.GET_TRAINER_PROGRAMS]: (trainerId: string) =>
    HttpService.get<Program[]>(`${ENDPOINTS.PROGRAMS}?creator=${trainerId}`),

  [ProgramsMethods.GET_PROGRAM_BY_ID]: (programId: string) =>
    HttpService.get<Program[]>(`${ENDPOINTS.PROGRAMS}?id=${programId}`),

  [ProgramsMethods.CREATE]: (newProgram: Program): Promise<void> =>
    HttpService.post(ENDPOINTS.PROGRAMS, newProgram),

  [ProgramsMethods.DELETE]: (programId: string): Promise<void> =>
    HttpService.delete(`${ENDPOINTS.PROGRAMS}/${programId}`),
};

export default ProgramsService;
