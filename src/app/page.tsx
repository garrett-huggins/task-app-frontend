import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import plusIcon from "../../public/icons/plus.svg";
import { getTasks } from "@/api/tasks";
import { TaskTable } from "@/components/tasks/table";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="container mx-auto px-4">
      <CreateTaskButton />
      <TaskTable tasks={tasks} />
    </main>
  );
}

const CreateTaskButton = () => (
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
);
