"use client";

import Image from "next/image";
import trashIcon from "../../../public/icons/trash.svg";
import checkIcon from "../../../public/icons/check.svg";
import { useState } from "react";
import { Task } from "@/types/task";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { deleteTask } from "@/api/tasks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateTask } from "@/api/tasks";
import { twMerge } from "tailwind-merge";

export const TaskCard = ({ task }: { task: Task }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    await deleteTask(Number(task.id));
    setShowModal(false);
    router.refresh();
  };

  const handleCheck = async () => {
    await updateTask({
      id: Number(task.id),
      task: { completed: !task.completed },
    });
    router.refresh();
  };

  return (
    <div>
      {/* Task Item */}
      <div className="relative">
        <Link
          href={`/tasks/${task.id}`}
          className="flex gap-4 border border-muted justify-between items-center hover:bg-background-muted/90 bg-background-muted p-4 rounded-lg"
        >
          <p
            className={twMerge(
              "font-bold pl-10",
              task.completed ? "line-through text-muted" : ""
            )}
          >
            {task.title}
          </p>
        </Link>

        {/* absolute position buttons to avoid having buttons inside <a> */}
        <button
          onClick={handleCheck}
          className="w-6 absolute top-4 left-5 h-6 rounded-full flex justify-center items-center"
          style={{
            backgroundColor: task.completed ? `var(--tag-${task.color})` : "",
            border: task.completed
              ? "none"
              : `2px solid var(--tag-${task.color})`,
          }}
        >
          {task.completed && (
            <Image src={checkIcon} alt="Check Icon" width={16} height={16} />
          )}
        </button>
        <button
          className="hover:bg-gray-100/10 rounded-full absolute top-4 right-5"
          onClick={() => setShowModal(true)}
        >
          <Image
            src={trashIcon}
            alt="Delete Task Icon"
            width={26}
            height={26}
          />
        </button>
      </div>
      {/* Delete Task Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <form action={handleDelete} className="flex flex-col gap-4">
          <p className="text-primary font-bold">Are you sure?</p>
          <div className="flex gap-4">
            <Button
              className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-500/80 text-white font-bold"
              type="submit"
            >
              Delete
            </Button>
            <button
              type="button"
              className="w-full py-2 rounded-lg bg-background-muted hover:bg-background-muted/90 font-bold"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
