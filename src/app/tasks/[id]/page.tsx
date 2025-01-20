"use client";

import { useEffect, useState, use } from "react";
import { TaskForm } from "@/components/tasks/form";
import { getTaskById } from "@/api/tasks";
import { Task } from "@/types/task";
import { redirect } from "next/navigation";

export default function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch task by id on mount
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
    <main className="container mx-auto px-4 pt-20">
      <TaskForm />;
    </main>;
  }

  if (!loading && task) {
    return (
      <main className="container mx-auto px-4 pt-20">
        <TaskForm currentTask={task} />
      </main>
    );
  }

  // Redirect to home if task not found
  if (!loading && !task) {
    redirect("/");
  }
}
