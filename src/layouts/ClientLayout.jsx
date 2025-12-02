import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, LogOut, Menu, X } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';

const ClientLayout = () => {
    const { logout, user } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center relative">
                        <div className="flex items-center">
                            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsMobileMenuOpen(true)}>
                                <Menu className="h-6 w-6" />
                            </Button>
                            <Link to="/client" className="flex items-center space-x-3 group">
                                <div className="h-10 w-10 items-center justify-center overflow-hidden hidden md:flex">
                                    <img src="/laikavet-logo.png" alt="LaikaVet Logo" className="h-14 w-14 object-contain" />
                                </div>
                                <span className="text-xl font-bold tracking-tight absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 whitespace-nowrap">LaikaVet Store</span>
                            </Link>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            <Link to="/client" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Catálogo</Link>
                            <Link to="/client/orders" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Mis Pedidos</Link>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <div className="hidden md:block">
                                <ModeToggle />
                            </div>
                            <Link to="/client/cart">
                                <Button variant="ghost" size="icon" className="relative hover:bg-accent/50">
                                    <ShoppingCart className="h-5 w-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in duration-300">
                                            {cartCount}
                                        </span>
                                    )}
                                </Button>
                            </Link>

                            <div className="hidden md:flex items-center space-x-3 border-l border-border/40 pl-4 ml-2">
                                <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    <div className="relative flex-1 w-full max-w-xs bg-background p-6 shadow-xl animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-2">
                                <img src="/laikavet-logo.png" alt="LaikaVet Logo" className="h-10 w-10 object-contain" />
                                <span className="text-lg font-bold">LaikaVet</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-medium">{user?.name}</p>
                                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                <Link
                                    to="/client"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
                                >
                                    Catálogo
                                </Link>
                                <Link
                                    to="/client/orders"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
                                >
                                    Mis Pedidos
                                </Link>
                            </nav>

                            <div className="pt-6 border-t border-border/40 space-y-4">
                                <div className="flex items-center justify-between px-4">
                                    <span className="text-sm font-medium">Tema</span>
                                    <ModeToggle />
                                </div>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-3 h-5 w-5" />
                                    Cerrar Sesión
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 w-full bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm mt-auto">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <img src="/laikavet-logo.png" alt="LaikaVet Logo" className="h-14 w-14 object-contain" />
                            <span className="text-sm font-semibold text-muted-foreground">LaikaVet</span>
                        </div>
                        <p className="text-sm text-muted-foreground text-center md:text-right">
                            &copy; 2025 LaikaVet. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ClientLayout;
