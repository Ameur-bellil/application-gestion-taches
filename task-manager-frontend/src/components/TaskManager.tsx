import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { fetchTasks, createTask, deleteTask, updateStatus } from '../services/taskService';
import { CreateTaskInput, Task } from '../types/task';
import { useToast } from '../hooks/use-toast';
import { useEffect, useState } from 'react';

export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les tâches.",
          variant: "destructive",
        });
      }
    };

    loadTasks();
  }, [toast]);

  const handleCreateTask = async (taskData: CreateTaskInput) => {
    try {
      const newTask = await createTask({
        title: taskData.title,
        description: taskData.description || ''
      });
      setTasks([newTask, ...tasks]);
      toast({
        title: "Tâche créée",
        description: `"${newTask.title}" a été ajoutée avec succès.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la tâche.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
      toast({
        title: "Tâche supprimée",
        description: "La tâche a été supprimée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la tâche.",
        variant: "destructive",
      });
    }
  };

  const handleToggleStatus = async (task: Task) => {
    try {
      const newStatus = task.status === 'pending' ? 'done' : 'pending' as const;
      await updateStatus(task.id, newStatus);
      const updatedTasks = tasks.map(t =>
          t.id === task.id ? { ...t, status: newStatus } : t
      ) as Task[];
      setTasks(updatedTasks);
      const statusText = newStatus === 'done' ? 'terminée' : 'en cours';
      toast({
        title: "Statut mis à jour",
        description: `"${task.title}" est maintenant ${statusText}.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de changer le statut.",
        variant: "destructive",
      });
    }
  };

  return (
      <div className="space-y-8 animate-fade-in">
        <TaskForm onSubmit={handleCreateTask} />
        <TaskList
            tasks={tasks}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDeleteTask}
        />
      </div>
  );
};