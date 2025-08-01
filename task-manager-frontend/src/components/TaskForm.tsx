import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { CreateTaskSchema, CreateTaskInput } from '../types/task';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { cn } from '../lib/utils';

interface TaskFormProps {
  onSubmit: (data: CreateTaskInput) => void;
  isLoading?: boolean;
}

export const TaskForm = ({ onSubmit, isLoading }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(CreateTaskSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const handleFormSubmit = (data: CreateTaskInput) => {
    onSubmit(data);
    reset();
  };

  return (
      <Card className="bg-gradient-card border-border/50 shadow-soft">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-card-foreground">
            <Plus className="w-5 h-5 text-primary" />
            Ajouter une nouvelle tâche
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-card-foreground">
                Titre de la tâche *
              </Label>
              <Input
                  id="title"
                  {...register('title')}
                  placeholder="Ex: Réceptionner et centraliser les candidatures..."
                  className={cn(
                      "transition-all duration-200",
                      errors.title && "border-destructive focus-visible:ring-destructive"
                  )}
                  disabled={isLoading}
              />
              {errors.title && (
                  <p className="text-xs text-destructive animate-fade-in">
                    {errors.title.message}
                  </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-card-foreground">
                Description (optionnelle)
              </Label>
              <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Décrivez les détails de cette tâche..."
                  rows={3}
                  className={cn(
                      "transition-all duration-200 resize-none",
                      errors.description && "border-destructive focus-visible:ring-destructive"
                  )}
                  disabled={isLoading}
              />
              {errors.description && (
                  <p className="text-xs text-destructive animate-fade-in">
                    {errors.description.message}
                  </p>
              )}
            </div>

            <Button
                type="submit"
                disabled={!isValid || isLoading}
                className={cn(
                    "w-full bg-gradient-primary hover:opacity-90 transition-all duration-200",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
            >
              {isLoading ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Création en cours...
                  </>
              ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Créer la tâche
                  </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
  );
};