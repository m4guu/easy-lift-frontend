import axios from "axios";

import ENDPOINTS from "../endpoints";

const pluckData = <T>(wrapper: { data: T }) => wrapper.data;
const throwError = (e: Error) => {
  throw e;
};
const axiosInstance = axios.create({ baseURL: ENDPOINTS.API });

const HttpService = {
  get: (path: string) =>
    axiosInstance.get(path).then(pluckData).catch(throwError),

  post: (path: string, data?: any) =>
    axiosInstance.post(path, data).then(pluckData).catch(throwError),

  patch: (path: string, data?: any) =>
    axiosInstance.patch(path, data).then(pluckData).catch(throwError),

  delete: (path: string, data?: any) =>
    axiosInstance.delete(path, data).then(pluckData).catch(throwError),
};

export default HttpService;
