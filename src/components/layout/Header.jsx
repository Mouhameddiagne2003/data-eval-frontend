import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, PlusCircle, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/assets/data_eval_logo.webp'

const Header = ({ userType}) => {
    // Action button configuration based on user type
    const actionButton = React.useMemo(() => {
        const actions = {
            professor: {
                icon: PlusCircle,
                label: 'Créer un Examen',
                path: '/professor/create-exam',
            },
            student: {
                icon: FileText,
                label: 'Voir mes Examens',
                path: '/student/exams',
            },
            admin: {
                icon: Users,
                label: 'Gérer les Utilisateurs',
                path: '/admin/users',
            }
        };

        return actions[userType];
    }, [userType]);

    // Get user initials for avatar
    const userInitials = React.useMemo(() => {
        const names = {
            professor: 'MD',
            student: 'AD',
            admin: 'AD'
        };

        return names[userType] || 'MD';
    }, [userType]);

    const ActionButton = () => {
        const Icon = actionButton.icon;
        return (
            <Button
                className="hidden sm:!flex bg-data-teal text-white hover:!bg-border-dark cursor-pointer"
                as={Link}
                to={actionButton.path}
            >
                <Icon className="mr-2 h-4 w-4" />
                {actionButton.label}
            </Button>
        );
    };

    return (
        <header className="border-b border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark backdrop-blur-sm shadow-sm sticky top-0 z-10">
            <div className="container px-4 py-3 mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="relative w-8 h-8 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient rounded-full animate-pulse-slow"></div>
                            <img
                                src={logo}
                                alt="DATA-EVAL Logo"
                                className="relative z-10 w-full h-full object-contain p-0.5"
                            />
                        </div>
                        <span className="text-lg font-bold text-data-blue dark:text-white">
              DATA-<span className="text-data-teal">EVAL</span>
            </span>
                    </Link>
                </div>

                <div className="flex items-center space-x-2 sm:!space-x-4">
                    <div className="relative hidden sm:!block w-full sm:w-auto">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Rechercher..."
                            className="w-full pl-9 sm:w-64 rounded-md"
                        />
                    </div>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-data-teal rounded-full"></span>
                    </Button>
                    <ActionButton />
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-data-light-blue text-white flex items-center justify-center">
                            {userInitials}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;