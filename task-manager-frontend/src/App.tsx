import { useEffect } from "react";
import { Toaster as Sonner, toast } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { TooltipProvider } from "./components/ui/tooltip";

const App = () => {
    useEffect(() => {
        const handleServerDown = () => {
            toast.error("Le serveur est actuellement indisponible.");
        };

        window.addEventListener("server-down", handleServerDown);
        return () => window.removeEventListener("server-down", handleServerDown);
    }, []);

    return (
        <TooltipProvider>
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    );
};

export default App;
