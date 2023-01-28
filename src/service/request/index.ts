import axios from "axios";
import type { AxiosInstance } from "axios";
import type { HYRequestInterceptors, HYRequestConfig } from "./type";
import { ElLoading } from "element-plus";

const DEFAULT_LOADING = false;
class HYRequest {
  instance: AxiosInstance;
  interceptors?: HYRequestInterceptors;
  showLoading: boolean;
  loading?: any;

  constructor(config: HYRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config);
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;

    this.interceptors = config.interceptors;

    // 请求拦截 实例拦截器
    this.instance.interceptors.request.use(
      // 请求拦截器成功
      this.interceptors?.requestInterceptor,
      // 请求拦截器失败
      this.interceptors?.requestInterceptorCatch
    );
    // 响应拦截
    this.instance.interceptors.response.use(
      // 响应拦截器成功
      this.interceptors?.responseInterceptor,
      // 响应拦截器失败
      this.interceptors?.responseInterceptorCatch
    );
    // 所有实例请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例请求成功的拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "加载中...",
            background: "rgba(0, 0, 0, 0.5)",
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );
    // 所有实例响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();
        // console.log('所有实例响应成功的拦截')
        return res;
      },
      (err) => {
        return err;
      }
    );
  }

  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 对单个数据请求的处理
          if (config.interceptors?.responseInterceptor) {
            config = config.interceptors.responseInterceptor(res);
          }
          // 加载动画设置，不影响下一次加载
          this.showLoading = DEFAULT_LOADING;
          //返回结果
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  put<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
}

export default HYRequest;
