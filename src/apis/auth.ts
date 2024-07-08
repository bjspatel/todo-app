import axios from "./axios";
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  UserDto,
} from "./types";

export const login = async (requestDto: LoginRequestDto): Promise<string> => {
  try {
    const { data } = await axios.post("/auth/login", requestDto);
    const { token } = data as LoginResponseDto;
    return token;
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

export const register = async (
  requestDto: RegisterRequestDto
): Promise<UserDto> => {
  try {
    const { data } = await axios.post("/auth/register", requestDto);
    const user = data as UserDto;
    return user;
  } catch (error) {
    throw new Error("Bad Request");
  }
};
