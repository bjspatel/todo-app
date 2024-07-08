export type LoginRequestDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  token: string;
};

export type RegisterRequestDto = {
  email: string;
  name: string;
  password: string;
};

export type UserDto = {
  id: number;
  email: string;
  name: string;
  avatar?: string;
};
