import axiosInstance from "./axios";
import { TaskDto, CreateTaskRequestDto } from "./types";

const create = async (requestDto: CreateTaskRequestDto): Promise<void> => {
  try {
    await axiosInstance.post("/tasks", requestDto);
  } catch (error) {
    throw new Error("Failed to create a task");
  }
};

const list = async (): Promise<TaskDto[]> => {
  try {
    const { data } = await axiosInstance.get(`/tasks`);
    return data as TaskDto[];
  } catch (error) {
    throw new Error("Failed to list tasks");
  }
};

const update = async (
  id: string,
  requestDto: Partial<CreateTaskRequestDto>
): Promise<void> => {
  try {
    await axiosInstance.put(`/tasks/${id}`, requestDto);
  } catch (error) {
    throw new Error("Failed to update a task");
  }
};

export const task = { create, list, update };
