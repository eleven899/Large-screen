import HYRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
// import localCache from "../utils/cache";

//创建HYRequest实例
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  showLoading: false,
  timeout: TIME_OUT,
  // 实现目的每个实例都可以有单独的拦截器
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token
      const token =
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImNvZGVyd2h5Iiwicm9sZSI6eyJpZCI6MSwibmFtZSI6Iui2hee6p-euoeeQhuWRmCJ9LCJpYXQiOjE2NDk2NjEyMDEsImV4cCI6MTY1MjI1MzIwMX0.toqYuwxHBhNkdxpm2xV3s0cS8wAvuvlj1SYjAnaPBt-aHJzzknce7MHAOFptH2c0Lud6AUpsb7zLDEH0DhaR3GXYrLNpUSkeDjwP-IyuW1N6Hs5g6tE9xUJQIRQ-QJpfSu7jO92WBImXnIx39-mxisIs2CAhZbZ7T5tzTP9quHY";
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      // console.log('请求成功的拦截')
      return config;
    },
    requestInterceptorCatch: (error) => {
      // console.log('请求失败的拦截')
      return error;
    },
    responseInterceptor: (res) => {
      // console.log('响应成功的拦截')
      return res.data;
    },
    responseInterceptorCatch: (error) => {
      // console.log('响应失败的拦截')
      return error;
    },
  },
});

export default hyRequest;
