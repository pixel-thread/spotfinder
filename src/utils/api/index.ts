import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jyrwa-parkingi.vercel.app/api/v1',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
