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

export type TokenDto = {
  userId: string;
  token: string;
};
