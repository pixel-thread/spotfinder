import axios from 'axios';

import { getToken } from '../storage/token';

const axiosInstance = axios.create({
  baseURL: 'https://jyrwa-parkingi.vercel.app/api/v1',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
