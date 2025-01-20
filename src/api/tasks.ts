"use server";

import { Task, CreateTaskDto, UpdateTaskDto } from "@/types/task";

const BASE_API = "http://localhost:8000/api/v1";

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${BASE_API}/tasks`);
  const data = await response.json();
  return data.tasks;
};

export const getTaskById = async (id: number): Promise<Task> => {
  console.log(`FETCHING: ${BASE_API}/tasks/${id}`);
  const response = await fetch(`${BASE_API}/tasks/${id}`);
  const data = await response.json();
  return data.task;
};

export const deleteTask = async (id: number) => {
  console.log(`${BASE_API}/tasks/${id}`);
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
  const data = await response.json();
  return data.task;
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
  const data = await response.json();
  return data.task;
};
