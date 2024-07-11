export type LoginRequestDto = {
  email: string;
  password: string;
};

export type RegisterRequestDto = {
  email: string;
  name: string;
  password: string;
};

export type UserDto = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};

export type TaskDto = {
  id: string;
  name: string;
  userId: string;
};

export type TokenDto = {
  userId: string;
  accessToken: string;
};
