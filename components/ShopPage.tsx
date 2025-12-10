
import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

const categories = [
    { key: 'all', name: 'Todos los productos' },
    { key: 'skincare', name: 'Cuidado Facial' },
    { key: 'makeup', name: 'Maquillaje' },
    { key: 'perfume', name: 'Fragancias' },
    { key: 'wellness', name: 'Wellness' },
    { key: 'hair', name: 'Cuidado del Cabello' },
    { key: 'personal-care', name: 'Cuidado Personal' },
    { key: 'men', name: 'Hombre' },
    { key: 'accessories', name: 'Accesorios' },
];

const ShopPage: React.FC<{
    currency: Currency;
    initialCategory: string;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ currency, initialCategory, onAddToCart, onQuickAddToCart, onProductSelect, onQuickView }) => {
    
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [sortOrder, setSortOrder] = useState('menu_order');
    
    useEffect(() => {
        setActiveCategory(initialCategory);
    }, [initialCategory]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = activeCategory === 'all'
            ? [...allProducts]
            : allProducts.filter(p => p.category === activeCategory);

        switch (sortOrder) {
            case 'popularity':
                filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'price':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'menu_order':
            default:
                break;
        }
        return filtered;
    }, [activeCategory, sortOrder]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
    };

    // Client-Side CSV Generation Logic
    const handleDownloadCsv = () => {
        const headers = [
            'sku', 'name', 'description', 'short_description', 'brand', 'sale_price', 'regular_price', 'stock', 'categories', 'tags', 'images'
        ];

        const escapeCsvField = (field: string | number | undefined) => {
            if (field === undefined || field === null) return '';
            const stringField = String(field);
            if (stringField.includes('"') || stringField.includes(',') || stringField.includes('\n')) {
                return `"${stringField.replace(/"/g, '""')}"`;
            }
            return stringField;
        };

        const rows = allProducts.map(p => {
            const isDiscounted = p.regularPrice && p.price < p.regularPrice;
            const salePrice = isDiscounted ? p.price : '';
            const regularPrice = isDiscounted ? p.regularPrice : p.price;

            return [
                p.id,
                escapeCsvField(p.name),
                escapeCsvField(p.description),
                escapeCsvField(p.name), // Short description
                escapeCsvField(p.brand),
                salePrice,
                regularPrice,
                p.stock,
                escapeCsvField(p.category),
                escapeCsvField(p.tag || ''),
                escapeCsvField(p.imageUrl)
            ].join(',');
        });

        // Add BOM \uFEFF so Excel opens utf-8 chars correctly
        const csvContent = "\uFEFF" + [headers.join(','), ...rows].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'productos_vellaperfumeria_completo.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert("¡Archivo CSV generado y descargado! Puedes importarlo en tu tienda.");
    };

    const currentCategoryName = categories.find(c => c.key === activeCategory)?.name || 'Tienda';

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4 lg:w-1/5">
                    <h2 className="text-lg font-bold mb-4 border-b pb-2">Categorías</h2>
                    <ul className="space-y-2">
                        {categories.map(cat => (
                            <li key={cat.key}>
                                <button
                                    onClick={() => setActiveCategory(cat.key)}
                                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                                        activeCategory === cat.key
                                            ? 'bg-brand-purple text-brand-primary font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="w-full md:w-3/4 lg:w-4/5">
                    <h1 className="text-2xl font-bold text-brand-primary tracking-tight mb-4">{currentCategoryName}</h1>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 p-4 bg-white rounded-lg shadow-sm border">
                        <div className="flex items-center gap-4">
                            <p className="text-sm text-gray-700">
                            Mostrando {filteredAndSortedProducts.length} productos
                            </p>
                            <button 
                                onClick={handleDownloadCsv}
                                className="text-xs font-bold text-brand-purple-dark hover:text-black border border-brand-purple-dark hover:border-black px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                                title="Descargar lista de productos en CSV"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Exportar CSV
                            </button>
                        </div>
                        <form className="woocommerce-ordering">
                            <select 
                                name="orderby" 
                                className="orderby border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-brand-purple-dark focus:border-brand-purple-dark bg-white"
                                aria-label="Pedido de la tienda"
                                value={sortOrder}
                                onChange={handleSortChange}
                            >
                                <option value="menu_order">Orden predeterminado</option>
                                <option value="popularity">Ordenar por popularidad</option>
                                <option value="rating">Ordenar por puntuación media</option>
                                <option value="price">Ordenar por precio: bajo a alto</option>
                                <option value="price-desc">Ordenar por precio: alto a bajo</option>
                            </select>
                        </form>
                    </div>

                    {filteredAndSortedProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                            {filteredAndSortedProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    currency={currency}
                                    onAddToCart={onAddToCart}
                                    onQuickAddToCart={onQuickAddToCart}
                                    onProductSelect={onProductSelect}
                                    onQuickView={onQuickView}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border rounded-lg">
                            <p className="text-xl text-gray-600">No se encontraron productos en esta categoría.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ShopPage;
