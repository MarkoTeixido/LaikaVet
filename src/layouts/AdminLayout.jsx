import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import {
    LayoutDashboard,
    Users,
    FileText,
    Calendar,
    Package,
    BarChart,
    LogOut,
    Stethoscope,
    Menu,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Users, label: 'Pacientes', path: '/admin/patients' },
        { icon: FileText, label: 'Historial', path: '/admin/history' },
        { icon: Calendar, label: 'Turnos', path: '/admin/turns' },
        { icon: Package, label: 'Inventario', path: '/admin/inventory' },
        { icon: Stethoscope, label: 'Ventas', path: '/admin/sales' },
        { icon: BarChart, label: 'Reportes', path: '/admin/reports' },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-card/50 backdrop-blur-xl border-r border-border/50 flex flex-col transition-transform duration-300 md:relative md:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 flex items-center justify-between border-b border-border/40">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 flex items-center justify-center overflow-hidden">
                            <img src="/laikavet-logo.png" alt="LaikaVet Logo" className="h-14 w-14 object-contain" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">LaikaVet</span>
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
                        <X className="h-5 w-5" />
                    </Button>
                    <div className="hidden md:block">
                        <ModeToggle />
                    </div>
                </div>

                <div className="p-6 border-b border-border/40">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <img
                                src={user?.avatar || 'https://i.pravatar.cc/150'}
                                alt="User"
                                className="h-12 w-12 rounded-full ring-2 ring-border/50"
                            />
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-background"></div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">{user?.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={cn(
                                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <Icon className={cn("mr-3 h-5 w-5 transition-colors", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border/40">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Cerrar Sesión
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden h-16 border-b border-border/40 flex items-center justify-between px-4 bg-card/50 backdrop-blur-xl">
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                        <Menu className="h-6 w-6" />
                    </Button>
                    <span className="text-lg font-bold">LaikaVet</span>
                    <ModeToggle />
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-muted/20">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
