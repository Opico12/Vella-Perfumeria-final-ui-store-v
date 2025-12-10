
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
    colSpan?: string; // Tailwind class for column span
}

// Banners extraídos del Catálogo 17 (NUEVA CAMPAÑA 2025)
const banners: BannerOffer[] = [
    {
        id: 1,
        title: "Un viaje a la Riviera para ella",
        subtitle: "Lujo y cuidado premium con Novage+",
        imageUrl: "https://media-cdn.oriflame.com/contentImage?externalMediaId=eb8edbeb-1ff0-427f-878c-8b23062b1aa6&name=Promo_split_single_1&inputFormat=jpg",
        actionText: "VER OFERTAS",
        linkProductIds: [41070, 44098], // Novage+ items
        colSpan: "md:col-span-2"
    },
    {
        id: 2,
        title: "Azur refinado para él",
        subtitle: "Elegancia masculina Giordani",
        imageUrl: "https://media-cdn.oriflame.com/contentImage?externalMediaId=bda12c88-dee7-425a-9a32-8414adcf7d9f&name=Promo_split_single_2&inputFormat=jpg",
        actionText: "VER FRAGANCIA",
        linkProductIds: [47502], // Mister Giordani Aqua
    },
    {
        id: 3,
        title: "Un aroma floral para estas fiestas",
        subtitle: "Miss Giordani & Elvie",
        imageUrl: "https://media-cdn.oriflame.com/contentImage?externalMediaId=86cb5734-1101-4601-8161-e170f0cfbdd0&name=Promo_split_single_3&inputFormat=jpg",
        actionText: "DESCUBRIR",
        linkProductIds: [47514, 47499], // Miss Giordani Floral & Elvie
    },
    {
        id: 4,
        title: "Nuevas Brumas Corporales",
        subtitle: "Descubre Amber, Possess y Giordani en bruma",
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46807%2F46807_1.png",
        actionText: "VER BRUMAS",
        linkProductIds: [46805, 46806, 46807], // Body Mists
    },
    {
        id: 5,
        title: "Every Me Rose",
        subtitle: "La dulzura hecha perfume por solo 14,62€",
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46793%2F46793_1.png",
        actionText: "COMPRAR",
        linkProductIds: [46793], // Every Me
        colSpan: "md:col-span-2"
    }
];

const OfertasPage: React.FC<{
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ currency, onAddToCart, onQuickAddToCart, onProductSelect, onQuickView }) => {

    const scrollToProducts = (ids: number[]) => {
        const element = document.getElementById('promo-products');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        // En una implementación real, filtraríamos la lista mostrada abajo basándonos en los IDs seleccionados.
        // Por simplicidad, mostramos todos los destacados abajo.
    };

    // Filtramos productos que están explícitamente en oferta o son novedades de la campaña
    const promoProducts = allProducts.filter(p => 
        p.tag === 'OFERTA' || p.tag === 'NOVEDAD' || (p.regularPrice && p.price < p.regularPrice)
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-brand-purple/20 text-brand-purple-dark text-xs font-bold tracking-wide mb-3 border border-brand-purple/30">
                    CAMPAÑA 17 - 2025
                </span>
                <h1 className="text-4xl font-extrabold text-black tracking-tight font-serif">Ofertas Especiales</h1>
                <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                    Las mejores promociones de la Riviera y la elegancia italiana, seleccionadas para ti.
                </p>
            </div>

            {/* Banners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {banners.map((banner) => (
                    <div 
                        key={banner.id} 
                        className={`relative group overflow-hidden rounded-2xl shadow-md cursor-pointer ${banner.colSpan || ''}`}
                        onClick={() => banner.linkProductIds ? scrollToProducts(banner.linkProductIds) : null}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300"></div>
                        <img 
                            src={banner.imageUrl} 
                            alt={banner.title} 
                            className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 p-6 z-20 w-full text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-2xl font-bold mb-1 leading-tight">{banner.title}</h3>
                            <p className="text-gray-200 text-sm mb-4 font-medium opacity-90">{banner.subtitle}</p>
                            <button className="bg-white text-black text-xs font-bold py-2 px-4 rounded-full uppercase tracking-wider hover:bg-brand-purple transition-colors">
                                {banner.actionText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Product List */}
            <div id="promo-products" className="scroll-mt-24">
                <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-black">Productos Destacados de la Campaña</h2>
                    <span className="text-sm text-gray-500">{promoProducts.length} ofertas disponibles</span>
                </div>
                
                {promoProducts.length > 0 ? (
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
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No hay productos en oferta en este momento.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfertasPage;
