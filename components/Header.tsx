
import React, { useState, useRef, useEffect } from 'react';
import type { View } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

// Social Icons
const ThreadsIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8.01 3.51c-1.35 0-2.45 1.1-2.45 2.45v.38c0 .28.22.5.5.5h1.5c.28 0 .5-.22.5-.5v-.38c0-.69.56-1.25 1.25-1.25h.19c.69 0 1.25.56 1.25 1.25v2.87c0 1.35-1.1 2.45-2.45 2.45h-.87c-.28 0-.5.22-.5.5v1.5c0 .28.22.5.5.5h.87c2.21 0 4-1.79 4-4V5.96c0-1.35-1.1-2.45-2.45-2.45h-2.12zm-3.09 3.1h-1.5c-.28 0-.5.22-.5.5v.38c0 1.35 1.1 2.45 2.45 2.45h.19c.69 0 1.25-.56 1.25-1.25V5.96c0-1.35-1.1-2.45-2.45-2.45H3.01c-1.35 0-2.45 1.1-2.45 2.45v2.12c0 2.21 1.79 4 4 4h.87c.28 0 .5-.22.5-.5v-1.5c0-.28-.22-.5-.5-.5h-.87c-.69 0-1.25-.56-1.25-1.25v-.38c0-.28-.22-.5-.5-.5z"/>
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919A118.663 118.663 0 0112 2.163zm0 1.442c-3.143 0-3.509.011-4.72.067-2.694.123-3.997 1.433-4.12 4.12C3.109 9.12 3.098 9.486 3.098 12c0 2.514.011 2.88.067 4.72.123 2.686 1.427 3.996 4.12 4.12 1.21.055 1.577.067 4.72.067 3.143 0 3.509-.011 4.72-.067 2.694-.123 3.997-1.433 4.12-4.12.056-1.84.067-2.206.067-4.72 0-2.514-.011-2.88-.067-4.72-.123-2.686-1.427-3.996-4.12-4.12-1.21-.055-1.577.067-4.72-.067zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 1.44a2.31 2.31 0 110 4.62 2.31 2.31 0 010-4.62zM18.88 6.54a1.32 1.32 0 100-2.64 1.32 1.32 0 000 2.64z" clipRule="evenodd" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.475 5.422 5.571-1.469z" />
    </svg>
);

const MenuIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CartIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const CsvIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const NavLink: React.FC<{ onClick?: () => void, href?: string, children: React.ReactNode, className?: string }> = ({ onClick, href, children, className }) => {
    if (href) {
        return (
            <a href={href} className={`text-sm font-bold text-black hover:text-gray-700 transition-colors duration-200 uppercase tracking-tight ${className}`}>
                <span className="hover-underline-effect">{children}</span>
            </a>
        );
    }
    return (
        <button onClick={onClick} className={`text-sm font-bold text-black hover:text-gray-700 transition-colors duration-200 uppercase tracking-tight ${className}`}>
            <span className="hover-underline-effect">{children}</span>
        </button>
    );
};

const MenuLink: React.FC<{ onClick?: () => void, href?: string, children: React.ReactNode, className?: string }> = ({ onClick, href, children, className = "" }) => {
    const baseClassName = "text-sm font-bold text-white hover:text-[#f78df6] transition-colors duration-200 uppercase tracking-wide flex items-center gap-1 " + className;
    if (href) {
        return <a href={href} className={baseClassName}>{children}</a>;
    }
    return <button onClick={onClick} className={baseClassName}>{children}</button>;
};


interface HeaderProps {
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currency, onCurrencyChange, cartCount, onCartClick }) => {
    const [cartPulse, setCartPulse] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cartCount > 0) {
            setCartPulse(true);
            const timer = setTimeout(() => setCartPulse(false), 500);
            return () => clearTimeout(timer);
        }
    }, [cartCount]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMobileNav = (view: View, payload?: any) => {
        onNavigate(view, payload);
        setIsMobileMenuOpen(false);
    }

    // Dynamic CSV Generation function
    const generateAndDownloadCsv = () => {
        const headers = [
            'sku', 'name', 'description', 'brand', 'sale_price', 'regular_price', 'stock', 'categories', 'tags', 'images'
        ];

        const escapeField = (field: any) => {
            if (field === null || field === undefined) return '';
            const str = String(field);
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };

        const rows = allProducts.map(p => {
            const isDiscounted = p.regularPrice && p.price < p.regularPrice;
            return [
                p.id,
                escapeField(p.name),
                escapeField(p.description),
                escapeField(p.brand),
                isDiscounted ? p.price : '', // Sale Price only if discounted
                isDiscounted ? p.regularPrice : p.price, // Regular Price
                p.stock,
                escapeField(p.category),
                escapeField(p.tag || ''),
                escapeField(p.imageUrl)
            ].join(',');
        });

        const csvContent = "\uFEFF" + [headers.join(','), ...rows].join('\n'); // Add BOM for Excel compatibility
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'productos_vellaperfumeria_completo.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Encuentra productos específicos para el Mega Menú
    const productRiviera = allProducts.find(p => p.id === 41070); 
    const productAzur = allProducts.find(p => p.id === 47502); 
    const productFloral = allProducts.find(p => p.id === 47514);

    const promoCols = [
        {
            bannerImg: "https://media-cdn.oriflame.com/contentImage?externalMediaId=eb8edbeb-1ff0-427f-878c-8b23062b1aa6&name=Promo_split_single_1&inputFormat=jpg",
            title: "Un viaje a la Riviera para ella",
            featuredProduct: productRiviera,
            link: "skincare"
        },
        {
            bannerImg: "https://media-cdn.oriflame.com/contentImage?externalMediaId=bda12c88-dee7-425a-9a32-8414adcf7d9f&name=Promo_split_single_2&inputFormat=jpg",
            title: "Azur refinado para él",
            featuredProduct: productAzur,
            link: "men"
        },
        {
            bannerImg: "https://media-cdn.oriflame.com/contentImage?externalMediaId=86cb5734-1101-4601-8161-e170f0cfbdd0&name=Promo_split_single_3&inputFormat=jpg",
            title: "Un aroma floral para estas fiestas",
            featuredProduct: productFloral,
            link: "perfume"
        }
    ];

    return (
        <header className="sticky top-0 z-30 shadow-sm flex flex-col">
            {/* Top Bar (Pink) */}
            <div className="bg-[#f78df6] bg-opacity-90 text-black py-1 text-[10px] font-medium border-b border-white/20">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <span className="cursor-pointer hover:opacity-75 transition-opacity" aria-label="Threads"><ThreadsIcon /></span>
                        <span className="cursor-pointer hover:opacity-75 transition-opacity" aria-label="Instagram"><InstagramIcon /></span>
                        <span className="cursor-pointer hover:opacity-75 transition-opacity" aria-label="Facebook"><FacebookIcon /></span>
                        <span className="cursor-pointer hover:opacity-75 transition-opacity" aria-label="WhatsApp"><WhatsAppIcon /></span>
                    </div>
                    <div className="hidden md:block text-center tracking-wide">
                        <span className="font-bold">BLACK FRIDAY</span> | ENVÍO GRATIS +35€
                    </div>
                    <div className="w-10"></div>
                </div>
            </div>

            {/* Main Header Area (White Background) */}
            <div className="bg-white w-full relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-3 h-20 md:h-24 relative">
                        
                        {/* Left Actions */}
                        <div className="flex items-center w-1/3">
                             {/* Mobile Menu Button - Black Background */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                                aria-label="Menú"
                                className="md:hidden bg-black text-white p-2 rounded-md border border-gray-700 hover:bg-gray-800 transition-colors"
                            >
                                <MenuIcon />
                            </button>

                            <div className="hidden md:flex items-center space-x-3 text-black">
                                <select
                                    value={currency}
                                    onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                                    className="text-xs font-bold bg-transparent border-none focus:ring-0 cursor-pointer text-black"
                                    aria-label="Moneda"
                                >
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>
                        </div>

                        {/* Center Logo */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                            <button onClick={() => onNavigate('home')} className="block hover:opacity-80 transition-opacity">
                                <img 
                                    src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                    alt="Vellaperfumeria" 
                                    className="h-24 md:h-32 w-auto" 
                                />
                            </button>
                        </div>

                        {/* Right Actions (Cart) */}
                        <div className="flex items-center justify-end w-1/3 gap-3">
                            <button onClick={onCartClick} className="relative text-black hover:text-gray-600 transition-colors" aria-label="Carrito">
                                <CartIcon />
                                {cartCount > 0 && (
                                    <span key={cartCount} className={`absolute -top-2 -right-2 bg-[#f78df6] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-black shadow-sm ${cartPulse ? 'animate-pop' : ''}`}>
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Width Black Nav Bar with Mega Menu */}
            <div className="hidden md:block bg-black w-full border-t border-gray-800 relative group/nav">
                <div className="container mx-auto px-4 h-full">
                    <nav className="flex justify-center items-center gap-10 h-12">
                        <MenuLink onClick={() => onNavigate('home')}>Inicio</MenuLink>
                        
                        {/* Dropdown for Tienda (Mega Menu) - Full Width Black */}
                        <div className="h-full flex items-center group/tienda">
                            <button className="text-sm font-bold text-white hover:text-[#f78df6] transition-colors duration-200 uppercase tracking-wide flex items-center gap-1 h-full cursor-default">
                                Tienda <ChevronDownIcon />
                            </button>
                            
                            {/* Mega Menu Dropdown Container */}
                            <div className="absolute top-full left-0 w-full bg-black border-t border-gray-800 shadow-2xl opacity-0 invisible group-hover/tienda:opacity-100 group-hover/tienda:visible transition-all duration-300 z-50 transform origin-top">
                                <div className="container mx-auto px-4 py-8">
                                    <div className="flex gap-8">
                                        
                                        {/* Column 1: Navigation Links */}
                                        <div className="w-1/4 border-r border-gray-800 pr-6">
                                            <h4 className="text-[#f78df6] font-bold mb-4 uppercase tracking-wider text-xs border-b border-gray-800 pb-2">Explorar</h4>
                                            <ul className="space-y-3">
                                                <li><button onClick={() => onNavigate('products', 'all')} className="text-gray-300 hover:text-white text-sm transition-colors hover:translate-x-1 duration-200 block text-left w-full">Ver Todo</button></li>
                                                <li><button onClick={() => onNavigate('products', 'skincare')} className="text-gray-300 hover:text-white text-sm transition-colors hover:translate-x-1 duration-200 block text-left w-full">Cuidado Facial</button></li>
                                                <li><button onClick={() => onNavigate('products', 'makeup')} className="text-gray-300 hover:text-white text-sm transition-colors hover:translate-x-1 duration-200 block text-left w-full">Maquillaje</button></li>
                                                <li><button onClick={() => onNavigate('products', 'perfume')} className="text-gray-300 hover:text-white text-sm transition-colors hover:translate-x-1 duration-200 block text-left w-full">Fragancias</button></li>
                                                <li><button onClick={() => onNavigate('products', 'wellness')} className="text-gray-300 hover:text-white text-sm transition-colors hover:translate-x-1 duration-200 block text-left w-full">Wellness</button></li>
                                                <li><button onClick={() => onNavigate('products', 'men')} className="text-gray-300 hover:text-white text-sm transition-colors hover:translate-x-1 duration-200 block text-left w-full">Hombre</button></li>
                                            </ul>
                                        </div>
                                        
                                        {/* Columns 2-4: Visual Banners from User HTML */}
                                        <div className="w-3/4 grid grid-cols-3 gap-6">
                                            {promoCols.map((promo, idx) => (
                                                <div key={idx} className="flex flex-col h-full group/card cursor-pointer" onClick={() => onNavigate('products', promo.link)}>
                                                    <div className="relative overflow-hidden rounded-lg border border-gray-800 aspect-[3/4] mb-3">
                                                        <img 
                                                            src={promo.bannerImg} 
                                                            alt={promo.title} 
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 opacity-80 group-hover/card:opacity-100" 
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                                                        
                                                        {promo.featuredProduct && (
                                                            <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 bg-black/80 backdrop-blur-sm border-t border-gray-700">
                                                                <div className="flex items-center gap-3">
                                                                    <img src={promo.featuredProduct.imageUrl} className="w-10 h-10 object-contain rounded bg-white" alt="" />
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-white text-xs font-bold truncate">{promo.featuredProduct.name}</p>
                                                                        <p className="text-[#f78df6] text-xs font-bold">{promo.featuredProduct.price} €</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        
                                                        <div className="absolute top-2 right-2">
                                                            <span className="bg-[#f78df6] text-black text-[10px] font-bold px-2 py-1 rounded">NUEVO</span>
                                                        </div>
                                                    </div>
                                                    <h3 className="text-white font-bold text-sm leading-tight group-hover/card:text-[#f78df6] transition-colors">{promo.title}</h3>
                                                    <p className="text-gray-500 text-xs mt-1">Descubre la colección</p>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <MenuLink onClick={() => onNavigate('ofertas')}>Ofertas</MenuLink>
                        <MenuLink onClick={() => onNavigate('catalog')}>Catálogo</MenuLink>
                        <MenuLink onClick={() => onNavigate('ia')}>Asistente IA</MenuLink>
                        <MenuLink onClick={() => onNavigate('blog')}>Blog</MenuLink>
                        {/* Dynamic Download Button */}
                        <button onClick={generateAndDownloadCsv} className="text-sm font-bold text-gray-400 hover:text-white border border-gray-700 px-3 py-1 rounded uppercase tracking-wide flex items-center gap-2 transition-colors">
                             <CsvIcon /> Descargar CSV
                        </button>
                    </nav>
                </div>
            </div>

            {isMobileMenuOpen && (
                 <div ref={navRef} className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-pink-100 z-20 animate-fade-in">
                     <nav className="flex flex-col p-4 divide-y divide-gray-100 text-black">
                         <NavLink onClick={() => handleMobileNav('home')} className="py-3">Inicio</NavLink>
                         <NavLink onClick={() => handleMobileNav('products', 'all')} className="py-3 font-bold text-brand-purple-dark">Tienda - Ver Todo</NavLink>
                         <NavLink onClick={() => handleMobileNav('products', 'skincare')} className="py-3 pl-4 text-sm text-gray-600">Cuidado Facial</NavLink>
                         <NavLink onClick={() => handleMobileNav('products', 'makeup')} className="py-3 pl-4 text-sm text-gray-600">Maquillaje</NavLink>
                         <NavLink onClick={() => handleMobileNav('products', 'hair')} className="py-3 pl-4 text-sm text-gray-600">Cuidado Capilar</NavLink>
                         <NavLink onClick={() => handleMobileNav('products', 'perfume')} className="py-3 pl-4 text-sm text-gray-600">Fragancias</NavLink>
                         <NavLink onClick={() => handleMobileNav('products', 'wellness')} className="py-3 pl-4 text-sm text-gray-600">Wellness</NavLink>
                         <NavLink onClick={() => handleMobileNav('ofertas')} className="py-3">Ofertas y Regalos</NavLink>
                         <NavLink onClick={() => handleMobileNav('catalog')} className="py-3">Catálogo Digital</NavLink>
                         <NavLink onClick={() => handleMobileNav('ia')} className="py-3">Asistente IA</NavLink>
                         <NavLink onClick={() => handleMobileNav('blog')} className="py-3">Blog</NavLink>
                         <button onClick={() => { generateAndDownloadCsv(); setIsMobileMenuOpen(false); }} className="py-3 text-brand-purple-dark flex items-center gap-2 font-bold uppercase text-sm">
                            <CsvIcon /> Descargar CSV
                         </button>
                     </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
