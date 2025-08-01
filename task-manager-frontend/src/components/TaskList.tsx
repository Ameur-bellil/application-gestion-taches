import { useMemo } from 'react';
import { TaskCard } from './TaskCard';
import { Task } from '../types/task';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card';
import { Separator } from './ui/separator';
import { CheckCircle, Clock, BarChart3 } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (task: Task) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const TaskList = ({ tasks, onToggleStatus, onDelete, isLoading }: TaskListProps) => {
  const { pendingTasks, completedTasks, totalTasks, pendingCount, completedCount, completionRate } = useMemo(() => {
    const pending = tasks.filter(task => task.status === 'pending');
    const completed = tasks.filter(task => task.status === 'done');
    const total = tasks.length;
    const rate = total > 0 ? Math.round((completed.length / total) * 100) : 0;

    return {
      pendingTasks: pending,
      completedTasks: completed,
      totalTasks: total,
      pendingCount: pending.length,
      completedCount: completed.length,
      completionRate: rate
    };
  }, [tasks]);

  if (tasks.length === 0) {
    return (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Aucune tâche</h3>
          <p className="text-muted-foreground">Commencez par créer votre première tâche.</p>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Dashboard */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="h-5 w-5" />
              Tableau de bord
            </CardTitle>
            <CardDescription>
              Vue d'ensemble de vos tâches et de votre progression
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{totalTasks}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
                <div className="text-sm text-muted-foreground">En cours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-muted-foreground">Terminées</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{completionRate}%</div>
                <div className="text-sm text-muted-foreground">Complétées</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-orange-600" />
                <h2 className="text-xl font-semibold text-foreground">
                  Tâches en cours ({pendingCount})
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pendingTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onToggleStatus={onToggleStatus}
                        onDelete={onDelete}
                    />
                ))}
              </div>
            </div>
        )}

        {/* Separator */}
        {pendingTasks.length > 0 && completedTasks.length > 0 && (
            <Separator className="my-6" />
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-semibold text-foreground">
                  Tâches terminées ({completedCount})
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {completedTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onToggleStatus={onToggleStatus}
                        onDelete={onDelete}
                    />
                ))}
              </div>
            </div>
        )}
      </div>
  );
};