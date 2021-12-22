import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import {
  transformRequestHook,
  requestInterceptors,
  responseInterceptors,
  responseInterceptorsCatch,
} from "./transform";

export class Http {
  private instance: AxiosInstance;

  constructor(options: AxiosRequestConfig) {
    this.instance = axios.create(options);
    this.setupInterceptors();
  }

  private createHttp(config: AxiosRequestConfig): void {
    this.instance = axios.create(config);
  }

  private setupInterceptors() {
    // 请求拦截处理
    this.instance.interceptors.request.use(requestInterceptors, undefined);
    this.instance.interceptors.request.use(undefined, () => {});
    // 响应拦截处理
    this.instance.interceptors.response.use(responseInterceptors, undefined);
    this.instance.interceptors.response.use(
      undefined,
      responseInterceptorsCatch
    );
  }

  getHttp(): AxiosInstance {
    return this.instance;
  }

  configHttp(config: AxiosRequestConfig) {
    if (!this.instance) {
      return;
    }
    this.createHttp(config);
  }

  setHeader(headers: AxiosRequestHeaders): void {
    if (!this.instance) {
      return;
    }

    Object.assign(this.instance.defaults.headers, headers);
  }

  get(url: string) {
    return this.request({
      url,
      method: "GET",
    });
  }

  request<T>(config: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((result) => {
          const res = transformRequestHook(result);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
