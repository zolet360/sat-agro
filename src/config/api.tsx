import axios, { AxiosInstance } from "axios";

const API_URL = "http://localhost:3001/api";

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiFormData: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
