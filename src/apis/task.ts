import axiosInstance from "./axios";
import { TaskDto } from "./types";

const create = async (name: string, userId: string): Promise<void> => {
  try {
    await axiosInstance.post("/tasks", { name, userId });
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

export const task = { create, list };
