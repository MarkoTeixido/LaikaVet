import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Dog, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await login(email, password);
            if (user.role === 'admin' || user.role === 'veterinarian' || user.role === 'receptionist') {
                navigate('/admin');
            } else {
                navigate('/client');
            }
        } catch (err) {
            setError('Credenciales inválidas. Intente nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const fillCredentials = (role) => {
        if (role === 'admin') {
            setEmail('admin@laikavet.com');
            setPassword('admin123');
        } else if (role === 'client') {
            setEmail('cliente@email.com');
            setPassword('cliente123');
        }
    };

    return (
        <div className="min-h-screen flex w-full bg-background">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16">
                <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div className="space-y-2">
                        <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center mb-4">
                            <Dog className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Bienvenido de nuevo</h1>
                        <p className="text-muted-foreground">Ingresa tus credenciales para acceder a tu cuenta.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none">
                                Correo Electrónico
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="nombre@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-background/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none">
                                Contraseña
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-background/50"
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium flex items-center justify-center">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full h-11 text-base shadow-lg shadow-primary/20" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Iniciar Sesión'}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground font-medium tracking-wider">
                                Demo Access
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" onClick={() => fillCredentials('admin')} className="h-10 bg-background/50 hover:bg-accent/50">
                            Admin
                        </Button>
                        <Button variant="outline" onClick={() => fillCredentials('client')} className="h-10 bg-background/50 hover:bg-accent/50">
                            Cliente
                        </Button>
                    </div>

                    <p className="text-center text-sm text-muted-foreground pt-4">
                        &copy; 2025 LaikaVet. Todos los derechos reservados.
                    </p>
                </div>
            </div>

            {/* Right Side - Image/Brand */}
            <div className="hidden lg:flex flex-1 bg-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="relative z-10 flex flex-col justify-end p-16 text-white space-y-6 h-full w-full max-w-2xl">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold tracking-tight">Cuidado veterinario de excelencia.</h2>
                        <p className="text-lg text-zinc-300 leading-relaxed">
                            Gestiona pacientes, turnos e inventario con la plataforma más avanzada y elegante del mercado.
                        </p>
                    </div>

                    <div className="flex items-center space-x-4 pt-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-8 w-8 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-xs font-medium">
                                    {i}
                                </div>
                            ))}
                        </div>
                        <div className="text-sm font-medium text-zinc-300">
                            Confían en nosotros +500 veterinarias
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
