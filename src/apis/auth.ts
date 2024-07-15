import axiosInstance from "./axios";
import { LoginRequestDto, AuthDto, UpdatePasswordRequestDto } from "./types";

const login = async (requestDto: LoginRequestDto): Promise<AuthDto> => {
  try {
    console.log("Request dto: ", requestDto);
    const { data } = await axiosInstance.post("/auth/login", requestDto);
    return data as AuthDto;
  } catch (error) {
    console.log("Acios err: ", error);
    throw new Error("Unauthorized");
  }
};

const logout = async (): Promise<void> => {
  await axiosInstance.post("/auth/logout");
};

const refreshAccessToken = async (): Promise<AuthDto> => {
  try {
    const { data } = await axiosInstance.get("/auth/refresh-token");
    return data as AuthDto;
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

const updatePassword = async (
  requestDto: UpdatePasswordRequestDto
): Promise<void> => {
  try {
    await axiosInstance.put("/auth/password", requestDto);
  } catch (error) {
    throw new Error("Failed to update password");
  }
};

export const auth = {
  login,
  logout,
  refreshAccessToken,
  updatePassword,
};
