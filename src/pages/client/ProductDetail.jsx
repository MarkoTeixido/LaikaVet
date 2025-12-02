import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, Check, Truck, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '@/data/mockData';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = PRODUCTS.find(p => p.id === id);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <h2 className="text-2xl font-bold">Producto no encontrado</h2>
                <Button variant="link" onClick={() => navigate('/client')}>
                    Volver al catálogo
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <Button variant="ghost" onClick={() => navigate('/client')} className="pl-0 hover:pl-2 transition-all">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver al catálogo
            </Button>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Gallery (Mock) */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square bg-gray-100 rounded-md overflow-hidden border border-gray-200 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                                <img
                                    src={product.image}
                                    alt={`View ${i}`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                        <div className="mt-2 flex items-center space-x-4">
                            <span className="text-sm text-gray-500 uppercase tracking-wide font-semibold">{product.brand}</span>
                            <Badge variant="secondary" className="capitalize">{product.category}</Badge>
                        </div>
                    </div>

                    <div className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${product.price.toFixed(2)}
                    </div>

                    <div className="prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-300">
                        <p>{product.description}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2 text-sm text-green-600">
                            <Check className="h-4 w-4" />
                            <span>{product.stock > 0 ? `En Stock (${product.stock} disponibles)` : 'Agotado'}</span>
                        </div>

                        <div className="flex space-x-4">
                            <Button size="lg" className="w-full md:w-auto" onClick={() => addToCart(product)} disabled={product.stock === 0}>
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6">
                        <div className="flex items-start space-x-3">
                            <Truck className="h-6 w-6 text-blue-600" />
                            <div>
                                <h4 className="font-medium text-sm">Envío Gratis</h4>
                                <p className="text-xs text-gray-500">En compras superiores a $50</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <ShieldCheck className="h-6 w-6 text-blue-600" />
                            <div>
                                <h4 className="font-medium text-sm">Garantía de Calidad</h4>
                                <p className="text-xs text-gray-500">Productos 100% certificados</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
