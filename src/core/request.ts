import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import Apis from 'api/Apis';

/**
 * 创建 axios 实例
 * */
const instance = axios.create({
  baseURL: 'http://192.168.50.98:7001/',
  timeout: 30 * 1000, // 30秒超时
});

/**
 * 配置异常重试
 * */
axiosRetry(instance, { retries: 3, retryDelay: (retryCount) => retryCount * 1000 });

/**
 * 对返回体错误信息分类
 */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      const { status } = response;
      if (status >= 500) {
        // 服务端报错
        console.error('500');
      } else if (status === 400) {
        // 接口参数异常
        console.error('400');
      } else if (status === 401) {
        // 登陆信息过期，需要重新登陆
        console.error('401');
      } else {
        // 其它错误类型，统一按照接口报错处理
        console.error('others');
      }
    } else {
      // 网络异常
      console.error('no response:', error);
    }
    return Promise.reject(error);
  }
);

export const request = <T>(name: string, params: any): Promise<AxiosResponse<T, any>> => {
  const api = (Apis as any)[name];
  const { url, method } = api;
  if (method === 'get') {
    return get<T>(url, params);
  } else {
    return post<T>(url, params);
  }
};

export const get = <T>(url: string, params: any): Promise<AxiosResponse<T, any>> => {
  return instance.get(url, {
    params: params,
  });
};

export const post = <T>(url: string, params: any): Promise<AxiosResponse<T, any>> => {
  return instance.post(url, params);
};
