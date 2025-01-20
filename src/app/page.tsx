import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/tasks/card";
import plusIcon from "../../public/icons/plus.svg";
import clipboardIcon from "../../public/icons/clipboard.svg";
import { getTasks } from "@/api/tasks";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="container mx-auto px-4">
      <Link href="/tasks/create" as={`/tasks/create`}>
        <Button
          icon={
            <Image
              src={plusIcon}
              alt="Create Task Plus Icon"
              width={24}
              height={24}
            />
          }
          className="-translate-y-1/2 py-4 w-full rounded-lg font-bold"
        >
          Create Task
        </Button>
      </Link>
      {/* Table Details */}
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
      {/* Table */}
      {tasks.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {tasks.map((task, index) => (
            <li key={index}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex border-t border-background-muted  flex-col gap-6 justify-center items-center py-16 px-6">
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
      )}
    </main>
  );
}
