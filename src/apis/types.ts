export type LoginRequestDto = {
  email: string;
  password: string;
};

export type UpdatePasswordRequestDto = {
  currentPassword: string;
  newPassword: string;
};

export type AuthDto = {
  user: UserDto;
  accessToken: string;
};

export type RegisterRequestDto = {
  email: string;
  name: string;
  password: string;
};

export type UpdateUserProfile = {
  name: string;
  email: string;
  about: string;
};

export type UserDto = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  about?: string;
};

export type TaskStatus = "to-do" | "in-progress" | "done" | "canceled";

export type CreateTaskRequestDto = {
  name: string;
  status: TaskStatus;
};

export type TaskDto = {
  id: string;
  name: string;
  userId: string;
  status: TaskStatus;
};
