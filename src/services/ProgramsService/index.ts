import { ENDPOINTS, HttpService } from "../api";

import { Program, ProgramUpdates } from "../../shared/interfaces";

export enum ProgramsMethods {
  GET_ALL_PROGRAMS = "getAllPrograms",
  GET_10_PROGRAMS = "get10Programs",
  GET_TRAINER_PROGRAMS = "getTrainerPrograms",
  GET_PROGRAM_BY_ID = "getProgramById",
  CREATE = "create",
  DELETE = "delete",
  UPDATE = "update",
}

const ProgramsService = {
  [ProgramsMethods.GET_ALL_PROGRAMS]: (pageParam: number) =>
    HttpService.get<Program[]>(`${ENDPOINTS.PROGRAMS}?_page=${pageParam}`),

  [ProgramsMethods.GET_10_PROGRAMS]: () =>
    HttpService.get<Program[]>(`${ENDPOINTS.PROGRAMS}?_limit=10`),

  [ProgramsMethods.GET_TRAINER_PROGRAMS]: (trainerId: string) =>
    HttpService.get<Program[]>(`${ENDPOINTS.PROGRAMS}?creator.id=${trainerId}`),

  [ProgramsMethods.GET_PROGRAM_BY_ID]: (programId: string) =>
    HttpService.get<Program[]>(`${ENDPOINTS.PROGRAMS}?id=${programId}`),

  [ProgramsMethods.CREATE]: (newProgram: Program): Promise<void> =>
    HttpService.post<void>(ENDPOINTS.PROGRAMS, newProgram),

  [ProgramsMethods.DELETE]: (programId: string): Promise<void> =>
    HttpService.delete<void>(`${ENDPOINTS.PROGRAMS}/${programId}`),

  [ProgramsMethods.UPDATE]: (updatedProgram: ProgramUpdates): Promise<void> =>
    HttpService.patch<void>(
      `${ENDPOINTS.PROGRAMS}/${updatedProgram.id}`,
      updatedProgram
    ),
};

export default ProgramsService;
