import axios from 'axios';
import { getSession } from 'next-auth/react'


export const axiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  instance.interceptors.request.use(async function (config) {
    const session = await getSession();
    if (session !== null) {
      config.headers['Authorization'] = `Bearer ${session.id_token}`

    }
    return config;
  });

  return instance;
}

export default axiosInstance()

