import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('shipping'); // shipping, payment, success

    const handlePayment = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep('success');
            clearCart();
        }, 2000);
    };

    if (cart.length === 0 && step !== 'success') {
        navigate('/client');
        return null;
    }

    if (step === 'success') {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
                <div className="bg-green-100 p-6 rounded-full">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">¡Gracias por tu compra!</h1>
                <p className="text-gray-500 max-w-md">
                    Tu pedido #ORD-{Math.floor(Math.random() * 10000)} ha sido confirmado. Recibirás un correo electrónico con los detalles.
                </p>
                <Button onClick={() => navigate('/client')}>
                    Volver al Catálogo
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Finalizar Compra</h1>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información de Envío</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Nombre</Label>
                                    <Input id="firstName" placeholder="Juan" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Apellido</Label>
                                    <Input id="lastName" placeholder="Pérez" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Dirección</Label>
                                <Input id="address" placeholder="Calle Falsa 123" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">Ciudad</Label>
                                    <Input id="city" placeholder="Buenos Aires" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">Código Postal</Label>
                                    <Input id="zip" placeholder="1000" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Método de Pago</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-4 border p-4 rounded-md bg-blue-50 border-blue-200">
                                <div className="h-4 w-4 rounded-full bg-blue-600" />
                                <span className="font-medium">Tarjeta de Crédito / Débito</span>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                                <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Vencimiento</Label>
                                    <Input id="expiry" placeholder="MM/YY" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Resumen</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between font-medium">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-medium">
                                    <span>Envío</span>
                                    <span>Gratis</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>${(cartTotal * 1.21).toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" size="lg" onClick={handlePayment} disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Confirmar Pago'}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
