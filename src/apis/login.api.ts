import api from "@/libs/api";
import { LoginFormData } from "@/types/login.type";

export const login = async (loginFormData: LoginFormData) => {
  const { data } = await api.post(`/login`, loginFormData);

  return data;
};
