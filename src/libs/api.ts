import { API_URL } from "@/constants/config.constant";
import { StorageKeyEnum } from "@/enums/storage-key.enum";
import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(StorageKeyEnum.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;
