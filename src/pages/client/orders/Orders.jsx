import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, ArrowRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { ORDERS } from '@/data/mockData';

const StatusBadge = ({ status }) => {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        preparing: 'bg-blue-100 text-blue-800 border-blue-200',
        shipped: 'bg-purple-100 text-purple-800 border-purple-200',
        delivered: 'bg-green-100 text-green-800 border-green-200',
        cancelled: 'bg-red-100 text-red-800 border-red-200'
    };

    const icons = {
        pending: Clock,
        preparing: Package,
        shipped: Truck,
        delivered: CheckCircle,
        cancelled: XCircle
    };

    const labels = {
        pending: 'Pendiente',
        preparing: 'En Preparación',
        shipped: 'Enviado',
        delivered: 'Entregado',
        cancelled: 'Cancelado'
    };

    const Icon = icons[status] || Package;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
            <Icon className="w-3 h-3 mr-1" />
            {labels[status] || status}
        </span>
    );
};

const Orders = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Mis Pedidos</h1>

            <div className="space-y-4">
                {ORDERS.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <Package className="mx-auto h-12 w-12 opacity-20" />
                        <p className="mt-2">No tienes pedidos realizados aún.</p>
                        <Button variant="link" onClick={() => navigate('/client')}>
                            Ir al catálogo
                        </Button>
                    </div>
                ) : (
                    ORDERS.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                            <CardHeader className="bg-gray-50 dark:bg-gray-800/50 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-base">Pedido #{order.id.toUpperCase()}</CardTitle>
                                        <CardDescription>Realizado el {order.date}</CardDescription>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <StatusBadge status={order.status} />
                                        <span className="font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center text-sm">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                                                    <Package className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                                                    <p className="text-gray-500">Cant: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-medium">${item.price.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    {order.status === 'pending' && (
                                        <Button variant="destructive" size="sm">Cancelar Pedido</Button>
                                    )}
                                    <Button variant="outline" size="sm">Ver Detalles</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
