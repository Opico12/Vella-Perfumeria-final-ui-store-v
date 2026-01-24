
import React, { useState, useRef } from 'react';
import { allProducts } from './products';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';

const INTERACTIVE_CATALOG_URL = 'https://es-catalogue.oriflame.com/oriflame/es/2026001-brp?HideStandardUI=true&Page=1';

interface CatalogPageProps {
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
    currency: Currency;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ onAddToCart, onQuickAddToCart, onProductSelect, onQuickView, currency }) => {
    const [quickAddCode, setQuickAddCode] = useState('');
    const [addStatus, setAddStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleQuickAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const code = parseInt(quickAddCode.trim());
        const product = allProducts.find(p => p.id === code);
        if (product) {
            onAddToCart(product, buttonRef.current, null);
            setAddStatus('success');
            setStatusMessage(`¡${product.name} añadido!`);
            setQuickAddCode('');
            setTimeout(() => setAddStatus('idle'), 3000);
        } else {
            setAddStatus('error');
            setStatusMessage('Código no encontrado en stock online.');
            setTimeout(() => setAddStatus('idle'), 3000);
        }
    };

    return (
        <div className="w-full px-2 sm:px-4 py-6 bg-gray-50">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-grow flex flex-col">
                    <div className="mb-6 flex items-center gap-6 justify-center lg:justify-start">
                        <img src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" alt="Logo" className="h-20 w-auto" />
                        <div>
                            <h1 className="text-3xl font-black text-black tracking-tighter uppercase">Catálogo Digital 2026</h1>
                            <p className="text-sm text-gray-600 font-bold uppercase tracking-widest text-[#E29CD2]">Descubre la magia de regalar con cariño</p>
                        </div>
                    </div>
                    
                    <div className="relative w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 aspect-[9/12] lg:aspect-auto lg:h-[85vh]">
                        <iframe
                            src={INTERACTIVE_CATALOG_URL}
                            title="Catálogo Vellaperfumeria 2026"
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                        />
                    </div>
                </div>

                <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                        <h2 className="text-lg font-black text-black uppercase mb-2 tracking-tighter">Pedido por Código</h2>
                        <p className="text-[10px] text-gray-500 mb-6 font-bold uppercase tracking-wider">Añade productos directamente del catálogo 2026</p>
                        
                        <form onSubmit={handleQuickAdd} className="space-y-4">
                            <input
                                type="number"
                                placeholder="CÓDIGO PRODUCTO (ej: 47511)"
                                className="w-full border-2 border-gray-100 rounded-lg px-4 py-3 text-sm font-bold focus:border-[#E29CD2] outline-none transition-colors"
                                value={quickAddCode}
                                onChange={(e) => setQuickAddCode(e.target.value)}
                            />
                            <button
                                ref={buttonRef}
                                type="submit"
                                className="w-full bg-black text-white font-black py-3 rounded-lg hover:bg-[#E29CD2] hover:text-black transition-all uppercase text-xs tracking-widest"
                            >
                                Añadir a la cesta
                            </button>
                        </form>
                        
                        {addStatus !== 'idle' && (
                            <p className={`mt-4 text-center text-[11px] font-black uppercase ${addStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {statusMessage}
                            </p>
                        )}

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="text-xs font-black uppercase mb-4 tracking-tighter text-gray-400">Ofertas Flash 2026</h3>
                            <div className="space-y-4">
                                {allProducts.filter(p => p.tag === 'OFERTA').slice(0, 2).map(p => (
                                    <div key={p.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => onProductSelect(p)}>
                                        <img src={p.imageUrl} className="w-12 h-12 object-contain bg-gray-50 rounded p-1" alt="" />
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold truncate uppercase">{p.name}</p>
                                            <p className="text-[#E29CD2] text-xs font-black">{p.price} €</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
