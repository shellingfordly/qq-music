import type { AxiosRequestConfig } from "axios";
import { Http } from "./axios";

function createHttp(opt?: Partial<AxiosRequestConfig>) {
  return new Http({
    baseURL: "http://localhost:3300/",
    timeout: 2000,
    ...opt,
  });
}

export const http = createHttp();
