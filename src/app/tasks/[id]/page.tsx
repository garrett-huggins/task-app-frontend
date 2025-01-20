"use client";

import { useEffect, useState, use } from "react";
import { TaskForm } from "@/components/tasks/form";
import { getTaskById } from "@/api/tasks";
import { Task } from "@/types/task";

export default function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const currentTask = await getTaskById(Number(id));
        setTask(currentTask);
      } catch {
        setTask(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="container mx-auto px-4 pt-20">
      {task ? <TaskForm currentTask={task} /> : <p>Task not found</p>}
    </main>
  );
}
