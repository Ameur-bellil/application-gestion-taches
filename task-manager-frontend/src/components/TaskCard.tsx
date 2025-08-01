import { memo } from 'react';
import { Clock, Check, Trash2 } from 'lucide-react';
import { Task, TaskStatus } from '../types/task';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (task: Task) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const TaskCard = memo(({ task, onToggleStatus, onDelete, isLoading }: TaskCardProps) => {
  const isCompleted = task.status === TaskStatus.DONE;

  return (
    <Card className={cn(
      "group transition-all duration-300 hover:shadow-medium bg-gradient-card border-border/50",
      "hover:border-primary/20 hover:-translate-y-1",
      isCompleted && "opacity-75"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className={cn(
              "text-lg font-semibold text-card-foreground transition-colors",
              isCompleted && "line-through text-muted-foreground"
            )}>
              {task.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant={isCompleted ? "secondary" : "outline"}
                className={cn(
                  "transition-colors text-xs font-medium",
                  isCompleted 
                    ? "bg-success/10 text-success border-success/20" 
                    : "bg-task-pending/10 text-task-pending border-task-pending/20"
                )}
              >
                {isCompleted ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Terminée
                  </>
                ) : (
                  <>
                    <Clock className="w-3 h-3 mr-1" />
                    En cours
                  </>
                )}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      {task.description && (
        <CardContent className="pt-0 pb-4">
          <p className={cn(
            "text-sm text-muted-foreground leading-relaxed",
            isCompleted && "line-through opacity-75"
          )}>
            {task.description}
          </p>
        </CardContent>
      )}

      <CardContent className="pt-0 pb-4">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleStatus(task)}
            disabled={isLoading}
            className={cn(
              "transition-colors text-xs font-medium",
              isCompleted 
                ? "text-muted-foreground hover:text-task-pending" 
                : "text-task-pending hover:text-success"
            )}
          >
            {isCompleted ? (
              <>
                <Clock className="w-4 h-4 mr-1" />
                Reprendre
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-1" />
                Terminer
              </>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            disabled={isLoading}
            className="text-muted-foreground hover:text-destructive transition-colors text-xs"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

TaskCard.displayName = 'TaskCard';