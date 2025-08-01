import express from 'express';
import { z } from 'zod';
import { taskService } from '../services/taskService';
import { TaskStatus } from '../models/task';

const router = express.Router();

const taskSchema = z.object({
  title: z.string(),
  description: z.string()
});

router.get('/', (_, res) => {
  res.json(taskService.getAll());
});

router.post('/', (req, res) => {
  const result = taskSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error);
  const { title, description } = result.data;
  const task = taskService.add(title, description);
  res.status(201).json(task);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (taskService.delete(id)) res.status(204).end();
  else res.status(404).json({ error: 'Task not found' });
});

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (status !== 'pending' && status !== 'done') {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const newStatus = status === 'pending' ? TaskStatus.PENDING : TaskStatus.DONE;

  if (taskService.updateStatus(id, newStatus)) {
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

export default router;
