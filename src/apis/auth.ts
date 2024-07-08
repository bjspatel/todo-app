import axiosInstance from "./axios";
import {
  LoginRequestDto,
  RegisterRequestDto,
  TokenDto,
  UserDto,
} from "./types";

const login = async (requestDto: LoginRequestDto): Promise<string> => {
  try {
    const { data } = await axiosInstance.post("/auth/login", requestDto);
    const { token } = data as TokenDto;
    return token;
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

const register = async (requestDto: RegisterRequestDto): Promise<UserDto> => {
  try {
    const { data } = await axiosInstance.post("/auth/register", requestDto);
    const user = data as UserDto;
    return user;
  } catch (error) {
    throw new Error("Bad Request");
  }
};

export const auth = {
  login,
  register,
};
