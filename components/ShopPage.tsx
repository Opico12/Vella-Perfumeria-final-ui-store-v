
import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

// SVG Icons for Toolbar
const FilterIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.437 7a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1h1.063a2 2 0 0 1 3.874 0H19.5a.5.5 0 0 1 0 1zM6.5 6.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0m11.937 5H19.5a.5.5 0 0 1 0 1h-1.063a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1h10.063a2 2 0 0 1 3.874 0m-.937.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-6.063 5H19.5a.5.5 0 0 1 0 1h-8.063a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1h3.063a2 2 0 0 1 3.874 0m-.937.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0"></path>
    </svg>
);

const SortIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3.5 6a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1zm0 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zM19 6.5a.5.5 0 0 0-1 0v9.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L19 16.293z"></path>
    </svg>
);

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
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
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

    const currentCategoryName = categories.find(c => c.key === activeCategory)?.name || 'Tienda';

    // Client-Side CSV Generation Logic (WooCommerce Compatible)
    const handleDownloadCsv = () => {
        const headers = [
            "ID", "Type", "SKU", "Name", "Published", "Short description", 
            "Description", "Regular price", "Sale price", "Stock", 
            "Manage stock?", "Categories", "Tags", "Images"
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
            const regularPrice = isDiscounted ? p.regularPrice : p.price;
            const salePrice = isDiscounted ? p.price : '';
            const shortDesc = p.description.split('.')[0] + '.';

            return [
                p.id, 'simple', p.id, escapeCsvField(p.name), 1, 
                escapeCsvField(shortDesc), escapeCsvField(p.description), 
                regularPrice, salePrice, p.stock, 1, 
                escapeCsvField(p.category), escapeCsvField(p.tag || ''), 
                escapeCsvField(p.imageUrl)
            ].join(',');
        });

        const csvContent = "\uFEFF" + [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'productos_woocommerce_vellaperfumeria.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Top Toolbar (Copied Style) */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between py-4">
                        
                        {/* Title & Count (Mobile friendly) */}
                        <div className="flex items-center justify-between md:hidden mb-4">
                            <h1 className="text-xl font-bold text-black">{currentCategoryName}</h1>
                            <p className="text-gray-500 text-sm">{filteredAndSortedProducts.length} productos</p>
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-6">
                                {/* Filter Button */}
                                <button 
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors group"
                                >
                                    <FilterIcon />
                                    <span className="font-medium text-sm md:text-base group-hover:underline">Filtrar</span>
                                </button>

                                {/* Sort Button */}
                                <div className="relative group cursor-pointer flex items-center gap-2 text-gray-700 hover:text-black">
                                    <SortIcon />
                                    <select 
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}
                                        className="appearance-none bg-transparent font-medium text-sm md:text-base cursor-pointer focus:outline-none pr-4 hover:underline"
                                    >
                                        <option value="menu_order">Recomendado</option>
                                        <option value="popularity">Popularidad</option>
                                        <option value="rating">Valoración</option>
                                        <option value="price">Precio: Bajo a Alto</option>
                                        <option value="price-desc">Precio: Alto a Bajo</option>
                                    </select>
                                </div>
                            </div>

                            {/* Desktop Counter */}
                            <div className="hidden md:block">
                                <p className="text-gray-500 text-sm">{filteredAndSortedProducts.length} productos</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Collapsible Filter Panel */}
                    {isFilterOpen && (
                        <div className="py-4 border-t border-gray-100 animate-fade-in">
                            <h3 className="font-bold mb-3 text-sm uppercase tracking-wide text-gray-500">Categorías</h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat.key}
                                        onClick={() => { setActiveCategory(cat.key); setIsFilterOpen(false); }}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                            activeCategory === cat.key
                                                ? 'bg-black text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                <button onClick={handleDownloadCsv} className="text-xs text-brand-purple-dark hover:underline font-bold">
                                    Descargar CSV para WooCommerce
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filteredAndSortedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
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
                    <div className="text-center py-24 bg-gray-50 rounded-lg">
                        <p className="text-xl text-gray-600">No se encontraron productos en esta categoría.</p>
                        <button onClick={() => setActiveCategory('all')} className="mt-4 text-brand-purple-dark font-bold hover:underline">
                            Ver todos los productos
                        </button>
                    </div>
                )}
            </div>

            {/* Pagination / Load More Section (Visual Copy) */}
            <div className="container mx-auto px-4 pb-12">
                <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-4">
                    <p className="text-gray-600 text-sm">
                        Mostrando {filteredAndSortedProducts.length} de {filteredAndSortedProducts.length} productos
                    </p>
                    {/* Progress Bar Container */}
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        {/* Progress Bar Fill - Simulated 75% for visual */}
                        <div className="h-full bg-black w-full rounded-full transition-all duration-500"></div>
                    </div>
                    {/* Outlined Button */}
                    <button className="px-8 py-2 border border-gray-300 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-black transition-all uppercase tracking-wide">
                        Mostrar más
                    </button>
                </div>
                <hr className="mt-12 border-gray-200" />
            </div>
            
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ShopPage;
