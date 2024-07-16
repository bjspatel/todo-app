export type LoginRequestDto = {
  email: string;
  password: string;
};

export type UpdatePasswordRequestDto = {
  currentPassword: string;
  newPassword: string;
};

export type UpdateTaskRequestDto = {
  name?: string;
  isDone?: boolean;
  progress?: number;
  dueAt?: number;
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

export type TaskProgressValue = 0 | 25 | 50 | 75 | 100;

export type CreateTaskRequestDto = {
  name: string;
  progress: number;
  dueAt?: number;
};

export type TaskDto = {
  id: string;
  name: string;
  userId: string;
  isDone: boolean;
  progress: TaskProgressValue;
  dueAt: number;
  createdAt: number;
  updatedAt: number;
};
