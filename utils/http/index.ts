import type { AxiosRequestConfig } from "axios";
import { Http } from "./axios";

function createHttp(opt?: Partial<AxiosRequestConfig>) {
  const isDev = process.env.NODE_ENV === "development";
  return new Http({
    baseURL: isDev ? "http://172.16.5.19:3300/" : "/",
    timeout: 3000,
    ...opt,
  });
}

export const http = createHttp();
