import { HttpStatusCode } from "axios";
import { RAPID_API_KEY } from "../../../config/env/env.config";
import { ErrorId } from "../../../shared/enums";
import { Error } from "../../../shared/interfaces";

export const config = {
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": "musclewiki.p.rapidapi.com",
  },
};

export const undefinedError: Error = {
  message: "Something goes wrong. Please try later.",
  code: HttpStatusCode.InternalServerError,
  id: ErrorId.INTERNAL_SERVER_ERROR,
};
