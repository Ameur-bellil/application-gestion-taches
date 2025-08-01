import { Task, TaskStatus } from '../models/task';

let tasks: Task[] = [];
let currentId = 1;

export const taskService = {
  getAll: () => tasks,
  add: (title: string, description: string): Task => {
    const task: Task = {
      id: currentId++,
      title,
      description,
      status: TaskStatus.PENDING,
    };
    tasks.push(task);
    return task;
  },
  delete: (id: number): boolean => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
  updateStatus: (id: number, status: TaskStatus): boolean => {
    const task = tasks.find(t => t.id === id);
    if (!task) return false;
    task.status = status;
    return true;
  }
};
