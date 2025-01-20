import { Metadata } from "next";
import { TaskForm } from "@/components/tasks/form";

export const metadata: Metadata = {
  title: "Todo App | Create Task",
};

export default function CreateTaskPage() {
  return (
    <main className="container mx-auto px-4 pt-20">
      <TaskForm />
    </main>
  );
}
