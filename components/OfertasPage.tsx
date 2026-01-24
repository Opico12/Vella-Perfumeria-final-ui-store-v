
import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

interface BannerOffer {
    id: number;
    title: string;
    subtitle: string;
    imageUrl: string;
    actionText: string;
    linkProductIds?: number[];
    isExternal?: boolean;
    linkUrl?: string;
    colSpan?: string; 
}

const banners: BannerOffer[] = [
    {
        id: 1,
        title: "Regalar con Cariño 2026",
        subtitle: "Descubre la historia de Jan y Valentina: actos de amor que inspiran belleza. Joyas Pearl y relojes exclusivos.",
        imageUrl: "https://media-cdn.oriflame.com/contentImage?externalMediaId=eb8edbeb-1ff0-427f-878c-8b23062b1aa6&name=Promo_split_single_1&inputFormat=jpg",
        actionText: "VER COLECCIÓN",
        linkProductIds: [48954, 48952, 48953],
        colSpan: "md:col-span-2"
    },
    {
        id: 2,
        title: "Especial Lotes Festivos",
        subtitle: "Packaging de lujo para tus detalles inolvidables.",
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42503%2F42503_1.png",
        actionText: "DESCUBRIR",
        linkProductIds: [48079, 48083, 99001],
    }
];

const OfertasPage: React.FC<{
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ currency, onAddToCart, onQuickAddToCart, onProductSelect, onQuickView }) => {

    const promoProducts = allProducts.filter(p => 
        p.tag === 'OFERTA' || p.tag === 'NOVEDAD' || (p.regularPrice && p.price < p.regularPrice) || p.tag === 'SET'
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-[#E29CD2]/20 text-black text-[10px] font-black tracking-widest mb-3 border border-[#E29CD2]/50 uppercase">
                    CAMPAÑA EXCLUSIVA 2026
                </span>
                <h1 className="text-4xl font-extrabold text-black tracking-tight font-serif uppercase">Regalar con Cariño</h1>
                <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                    Jan y Valentina comparten actos de amor, inspirando belleza en cada rincón. Selección curada para regalar con el corazón.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {banners.map((banner) => (
                    <div 
                        key={banner.id} 
                        className={`relative group overflow-hidden rounded-2xl shadow-md cursor-pointer ${banner.colSpan || ''}`}
                        onClick={() => {
                            const el = document.getElementById('promo-products');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
                        <img 
                            src={banner.imageUrl} 
                            alt={banner.title} 
                            className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 p-6 z-20 w-full text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-2xl font-bold mb-1 leading-tight uppercase">{banner.title}</h3>
                            <p className="text-[#E29CD2] text-sm mb-4 font-black">{banner.subtitle}</p>
                            <button className="bg-white text-black text-[10px] font-black py-2 px-6 rounded-full uppercase tracking-widest hover:bg-[#E29CD2] transition-colors">
                                {banner.actionText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div id="promo-products" className="scroll-mt-24">
                <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                    <h2 className="text-xl font-black text-black uppercase tracking-wider">Favoritos de Temporada 2026</h2>
                    <span className="text-xs font-bold text-gray-500">{promoProducts.length} PRODUCTOS SELECCIONADOS</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {promoProducts.map(product => (
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
            </div>
        </div>
    );
};

export default OfertasPage;
