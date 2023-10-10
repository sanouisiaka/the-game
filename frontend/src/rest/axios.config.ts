import axios, { Axios, AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react'

export interface HttpClient {
  get<T>(uri: string): Promise<T>;

  post<T = any, D = any, U = any>(uri: string, data?: D, header?: U): Promise<T>;

  patch<T, D>(uri: string, data: D): Promise<T>;

  delete<T, D>(uri: string, data?: D): Promise<T>;
}

export class AxiosInstance implements HttpClient {

  instance: Axios;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });

    this.instance.interceptors.request.use(async function (config) {
      const session = await getSession();
      if (session !== null) {
        // @ts-ignore
        config.headers['Authorization'] = `Bearer ${session.id_token}`

      }
      return config;
    });
  }


  get<T>(uri: string): Promise<T> {
    return this.instance.get(uri)
  }

  post<T, D, U>(uri: string, data?: D, header?: U): Promise<T> {
    return this.instance.post(uri, data, header as AxiosRequestConfig);
  }

  patch<T, D>(uri: string, data: D): Promise<T> {
    return this.instance.patch(uri, data);
  }

  delete<T, D>(uri: string, data?: D): Promise<T> {
    return this.instance.delete(uri, { data });
  }

}

export const AXIOS_HTTP_CLIENT = Symbol('AXIOS_HTTP_CLIENT');

