import axiosInstance from "./axios";
import { LoginRequestDto, TokenDto } from "./types";

const login = async (requestDto: LoginRequestDto): Promise<string> => {
  try {
    const { data } = await axiosInstance.post("/auth/login", requestDto);
    const { token } = data as TokenDto;
    return token;
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

export const auth = {
  login,
};
