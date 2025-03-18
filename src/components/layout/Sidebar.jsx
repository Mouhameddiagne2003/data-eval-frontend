import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FilePlus, FileText, Users, BarChart3, Settings, History } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Sidebar = ({ userType }) => {
    const location = useLocation();
    const isMobile = useIsMobile();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    // Define menu items based on user type
    const menuItems = React.useMemo(() => {
        const items = {
            professor: [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/professor' },
                { icon: FilePlus, label: 'Créer un examen', path: '/professor/create-exam' },
                { icon: FileText, label: 'Examens', path: '/professor/exams' },
                { icon: BarChart3, label: 'Rapports', path: '/professor/reports' },
            ],
            student: [
                { icon: FileText, label: 'Examens disponibles', path: '/student' },
                { icon: BarChart3, label: 'Mes résultats', path: '/student/results' },
                { icon:  History, label: 'Mon historique', path: '/student/history' },
            ],
            admin: [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
                { icon: Users, label: 'Utilisateurs', path: '/admin/users' },
                { icon: FileText, label: 'Examens', path: '/admin/exams' },
                { icon: BarChart3, label: 'Rapports', path: '/admin/reports' },
            ]
        };

        return items[userType] ;
    }, [userType]);

    const settingsItem = {
        icon: Settings,
        label: 'Paramètres',
        path: `/${userType}/settings`
    };

    // User information based on user type
    const userInfo = React.useMemo(() => {
        const info = {
            professor: {
                name: 'M. Verstappen',
                role: 'Professeur',
                avatar: '/lovable-uploads/a5842e6e-3e6c-4bf6-b439-2dd54ebf584b.png'
            },
            student: {
                name: 'A. Dupont',
                role: 'Étudiant',
                avatar: '/api/placeholder/32/32'
            },
            admin: {
                name: 'Admin',
                role: 'Administrateur',
                avatar: '/api/placeholder/32/32'
            }
        };

        return info[userType] || info.professor;
    }, [userType]);

    // Sidebar menu item component
    const MenuItem = ({ icon: Icon, label, path }) => {
        const isActive = location.pathname === path;
        return (
            <Link
                to={path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                    isActive
                        ? 'bg-data-light-blue text-data-blue font-medium'
                        : 'hover:!bg-data-light-blue/20 hover:!text-data-blue'
                }`}
                onClick={() => isMobile && setSidebarOpen(false)}
            >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
            </Link>
        );
    };

    // Mobile sidebar trigger
    const MobileTrigger = () => (
        isMobile && (
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:!hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64 bg-sidebar-background text-sidebar-foreground">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
        )
    );

    // Sidebar content for both mobile and desktop
    const SidebarContent = () => (
        <div className="p-4 space-y-6 h-full flex flex-col">
            <div className="space-y-1">
                {menuItems.map((item, index) => (
                    <MenuItem key={index} icon={item.icon} label={item.label} path={item.path} />
                ))}
            </div>

            <div className="border-t border-border-light dark:border-border-dark pt-4">
                <MenuItem icon={settingsItem.icon} label={settingsItem.label} path={settingsItem.path} />
            </div>

            <div className="mt-auto p-4 border-t border-border-light dark:border-border-dark">
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                            src={userInfo.avatar}
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="font-medium text-sm">{userInfo.name}</div>
                        <div className="text-xs text-sidebar-foreground/70">{userInfo.role}</div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Trigger */}
            <MobileTrigger />

            {/* Desktop Sidebar */}
            <aside className="w-56 border-r border-border-light dark:border-border-dark hidden md:!block flex-shrink-0 bg-sidebar-background text-sidebar-foreground">
                <SidebarContent />
            </aside>
        </>
    );
};

export default Sidebar