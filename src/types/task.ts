export type TaskColor =
  | "none"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "purple"
  | "pink"
  | "brown";

export interface Task {
  id: string;
  title: string;
  color: TaskColor;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDto {
  title: string;
  color: TaskColor;
}

export interface UpdateTaskDto {
  title?: string;
  color?: TaskColor;
  completed?: boolean;
}
