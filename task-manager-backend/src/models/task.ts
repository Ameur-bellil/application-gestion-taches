export enum TaskStatus {
  PENDING = 'pending',
  DONE = 'done',
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
