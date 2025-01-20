"use server";

import { Task, CreateTaskDto, UpdateTaskDto } from "@/types/task";

const BASE_API = process.env.API_URL;

interface TaskResponse {
  task: Task;
}
interface Error {
  error: {
    message: string;
  }[];
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${BASE_API}/tasks`);
  const data = await response.json();
  return data.tasks;
};

export const getTaskById = async (id: number): Promise<Task> => {
  const response = await fetch(`${BASE_API}/tasks/${id}`);
  const data = await response.json();
  return data.task;
};

export const deleteTask = async (id: number) => {
  const response = await fetch(`${BASE_API}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
};

export const createTask = async (task: CreateTaskDto) => {
  const response = await fetch(`${BASE_API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data: TaskResponse | Error = await response.json();

  if ("task" in data) {
    return data.task;
  } else {
    return { error: data.error.map((e) => e.message) };
  }
};

export const updateTask = async ({
  id,
  task,
}: {
  id: number;
  task: UpdateTaskDto;
}) => {
  const response = await fetch(`${BASE_API}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data: TaskResponse | Error = await response.json();

  if ("task" in data) {
    return data.task;
  } else {
    return { error: data.error.map((e) => e.message) };
  }
};
