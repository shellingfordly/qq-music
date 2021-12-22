import { AxiosRequestConfig, AxiosResponse } from "axios";
import { checkStatus } from "./checkStatus";
import { ErrMsg } from "./errMessage";
import { Toast } from "antd-mobile";

// 返回值处理
export function transformRequestHook(res: AxiosResponse) {
  return res.data;
}

// 请求拦截处理
export function requestInterceptors(config: AxiosRequestConfig) {
  return config;
}

// 响应正常处理
export function responseInterceptors(res: AxiosResponse) {
  return res;
}

// 响应错误处理
export function responseInterceptorsCatch(error: any) {
  const { response, code, message } = error || {};
  const msg: string = response?.data?.title ?? "";
  const err: string = error?.toString?.() ?? "";
  let errMessage = "";
  try {
    if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
      errMessage = ErrMsg.apiTimeoutMessage;
    }
    if (err?.includes("Network Error")) {
      errMessage = ErrMsg.networkExceptionMsg;
    }

    if (errMessage) {
      Toast.show({
        content: errMessage,
        position: "top",
      });
      return Promise.reject(error);
    }
  } catch (e) {
    throw new Error(e as string);
  }
  checkStatus(error?.response?.status, msg);
  return Promise.reject(error);
}
