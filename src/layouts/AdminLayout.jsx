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
    Dog,
    Stethoscope
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

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
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-72 bg-card/50 backdrop-blur-xl border-r border-border/50 flex flex-col transition-all duration-300">
                <div className="p-6 flex items-center justify-between border-b border-border/40">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Dog className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">LaikaVet</span>
                    </div>
                    <ModeToggle />
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
            <main className="flex-1 overflow-y-auto p-8 bg-muted/20">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
