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

const logout = async (): Promise<void> => {
  await axiosInstance.post("/auth/logout");
};

const refreshAccessToken = async (): Promise<string> => {
  try {
    const { data } = await axiosInstance.get("/auth/refresh-token");
    const { token } = data as TokenDto;
    return token;
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

export const auth = {
  login,
  logout,
  refreshAccessToken,
};
