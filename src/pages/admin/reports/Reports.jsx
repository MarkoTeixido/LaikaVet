import React, { useState, useMemo } from 'react';
import { SALES, ORDERS } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Reports = () => {
    const [channelFilter, setChannelFilter] = useState('all'); // 'all', 'presencial', 'ecommerce'

    // Combine data
    const allTransactions = useMemo(() => {
        const sales = SALES.map(s => ({ ...s, type: 'presencial' }));
        const orders = ORDERS.map(o => ({ ...o, type: 'ecommerce', client: 'Online User' })); // Simplify orders
        return [...sales, ...orders].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, []);

    const filteredData = useMemo(() => {
        if (channelFilter === 'all') return allTransactions;
        return allTransactions.filter(t => t.type === channelFilter);
    }, [allTransactions, channelFilter]);

    // Calculate Totals
    const totalRevenue = filteredData.reduce((acc, curr) => acc + curr.total, 0);
    const totalTransactions = filteredData.length;
    const averageTicket = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    // Chart Data: Revenue by Date
    const revenueByDate = useMemo(() => {
        const acc = {};
        filteredData.forEach(t => {
            acc[t.date] = (acc[t.date] || 0) + t.total;
        });
        return Object.keys(acc).map(date => ({ date, total: acc[date] })).sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [filteredData]);

    // Chart Data: Revenue by Channel (Pie)
    const revenueByChannel = useMemo(() => {
        const acc = { presencial: 0, ecommerce: 0 };
        allTransactions.forEach(t => {
            acc[t.type] += t.total;
        });
        return [
            { name: 'Presencial', value: acc.presencial },
            { name: 'Ecommerce', value: acc.ecommerce }
        ];
    }, [allTransactions]);

    const COLORS = ['#06b6d4', '#8b5cf6']; // Teal, Violet

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
                    <p className="text-muted-foreground">Análisis de ventas y rendimiento.</p>
                </div>
                <Select value={channelFilter} onValueChange={setChannelFilter}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Canal" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los Canales</SelectItem>
                        <SelectItem value="presencial">Solo Presencial</SelectItem>
                        <SelectItem value="ecommerce">Solo Ecommerce</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            {channelFilter === 'all' ? 'Combinado Presencial + Ecommerce' : `Canal: ${channelFilter}`}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transacciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalTransactions}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${averageTicket.toFixed(2)}</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Resumen</TabsTrigger>
                    <TabsTrigger value="details">Detalle de Transacciones</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Ventas por Período</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={revenueByDate}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis dataKey="date" className="text-xs" />
                                            <YAxis className="text-xs" tickFormatter={(value) => `$${value}`} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                                                itemStyle={{ color: 'var(--foreground)' }}
                                            />
                                            <Bar dataKey="total" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Distribución por Canal</CardTitle>
                                <CardDescription>Total histórico</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={revenueByChannel}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {revenueByChannel.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="details">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalle de Transacciones</CardTitle>
                            <CardDescription>Listado completo de ventas filtradas.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Canal</TableHead>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.map((t) => (
                                        <TableRow key={t.id}>
                                            <TableCell className="font-medium">{t.id}</TableCell>
                                            <TableCell>{t.date}</TableCell>
                                            <TableCell className="capitalize">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${t.type === 'presencial' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'}`}>
                                                    {t.type}
                                                </span>
                                            </TableCell>
                                            <TableCell>{t.client || 'N/A'}</TableCell>
                                            <TableCell className="text-right">${t.total.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Reports;
