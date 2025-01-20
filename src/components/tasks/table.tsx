import Image from "next/image";
import clipboardIcon from "../../../public/icons/clipboard.svg";
import { TaskCard } from "@/components/tasks/card";
import { Task } from "@/types/task";

export const TaskTable = ({ tasks }: { tasks: Task[] }) => (
  <>
    <TableDetails tasks={tasks} />
    {tasks.length > 0 ? (
      <ul className="flex flex-col gap-2 pb-10">
        {tasks.map((task, index) => (
          <li key={index}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    ) : (
      <EmptyState />
    )}
  </>
);

const TableDetails = ({ tasks }: { tasks: Task[] }) => (
  <div className="flex justify-between py-8">
    <div>
      <p className="text-primary font-bold">
        Tasks{" "}
        <span className="bg-background-muted text-foreground-muted px-2 py-[2px] rounded-full">
          {tasks.length}
        </span>
      </p>
    </div>
    <div>
      <p className="text-secondary font-bold">
        Completed{" "}
        <span className="bg-background-muted text-foreground-muted px-2 py-[2px] rounded-full">
          {tasks.filter((task) => task.completed).length}
        </span>
      </p>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex border-t border-background-muted flex-col gap-6 justify-center items-center py-16 px-6">
    <Image
      src={clipboardIcon}
      alt="Empty Clipboard Icon"
      width={56}
      height={56}
    />
    <p className="text-muted font-bold text-center">
      You don&apos;t have any tasks registered yet.
    </p>
    <p className="text-muted text-center">
      Create tasks and organize your to-do items.
    </p>
  </div>
);
