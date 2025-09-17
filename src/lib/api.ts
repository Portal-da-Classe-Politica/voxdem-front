import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const createApiClient = (baseURL: string, timeout: number = 10000): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  return client;
};

export const voxdemApi = createApiClient(
  process.env.NEXT_PUBLIC_VOXDEM_API_URL || 'http://localhost:3001/api'
);