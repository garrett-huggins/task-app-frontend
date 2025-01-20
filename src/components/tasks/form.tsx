"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BackButton } from "../ui/back-button";
import plusIcon from "../../../public/icons/plus.svg";
import checkIcon from "../../../public/icons/check.svg";
import { useRouter } from "next/navigation";
import { TaskColor, Task } from "@/types/task";
import { createTask, updateTask } from "@/api/tasks";
import { ColorSelect } from "@/components/tasks/color-select";

const colors: TaskColor[] = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

export const TaskForm = ({ currentTask }: { currentTask?: Task }) => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<TaskColor>(
    currentTask?.color || "none"
  );
  const [title, setTitle] = useState<string>(currentTask?.title || "");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const color = selectedColor || "none";

    const taskData = { title, color };
    const res = currentTask
      ? await updateTask({ id: Number(currentTask.id), task: taskData })
      : await createTask(taskData);

    if ("error" in res) {
      setFormError(res.error[0]);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (title && formError) {
      setFormError(null);
    }
  }, [title, formError]);

  return (
    <div>
      <BackButton />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <label htmlFor="title" className="text-primary font-bold">
          Title
        </label>
        {formError && (
          <p className="text-red-500 font-bold">Title is required</p>
        )}
        <input
          type="text"
          name="title"
          defaultValue={currentTask ? currentTask.title : ""}
          className="w-full rounded-lg p-4 bg-background-muted"
          onChange={(e) => setTitle(e.target.value)}
          style={{
            border: formError ? "2px solid var(--tag-red)" : "",
          }}
          placeholder={currentTask ? currentTask.title : "Enter task title"}
        />

        {/* Color Select */}
        <label htmlFor="color" className="text-primary font-bold">
          Color
        </label>
        <div className="flex gap-2">
          {colors.map((color) => (
            <ColorSelect
              key={color}
              color={color}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              currentTask={currentTask}
            />
          ))}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          icon={
            <Image
              src={currentTask ? checkIcon : plusIcon}
              alt="Create Task Plus Icon"
              width={24}
              height={24}
            />
          }
          className="py-4 w-full rounded-lg font-bold"
        >
          {currentTask ? "Save" : "Add Task"}
        </Button>
      </form>
    </div>
  );
};
