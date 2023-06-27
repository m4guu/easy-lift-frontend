import { RAPID_API_KEY } from "../../../config/env.config";
import { ErrorId } from "../../../shared/enums";

export const config = {
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const undefinedError = {
  message: "Something goes wrong. Please try later.",
  code: 500,
  id: ErrorId.INTERNAL_SERVER_ERROR,
};
