import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FilePlus,
    FileText,
    Users,
    BarChart3,
    Settings,
    History,
    GraduationCap,
    Key,
    LogOut
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { logout } from "@/services/authService.js";
import { useAuthStore } from "@/store/auth.js";


const Sidebar = ({ userType }) => {
    const location = useLocation();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const isMobile = useIsMobile();
    const { logout: logoutToStore } = useAuthStore();
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
                { icon: GraduationCap, label: 'Professeurs', path: '/admin/professors' },
                { icon: Users, label: 'Utilisateurs', path: '/admin/users' },
                { icon: Key, label: 'Rôles & Professeurs', path: '/admin/roles' },
                { icon: FileText, label: 'Examens & Soumissions', path: '/admin/exams' },
                { icon: BarChart3, label: 'Rapports', path: '/admin/reports' },
                { icon: Settings, label: 'Paramètres & Sécurité', path: '/admin/settings' }
            ]
        };

        return items[userType] ;
    }, [userType]);

    const settingsItem = {
        icon: Settings,
        label: 'Paramètres',
        path: `/${userType}/settings`
    };

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
                        <Menu className="" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pt-6 w-64 bg-white text-sidebar-foreground">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
        )
    );
    const handleLogout = async () => {
        // Close the dialog
        setIsConfirmOpen(false)

        await logout();

        logoutToStore();
    }
    // Sidebar content for both mobile and desktop
    const SidebarContent = () => (
        <div className="p-4 fixed space-y-6 h-screen flex flex-col">
            <div className="space-y-1">
                {menuItems.map((item, index) => (
                    <MenuItem key={index} icon={item.icon} label={item.label} path={item.path}/>
                ))}
            </div>

            <div className="border-t border-border-light dark:border-border-dark pt-4">
                <MenuItem icon={settingsItem.icon} label={settingsItem.label} path={settingsItem.path}/>
            </div>

        {/*    c un element de mon sidebar  <div className="flex items-center space-x-3 cursor-pointer">*/}
        {/*    <div className="h-10 w-10 rounded-full overflow-hidden">*/}
        {/*        <img*/}
        {/*            src={userInfo.avatar}*/}
        {/*            alt="Profile"*/}
        {/*            className="h-full w-full object-cover"*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*        <div className="font-medium text-sm">{userInfo.name}</div>*/}
        {/*        <div className="text-xs text-sidebar-foreground/70">{userInfo.role}</div>*/}
        {/*    </div>*/}
        {/*</div> c est le bas du sidebar concernant l avatar et nom professeur je veux si on clique labas qu il y ait deconnexion et si on clique y a demande de confirmation . fais un beau desig et propose autre menu aussi a part deconnexion si necessaire*/}

            <div className="flex pb-64 items-center space-x-3 cursor-pointer bg-white">
                <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                    <Button
                        variant="ghost"
                        className="w-auto justify-start text-sidebar-foreground hover:!bg-sidebar-accent hover:!text-sidebar-accent-foreground cursor-pointer"
                        onClick={() => setIsConfirmOpen(true)}
                    >
                        <LogOut className="mr-2 h-5 w-5"/>
                        <span>Déconnexion</span>
                    </Button>
                    <DialogContent className="sm:!max-w-[425px] bg-white ">
                        <DialogHeader>
                            <DialogTitle>Confirmer la déconnexion</DialogTitle>
                            <DialogDescription>Êtes-vous sûr de vouloir vous déconnecter de votre compte
                                ?</DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex space-x-2 justify-end">
                            <Button variant="outline" className="cursor-pointer" onClick={() => setIsConfirmOpen(false)}>
                                Annuler
                            </Button>
                            <Button variant="destructive" onClick={handleLogout} className="cursor-pointer">
                                Déconnexion
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Trigger */}
            <MobileTrigger/>

            {/* Desktop Sidebar */}
            <aside
                className="w-64 border-r border-border-light dark:border-border-dark hidden md:!block flex-shrink-0 bg-sidebar-background text-sidebar-foreground">
                <SidebarContent/>
            </aside>
        </>
    );
};

export default Sidebar