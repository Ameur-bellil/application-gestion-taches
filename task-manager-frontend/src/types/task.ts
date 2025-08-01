import { z } from 'zod';

export enum TaskStatus {
  PENDING = 'pending',
  DONE = 'done',
}

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Le titre est requis').max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  description: z.string().max(500, 'La description ne peut pas dépasser 500 caractères').optional().default(''),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.PENDING),
});

export const CreateTaskSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  description: z.string().max(500, 'La description ne peut pas dépasser 500 caractères'),
});

export const UpdateTaskSchema = TaskSchema.partial().required({ id: true });

export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;