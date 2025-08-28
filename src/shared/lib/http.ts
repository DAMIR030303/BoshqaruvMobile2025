import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const http = axios.create({
  baseURL: process.env.API_URL || 'https://api.example.com',
  timeout: 15000,
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // attach auth token here if needed
  return config;
});

http.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: AxiosError) => {
    // centralized error handling
    return Promise.reject(err);
  }
);
