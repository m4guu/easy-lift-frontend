import { ENDPOINTS, HttpService } from "../api";

import { Program } from "../../shared/interfaces";

export enum ProgramsMethods {
  GET_ALL_PROGRAMS = "getAllPrograms",
  GET_PROGRAM_BY_ID = "getProgramById",
  CREATE = "create",
  DELETE = "delete",
  UPDATE = "update",
}

const ProgramsService = {
  [ProgramsMethods.GET_ALL_PROGRAMS]: (pageParam: number, queries?: string) =>
    HttpService.get<Program[]>(
      queries
        ? `${ENDPOINTS.PROGRAMS}?page=${pageParam}${queries}`
        : `${ENDPOINTS.PROGRAMS}?page=${pageParam}`
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
