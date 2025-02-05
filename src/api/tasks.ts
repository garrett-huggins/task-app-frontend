"use server";

import { Task, CreateTaskDto, UpdateTaskDto } from "@/types/task";

const BASE_API = process.env.API_URL;

interface Error {
  error: string;
  errors: {
    defaultMessage: string;
  }[];
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${BASE_API}/tasks`);
  const data = await response.json();
  return data;
};

export const getTaskById = async (id: number): Promise<Task> => {
  const response = await fetch(`${BASE_API}/tasks/${id}`);
  const data = await response.json();
  return data;
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
  const data: Task | Error = await response.json();

  if ("error" in data) {
    return { error: data.errors.map((e) => e.defaultMessage) };
  } else {
    return data;
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
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data: Task | Error = await response.json();

  if ("error" in data) {
    return { error: data.errors.map((e) => e.defaultMessage) };
  } else {
    return data;
  }
};
