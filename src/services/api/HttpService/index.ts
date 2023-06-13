import axios from "axios";
import { EXERCISE_API_URL, API_URL } from "../../../config/env.config";
import { config } from "./constans";

const pluckData = <T>(wrapper: { data: T }) => wrapper.data;
const throwError = (e: Error) => {
  throw e;
};
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
const axiosInstanceExerciseApi = axios.create({
  baseURL: EXERCISE_API_URL,
});

const HttpService = {
  get: <T = unknown>(path: string) =>
    axiosInstance.get<T>(path).then(pluckData).catch(throwError),

  post: <T = void>(path: string, data?: any) =>
    axiosInstance.post<T>(path, data).then(pluckData).catch(throwError),

  patch: <T = void>(path: string, data?: any) =>
    axiosInstance.patch<T>(path, data).then(pluckData).catch(throwError),

  put: <T = void>(path: string, data?: any) =>
    axiosInstance.put<T>(path, data).then(pluckData).catch(throwError),

  delete: <T = void>(path: string, data?: any) =>
    axiosInstance.delete<T>(path, data).then(pluckData).catch(throwError),
};

const ExerciseDBHttpService = {
  get: <T = unknown>(path: string) =>
    axiosInstanceExerciseApi
      .get<T>(path, config)
      .then(pluckData)
      .catch(throwError),
};

export { HttpService, ExerciseDBHttpService };
