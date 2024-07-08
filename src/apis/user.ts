import axiosInstance from "./axios";
import { RegisterRequestDto, UserDto } from "./types";

const register = async (requestDto: RegisterRequestDto): Promise<UserDto> => {
  try {
    const { data } = await axiosInstance.post("/users", requestDto);
    const user = data as UserDto;
    return user;
  } catch (error) {
    throw new Error("Bad Request");
  }
};

const getMe = async (): Promise<UserDto> => {
  try {
    const { data } = await axiosInstance.get("/users/me");
    const user = data as UserDto;
    return user;
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

export const user = {
  getMe,
  register,
};
