import { LoginDto } from "@/dtos/login.dto";
import api from "@/libs/api";

export const login = async (loginDto: LoginDto) => {
  const { data } = await api.post(`/login`, loginDto);

  return data;
};
