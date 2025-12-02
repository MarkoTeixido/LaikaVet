import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, LogOut, Dog } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';

const ClientLayout = () => {
    const { logout, user } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/client" className="flex items-center space-x-3 group">
                            <div className="h-9 w-9 bg-primary/10 rounded-lg flex items-center justify-center transition-colors group-hover:bg-primary/20">
                                <Dog className="h-5 w-5 text-primary" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">LaikaVet Store</span>
                        </Link>

                        <nav className="hidden md:flex space-x-8">
                            <Link to="/client" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Catálogo</Link>
                            <Link to="/client/orders" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Mis Pedidos</Link>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <ModeToggle />
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

                            <div className="flex items-center space-x-3 border-l border-border/40 pl-4 ml-2">
                                <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

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
                            <Dog className="h-5 w-5 text-muted-foreground" />
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
