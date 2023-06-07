import api from "@/libs/api";
import { LoginForm } from "@/types/login.type";

export const login = async (loginForm: LoginForm) => {
  const { data } = await api.post(`/login`, loginForm);

  return data;
};
