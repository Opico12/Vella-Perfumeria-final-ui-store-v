
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

const NavLink: React.FC<{ onClick?: () => void, children: React.ReactNode, className?: string }> = ({ onClick, children, className = "" }) => (
    <button 
        onClick={onClick} 
        className={`text-sm font-bold text-white hover:text-[#E29CD2] transition-colors duration-200 uppercase tracking-wide flex items-center gap-1 h-full px-6 ${className}`}
    >
        {children}
    </button>
);

interface HeaderProps {
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currency, onCurrencyChange, cartCount, onCartClick }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Productos destacados para el Mega Menú 2026
    const menuFeatured = allProducts.filter(p => [47511, 46060, 13659, 48954].includes(p.id));

    return (
        <header className="sticky top-0 z-50 flex flex-col w-full shadow-md">
            {/* Top Bar (Rosa Orquídea Claro #E29CD2) */}
            <div className="bg-[#E29CD2] text-black py-1.5 text-[10px] font-black border-b border-black/5">
                <div className="container mx-auto px-4 flex justify-between items-center uppercase tracking-widest">
                    <div className="flex items-center space-x-3">
                        <ThreadsIcon /> <InstagramIcon /> <FacebookIcon /> <WhatsAppIcon />
                    </div>
                    <div className="hidden md:block">
                        ¡BIENVENIDO AL CATÁLOGO 2026! ENVÍO GRATIS A PARTIR DE 35€
                    </div>
                    <div className="text-right font-black tracking-tight">VELLAPERFUMERIA</div>
                </div>
            </div>

            {/* Main Header (White) */}
            <div className="bg-white py-4 md:py-6 border-b border-gray-100">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Burger for Mobile */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <MenuIcon />
                    </button>

                    {/* Left Actions (Desktop) */}
                    <div className="hidden md:flex items-center w-1/4">
                        <select
                            value={currency}
                            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                            className="text-xs font-bold bg-transparent border-none focus:ring-0 cursor-pointer text-gray-800"
                        >
                            <option value="EUR">EUR (€)</option>
                            <option value="USD">USD ($)</option>
                            <option value="GBP">GBP (£)</option>
                        </select>
                    </div>

                    {/* Center Logo */}
                    <div className="flex-shrink-0">
                        <button onClick={() => onNavigate('home')} className="hover:opacity-90 transition-opacity">
                            <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria" 
                                className="h-20 md:h-28 w-auto mx-auto" 
                            />
                        </button>
                    </div>

                    {/* Right Actions (Cart) */}
                    <div className="flex items-center justify-end w-1/4">
                        <button onClick={onCartClick} className="relative p-2 text-gray-800 hover:text-[#E29CD2] transition-colors">
                            <CartIcon />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* FULL WIDTH BLACK NAV BAR WITH VISIBLE MEGA MENU */}
            <div className="hidden md:block bg-black w-full border-t border-gray-900 group/nav-container">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-center h-14 relative">
                        <NavLink onClick={() => onNavigate('home')}>Inicio</NavLink>

                        {/* Dropdown Tienda (Mega Menu Full Width) */}
                        <div className="h-full group/tienda">
                            <button className="text-sm font-bold text-white hover:text-[#E29CD2] transition-colors duration-200 uppercase tracking-wide flex items-center gap-1 h-full px-6">
                                Tienda <ChevronDownIcon />
                            </button>
                            
                            {/* Mega Menu Dropdown - FULL WIDTH BLACK */}
                            <div className="fixed top-auto left-0 w-full bg-black border-t border-gray-800 shadow-2xl opacity-0 invisible group-hover/tienda:opacity-100 group-hover/tienda:visible transition-all duration-300 z-50">
                                <div className="container mx-auto px-8 py-12">
                                    <div className="grid grid-cols-4 gap-12">
                                        
                                        {/* Columna 1: Categorías de Lujo */}
                                        <div className="flex flex-col space-y-4">
                                            <h3 className="text-[#E29CD2] text-xs font-black uppercase tracking-[2px] border-b border-gray-800 pb-2">Destacados 2026</h3>
                                            <button onClick={() => onNavigate('products', 'skincare')} className="text-white hover:text-[#E29CD2] text-sm text-left transition-colors font-medium">Cuidado Facial Premium</button>
                                            <button onClick={() => onNavigate('products', 'skincare')} className="text-white hover:text-[#E29CD2] text-sm text-left transition-colors font-medium">Línea Diamond Cellular</button>
                                            <button onClick={() => onNavigate('products', 'perfume')} className="text-white hover:text-[#E29CD2] text-sm text-left transition-colors font-medium">Fragancias Exclusive</button>
                                            <button onClick={() => onNavigate('products', 'makeup')} className="text-white hover:text-[#E29CD2] text-sm text-left transition-colors font-medium">Eternal Glow Giordani Gold</button>
                                        </div>

                                        {/* Columna 2: Regalar con Cariño */}
                                        <div className="flex flex-col space-y-4">
                                            <h3 className="text-[#E29CD2] text-xs font-black uppercase tracking-[2px] border-b border-gray-800 pb-2">Regalos & Accesorios</h3>
                                            <button onClick={() => onNavigate('products', 'accessories')} className="text-white hover:text-[#E29CD2] text-sm text-left transition-colors font-medium">Joyas Pearl Glitters of Love</button>
                                            <button onClick={() => onNavigate('products', 'accessories')} className="text-white hover:text-[#E29CD2] text-sm text-left transition-colors font-medium">Relojes Exclusive</button>
                                            <button onClick={() => onNavigate('products', 'accessories')} className="text-white hover:text-[#E29CD2] text-sm text-left transition-colors font-medium">Neceseres Premium</button>
                                            <button onClick={() => onNavigate('ofertas')} className="text-white hover:text-[#E29CD2] text-sm text-left transition-colors font-medium">Sets de Regalo Festive</button>
                                        </div>

                                        {/* Columna 3-4: Visuales y Enlaces Directos */}
                                        <div className="col-span-2 grid grid-cols-2 gap-4">
                                            {menuFeatured.slice(0, 4).map(prod => (
                                                <div 
                                                    key={prod.id} 
                                                    className="bg-gray-900 rounded-lg p-3 flex items-center gap-4 hover:bg-gray-800 cursor-pointer transition-colors border border-gray-800"
                                                    onClick={() => onNavigate('productDetail', prod)}
                                                >
                                                    <img src={prod.imageUrl} alt="" className="w-16 h-16 object-contain rounded bg-white p-1" />
                                                    <div className="min-w-0">
                                                        <p className="text-white text-[10px] font-bold truncate uppercase tracking-tight">{prod.name}</p>
                                                        <p className="text-[#E29CD2] text-xs font-black">{prod.price} €</p>
                                                        <span className="text-[9px] text-gray-500 font-bold underline">VER PRODUCTO</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <NavLink onClick={() => onNavigate('ofertas')}>Ofertas 2026</NavLink>
                        <NavLink onClick={() => onNavigate('catalog')}>Catálogo Digital</NavLink>
                        <NavLink onClick={() => onNavigate('ia')}>Asistente IA</NavLink>
                        <NavLink onClick={() => onNavigate('blog')}>Blog</NavLink>
                    </nav>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-black text-white w-full border-t border-gray-800">
                    <nav className="flex flex-col p-4 divide-y divide-gray-800">
                        <button onClick={() => {onNavigate('home'); setIsMobileMenuOpen(false)}} className="py-4 text-left font-bold uppercase tracking-wide">Inicio</button>
                        <button onClick={() => {onNavigate('products', 'all'); setIsMobileMenuOpen(false)}} className="py-4 text-left font-bold uppercase tracking-wide text-[#E29CD2]">Tienda 2026</button>
                        <button onClick={() => {onNavigate('ofertas'); setIsMobileMenuOpen(false)}} className="py-4 text-left font-bold uppercase tracking-wide">Ofertas Especiales</button>
                        <button onClick={() => {onNavigate('catalog'); setIsMobileMenuOpen(false)}} className="py-4 text-left font-bold uppercase tracking-wide">Catálogo Digital</button>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
