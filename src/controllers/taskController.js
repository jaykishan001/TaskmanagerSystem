import connectDB from "@/lib/db";
import Task from "@/models/task";

export async function createTask(data) {
  await connectDB();
  const newTask = new Task(data);
  await newTask.save();
  return newTask;
}
