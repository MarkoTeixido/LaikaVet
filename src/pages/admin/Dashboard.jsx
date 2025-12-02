import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Users,
    Calendar,
    AlertTriangle,
    DollarSign,
    ArrowUpRight,
    ArrowRight,
    Activity
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { PATIENTS, PRODUCTS, APPOINTMENTS } from '@/data/mockData';

const Dashboard = () => {
    const navigate = useNavigate();

    // Calculate metrics
    const totalPatients = PATIENTS.length;
    const appointmentsToday = APPOINTMENTS.filter(a => a.date === '2025-12-02').length; // Mock date match
    const lowStockProducts = PRODUCTS.filter(p => p.stock < 10).length;
    const totalSales = 12500; // Mock total

    const salesData = [
        { name: 'Lun', sales: 4000 },
        { name: 'Mar', sales: 3000 },
        { name: 'Mie', sales: 2000 },
        { name: 'Jue', sales: 2780 },
        { name: 'Vie', sales: 1890 },
        { name: 'Sab', sales: 2390 },
        { name: 'Dom', sales: 3490 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Resumen de actividad y métricas clave.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={() => navigate('/admin/patients')} className="shadow-lg shadow-primary/20">
                        Nuevo Paciente
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/admin/turns')}>
                        Nuevo Turno
                    </Button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Pacientes</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalPatients}</div>
                        <p className="text-xs text-muted-foreground mt-1">+2 desde la semana pasada</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Turnos Hoy</CardTitle>
                        <Calendar className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{appointmentsToday}</div>
                        <p className="text-xs text-muted-foreground mt-1">4 pendientes de confirmación</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Stock Bajo</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{lowStockProducts}</div>
                        <p className="text-xs text-muted-foreground mt-1">Productos requieren reposición</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Ventas Mes</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
                        <p className="text-xs text-green-600 flex items-center mt-1 font-medium">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> +15% vs mes anterior
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Chart */}
                <Card className="col-span-4 shadow-md">
                    <CardHeader>
                        <CardTitle>Resumen de Ingresos</CardTitle>
                        <CardDescription>Ingresos diarios de la última semana.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                                        contentStyle={{
                                            borderRadius: '8px',
                                            border: '1px solid hsl(var(--border))',
                                            backgroundColor: 'hsl(var(--popover))',
                                            color: 'hsl(var(--popover-foreground))',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="col-span-3 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Activity className="mr-2 h-5 w-5 text-primary" />
                            Actividad Reciente
                        </CardTitle>
                        <CardDescription>Últimos movimientos del sistema.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <span className="relative flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500 mr-4"></span>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Nuevo turno agendado</p>
                                    <p className="text-sm text-muted-foreground">
                                        Max (Golden Retriever) - Vacunación
                                    </p>
                                    <p className="text-xs text-muted-foreground pt-1">Hace 2m</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="relative flex h-2 w-2 translate-y-1.5 rounded-full bg-red-500 mr-4"></span>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Stock crítico: Flea Collar</p>
                                    <p className="text-sm text-muted-foreground">
                                        Quedan solo 5 unidades
                                    </p>
                                    <p className="text-xs text-muted-foreground pt-1">Hace 1h</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="relative flex h-2 w-2 translate-y-1.5 rounded-full bg-green-500 mr-4"></span>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Venta realizada #1023</p>
                                    <p className="text-sm text-muted-foreground">
                                        Premium Dog Food x2
                                    </p>
                                    <p className="text-xs text-muted-foreground pt-1">Hace 3h</p>
                                </div>
                            </div>

                            <Button variant="ghost" className="w-full justify-start pl-0 text-primary hover:text-primary/80 hover:bg-transparent p-0 h-auto font-medium">
                                Ver toda la actividad <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
