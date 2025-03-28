import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
            <div className="max-w-md w-full glass-card p-8 rounded-lg text-center space-y-6">
                <div className="flex justify-center">
                    <AlertTriangle size={80} className="text-destructive animate-pulse" />
                </div>

                <h1 className="text-6xl font-bold text-gradient">404</h1>
                <h2 className="text-2xl font-semibold text-foreground">Page non trouvée</h2>

                <p className="text-muted-foreground">
                    La page que vous recherchez n'existe pas ou a été déplacée.
                </p>

                <div className="pt-4">
                    <Button size="lg" className="gap-2 bg-data-teal" asChild>
                        <a href="/" className="text-white">
                            <Home />
                            Retour à l'accueil
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
