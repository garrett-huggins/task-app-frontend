"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import arrowLeftIcon from "../../../public/icons/arrow-left.svg";
import plusIcon from "../../../public/icons/plus.svg";
import checkIcon from "../../../public/icons/check.svg";
import { useRouter } from "next/navigation";
import { TaskColor, Task } from "@/types/task";
import { createTask, updateTask } from "@/api/tasks";

export const TaskForm = ({ currentTask }: { currentTask?: Task }) => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<TaskColor>();
  const [title, setTitle] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // type safe form data
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const color = formData.get("color")
      ? (formData.get("color") as TaskColor)
      : "none";
    if (currentTask) {
      // update task
      const res = await updateTask({
        id: Number(currentTask.id),
        task: { title, color },
      });
      if ("error" in res) {
        setFormError(res.error[0]);
        return;
      }
      router.push("/");
    } else {
      // create new task
      const res = await createTask({ title, color });
      if ("error" in res) {
        if ("error" in res) {
          setFormError(res.error[0]);
          return;
        }
        return;
      }
      router.push("/");
    }
  };

  useEffect(() => {
    if (title && formError) {
      setFormError(null);
    }
    if (currentTask) {
      setSelectedColor(currentTask.color);
    }
  }, [currentTask, title, formError]);

  return (
    <div>
      <button className="hover:bg-gray-100/10 rounded-full">
        <Image
          src={arrowLeftIcon}
          alt="Back Icon"
          width={24}
          height={24}
          onClick={() => router.back()}
        />
      </button>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <label htmlFor="color" className="text-primary font-bold">
          Color
        </label>
        <div className="flex gap-2">
          {colors.map((color) => (
            <label
              key={color}
              className={`cursor-pointer p-2 border-2 rounded-full ${
                selectedColor === color ? "border-white" : "border-transparent"
              }`}
              style={{
                backgroundColor: `var(--tag-${color})`,
                width: "50px",
                height: "50px",
              }}
            >
              <input
                key={color}
                type="radio"
                name="color"
                defaultChecked={
                  currentTask ? currentTask.color === color : false
                }
                value={color}
                onChange={() => setSelectedColor(color)}
                className="hidden"
                aria-label={color.charAt(0).toUpperCase() + color.slice(1)}
              />
            </label>
          ))}
        </div>
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
