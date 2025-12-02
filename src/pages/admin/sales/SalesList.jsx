import React, { useState } from 'react';
import { SALES } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Eye, ShoppingBag, Plus, Trash2, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

const SalesList = () => {
    const [sales, setSales] = useState(SALES);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [selectedSale, setSelectedSale] = useState(null);

    // New Sale Form State
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newSaleData, setNewSaleData] = useState({
        client: '',
        items: [{ name: '', quantity: 1, price: 0, category: 'product' }]
    });

    const filteredSales = sales.filter(sale => {
        const matchesSearch =
            sale.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sale.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = filterCategory === 'all' ||
            sale.items.some(item => item.category === filterCategory);

        return matchesSearch && matchesCategory;
    });

    const handleAddItem = () => {
        setNewSaleData({
            ...newSaleData,
            items: [...newSaleData.items, { name: '', quantity: 1, price: 0, category: 'product' }]
        });
    };

    const handleRemoveItem = (index) => {
        const updatedItems = newSaleData.items.filter((_, i) => i !== index);
        setNewSaleData({ ...newSaleData, items: updatedItems });
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = newSaleData.items.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setNewSaleData({ ...newSaleData, items: updatedItems });
    };

    const calculateTotal = (items) => {
        return items.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
    };

    const handleSaveSale = () => {
        if (!newSaleData.client || newSaleData.items.length === 0) return;

        const total = calculateTotal(newSaleData.items);
        const newSale = {
            id: `sale-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            channel: 'presencial',
            total: total,
            client: newSaleData.client,
            items: newSaleData.items.map(item => ({
                ...item,
                price: Number(item.price),
                quantity: Number(item.quantity)
            }))
        };

        setSales([newSale, ...sales]);
        setIsAddDialogOpen(false);
        setNewSaleData({
            client: '',
            items: [{ name: '', quantity: 1, price: 0, category: 'product' }]
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Ventas Presenciales</h1>
                    <p className="text-muted-foreground">Registro de ventas y servicios realizados en la veterinaria.</p>
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Nueva Venta
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por cliente o ID..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="product">Productos</SelectItem>
                        <SelectItem value="service">Servicios</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Ventas</CardTitle>
                    <CardDescription>
                        Mostrando {filteredSales.length} transacciones
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSales.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No se encontraron ventas.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredSales.map((sale) => (
                                    <TableRow key={sale.id}>
                                        <TableCell className="font-medium">{sale.id}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{sale.date}</span>
                                                <span className="text-xs text-muted-foreground">{sale.time}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{sale.client}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                {sale.items.slice(0, 2).map((item, idx) => (
                                                    <span key={idx} className="text-sm text-muted-foreground">
                                                        {item.quantity}x {item.name}
                                                    </span>
                                                ))}
                                                {sale.items.length > 2 && (
                                                    <span className="text-xs text-muted-foreground">
                                                        +{sale.items.length - 2} más...
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-bold">
                                            ${sale.total.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => setSelectedSale(sale)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[500px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Detalle de Venta</DialogTitle>
                                                        <DialogDescription>ID: {sale.id}</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-6 py-4">
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <span className="text-muted-foreground block">Fecha</span>
                                                                <span className="font-medium">{sale.date} {sale.time}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-muted-foreground block">Cliente</span>
                                                                <span className="font-medium">{sale.client}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-muted-foreground block">Canal</span>
                                                                <span className="font-medium capitalize">{sale.channel}</span>
                                                            </div>
                                                        </div>

                                                        <div className="border rounded-lg p-4 bg-muted/20">
                                                            <h4 className="font-semibold mb-3 flex items-center">
                                                                <ShoppingBag className="mr-2 h-4 w-4" /> Productos y Servicios
                                                            </h4>
                                                            <div className="space-y-3">
                                                                {sale.items.map((item, idx) => (
                                                                    <div key={idx} className="flex justify-between text-sm">
                                                                        <span>{item.quantity}x {item.name}</span>
                                                                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                                                    </div>
                                                                ))}
                                                                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-base">
                                                                    <span>Total</span>
                                                                    <span>${sale.total.toFixed(2)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* New Sale Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Registrar Nueva Venta</DialogTitle>
                        <DialogDescription>
                            Ingrese los detalles de la venta presencial.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="client">Cliente</Label>
                            <Input
                                id="client"
                                placeholder="Nombre del cliente"
                                value={newSaleData.client}
                                onChange={(e) => setNewSaleData({ ...newSaleData, client: e.target.value })}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Items</Label>
                                <Button variant="outline" size="sm" onClick={handleAddItem}>
                                    <Plus className="mr-2 h-3 w-3" /> Agregar Item
                                </Button>
                            </div>

                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                {newSaleData.items.map((item, index) => (
                                    <div key={index} className="flex gap-2 items-start p-3 border rounded-md bg-muted/20">
                                        <div className="grid gap-2 flex-1">
                                            <Input
                                                placeholder="Descripción (ej. Consulta, Alimento)"
                                                value={item.name}
                                                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                            />
                                            <div className="flex gap-2">
                                                <div className="w-24">
                                                    <Input
                                                        type="number"
                                                        placeholder="Cant."
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <Input
                                                        type="number"
                                                        placeholder="Precio Unit."
                                                        min="0"
                                                        step="0.01"
                                                        value={item.price}
                                                        onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                                    />
                                                </div>
                                                <Select
                                                    value={item.category}
                                                    onValueChange={(val) => handleItemChange(index, 'category', val)}
                                                >
                                                    <SelectTrigger className="w-[110px]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="product">Producto</SelectItem>
                                                        <SelectItem value="service">Servicio</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-1"
                                            onClick={() => handleRemoveItem(index)}
                                            disabled={newSaleData.items.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                            <span className="font-semibold text-lg">Total</span>
                            <span className="font-bold text-2xl text-primary">
                                ${calculateTotal(newSaleData.items).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSaveSale} disabled={!newSaleData.client || calculateTotal(newSaleData.items) === 0}>
                            <Save className="mr-2 h-4 w-4" /> Registrar Venta
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SalesList;
