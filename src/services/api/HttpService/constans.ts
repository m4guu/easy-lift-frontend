import { VITE_RAPID_API_KEY } from "../../../config/env.config";

export const config = {
  headers: {
    "X-RapidAPI-Key": VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};
