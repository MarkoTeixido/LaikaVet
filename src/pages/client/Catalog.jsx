import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingCart, Filter } from 'lucide-react';
import { PRODUCTS } from '@/data/mockData';
import { motion } from 'framer-motion';

const Catalog = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts = PRODUCTS.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = [
        { id: 'all', name: 'Todos' },
        { id: 'food', name: 'Alimentos' },
        { id: 'medicines', name: 'Medicamentos' },
        { id: 'accessories', name: 'Accesorios' }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Catálogo</h1>
                    <p className="text-muted-foreground">Explora nuestros productos premium para tu mascota.</p>
                </div>

                <div className="flex items-center space-x-2 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nombre o marca..."
                            className="pl-9 bg-background/50 backdrop-blur-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 pb-2">
                {categories.map(cat => (
                    <Button
                        key={cat.id}
                        variant={selectedCategory === cat.id ? "default" : "outline"}
                        onClick={() => setSelectedCategory(cat.id)}
                        size="sm"
                        className={`rounded-full px-6 ${selectedCategory === cat.id ? 'shadow-md' : 'bg-background/50'}`}
                    >
                        {cat.name}
                    </Button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.length === 0 ? (
                    <div className="col-span-full text-center py-20">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            <Search className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">No se encontraron productos</h3>
                        <p className="text-muted-foreground">Intenta con otros términos de búsqueda o categorías.</p>
                    </div>
                ) : (
                    filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <Card className="flex flex-col h-full overflow-hidden group border-border/50 bg-card/50 backdrop-blur-sm">
                                <div
                                    className="h-56 w-full bg-muted relative cursor-pointer overflow-hidden"
                                    onClick={() => navigate(`/client/product/${product.id}`)}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {product.stock < 10 && (
                                        <Badge variant="destructive" className="absolute top-2 right-2 shadow-sm">
                                            ¡Pocos en stock!
                                        </Badge>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                </div>
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">{product.brand}</p>
                                            <CardTitle
                                                className="text-lg line-clamp-1 cursor-pointer group-hover:text-primary transition-colors"
                                                title={product.name}
                                                onClick={() => navigate(`/client/product/${product.id}`)}
                                            >
                                                {product.name}
                                            </CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 flex-1">
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button className="w-full shadow-sm group-hover:shadow-md transition-all" onClick={() => addToCart(product)} disabled={product.stock === 0}>
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Catalog;
