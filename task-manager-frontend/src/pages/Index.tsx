import { Suspense } from 'react';
import { LoadingSpinner } from '../components/ui/loading-spinner';
import { TaskManager } from '../components/TaskManager';

const Index = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto relative">

                    <img
                        src="/logo-cash-flow-positif.png"
                        alt="Logo"
                        className="w-20 h-20 object-contain absolute top-0 left-0 "
                    />


                    <div className="text-center mb-8 pt-6">
                        <h1 className="text-4xl font-bold text-foreground mb-1 bg-gradient-primary bg-clip-text text-transparent">
                            Gestionnaire de Tâches
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Organisez et suivez vos tâches avec une interface simple et efficace
                        </p>
                    </div>


                    <Suspense
                        fallback={
                            <div className="flex items-center justify-center py-12">
                                <LoadingSpinner size="lg" />
                            </div>
                        }
                    >
                        <TaskManager />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Index;
