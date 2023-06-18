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
    HttpService.get<Program[]>(`${ENDPOINTS.PROGRAMS}?page=${pageParam}`),

  [ProgramsMethods.GET_10_PROGRAMS]: () =>
    HttpService.get<Program[]>(ENDPOINTS.TEN_PROGRAMS),

  [ProgramsMethods.GET_TRAINER_PROGRAMS]: (
    trainerId: string,
    pageParam: number
  ) =>
    HttpService.get<Program[]>(
      `${ENDPOINTS.TRAIENR_PROGRAMS}/${trainerId}?page=${pageParam}`
    ),

  [ProgramsMethods.GET_PROGRAM_BY_ID]: (programId: string) =>
    HttpService.get<Program>(`${ENDPOINTS.PROGRAMS}/${programId}`),

  [ProgramsMethods.CREATE]: (newProgram: FormData): Promise<void> =>
    HttpService.post<void>(ENDPOINTS.PROGRAMS, newProgram),

  [ProgramsMethods.DELETE]: (programId: string): Promise<void> =>
    HttpService.delete<void>(`${ENDPOINTS.PROGRAMS}/${programId}`),

  [ProgramsMethods.UPDATE]: ({
    updatedProgram,
    programId,
  }: {
    updatedProgram: FormData;
    programId: string;
  }): Promise<void> =>
    HttpService.patch<void>(
      `${ENDPOINTS.PROGRAMS}/${programId}`,
      updatedProgram
    ),
};

export default ProgramsService;
