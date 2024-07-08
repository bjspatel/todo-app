import axiosInstance from "./axios";
import { UserDto } from "./types";

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
};
