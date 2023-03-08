import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'antd';

const instance = axios.create({
  baseURL: '/',
  timeout: 10000,
});

instance.interceptors.response.use(
  (res) => {
    const {
      data: { code, data, message },
    } = res;

    if (code !== 0) {
      message.error(message ?? '接口异常');

      return Promise.reject({
        message: message ?? '接口异常',
        raw: res.data,
      });
    }

    return data;
  },
  (error) => {
    message.error(error.message ?? '接口异常');

    return Promise.reject(error);
  },
);

function request(config: AxiosRequestConfig) {
  return instance(config);
}

request.post = function post<T>(config: Omit<AxiosRequestConfig, 'method'>) {
  return instance<unknown, T>({
    method: 'post',
    ...config,
  });
};

request.get = function get<T>(config: Omit<AxiosRequestConfig, 'method'>) {
  return instance<unknown, T>({
    method: 'get',
    ...config,
  });
};

export default request;
