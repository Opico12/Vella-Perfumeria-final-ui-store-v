
import React, { useState, useEffect, useCallback } from 'react';
// Types
import type { View, Product, CartItem } from './components/types';
import type { Currency } from './components/currency';
import { blogPosts } from './components/blogData';
// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ShopPage from './components/ShopPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartSidebar from './components/CartSidebar';
import OfertasPage from './components/OfertasPage';
import AsistenteIAPage from './components/AsistenteIAPage';
import CatalogPage from './components/CatalogPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import QuickViewModal from './components/QuickViewModal';
import Breadcrumbs, { type BreadcrumbItem } from './components/Breadcrumbs';
import CheckoutPage from './components/CheckoutPage';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ShadeSelectorPage from './components/ShadeSelectorPage';

type AppView = {
    current: View;
    payload?: any;
};

const App: React.FC = () => {
    const [view, setView] = useState<AppView>({ current: 'home' });
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [currency, setCurrency] = useState<Currency>('EUR');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('vellaperfumeria_cart');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('vellaperfumeria_cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [cartItems]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    const handleNavigate = useCallback((newView: View, payload?: any) => {
        setView({ current: newView, payload });
    }, []);

    const handleProductSelect = (product: Product) => {
        handleNavigate('productDetail', product);
    };

    const handleAddToCart = (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => {
        const cartItemId = selectedVariant 
            ? `${product.id}-${Object.values(selectedVariant).join('-')}`
            : `${product.id}`;
            
        const existingItem = cartItems.find(item => item.id === cartItemId);

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { id: cartItemId, product, quantity: 1, selectedVariant }]);
        }
        
        setIsCartOpen(true);
    };
    
    const handleQuickAddToCart = (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => {
        handleAddToCart(product, buttonElement, selectedVariant);
        if (!isCartOpen) setIsCartOpen(true);
    };

    const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemoveItem(cartItemId);
        } else {
            setCartItems(cartItems.map(item =>
                item.id === cartItemId ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const handleRemoveItem = (cartItemId: string) => {
        setCartItems(cartItems.filter(item => item.id !== cartItemId));
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    const handleCheckout = () => {
        setIsCartOpen(false);
        handleNavigate('checkout');
    };

    const handleSelectPost = (post: any) => {
        handleNavigate('blogPost', post);
    };

    const renderContent = () => {
        switch (view.current) {
            case 'home':
                return <ProductList onNavigate={handleNavigate} onProductSelect={handleProductSelect} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} currency={currency} onQuickView={setQuickViewProduct} />;
            case 'products':
                return <ShopPage initialCategory={view.payload || 'all'} currency={currency} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onProductSelect={handleProductSelect} onQuickView={setQuickViewProduct} />;
            case 'productDetail':
                return <ProductDetailPage product={view.payload} currency={currency} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onProductSelect={handleProductSelect} onQuickView={setQuickViewProduct} />;
            case 'ofertas':
                return <OfertasPage currency={currency} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onProductSelect={handleProductSelect} onQuickView={setQuickViewProduct} />;
            case 'ia':
                return <AsistenteIAPage />;
            case 'catalog':
                return <CatalogPage onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onProductSelect={handleProductSelect} onQuickView={setQuickViewProduct} currency={currency} />;
            case 'shadeSelector':
                return <ShadeSelectorPage onProductSelect={handleProductSelect} />;
            case 'blog':
                 return <BlogPage posts={blogPosts} onSelectPost={handleSelectPost} />;
            case 'blogPost':
                 return <BlogPostPage post={view.payload} allPosts={blogPosts} onSelectPost={handleSelectPost} onBack={() => handleNavigate('blog')} />;
            case 'checkout':
                return <CheckoutPage cartItems={cartItems} currency={currency} onClearCart={handleClearCart} onNavigate={handleNavigate} />;
            default:
                return <ProductList onNavigate={handleNavigate} onProductSelect={handleProductSelect} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} currency={currency} onQuickView={setQuickViewProduct} />;
        }
    };
    
    const buildBreadcrumbs = (): BreadcrumbItem[] => {
        const homeCrumb: BreadcrumbItem = { label: 'Inicio', onClick: () => window.location.href = 'https://vellaperfumeria.com' };
        const crumbs = [homeCrumb];

        switch(view.current) {
            case 'products':
                crumbs.push({ label: 'Tienda', onClick: () => handleNavigate('products', 'all') });
                break;
            case 'shadeSelector':
                crumbs.push({ label: 'Selector de Tono' });
                break;
            case 'productDetail':
                crumbs.push({ label: 'Tienda', onClick: () => handleNavigate('products', 'all') });
                crumbs.push({ label: (view.payload as Product).name });
                break;
            case 'checkout':
                crumbs.push({ label: 'Finalizar Compra' });
                break;
        }

        return crumbs;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header
                onNavigate={handleNavigate}
                currency={currency}
                onCurrencyChange={setCurrency}
                cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                onCartClick={() => setIsCartOpen(true)}
            />
             <main className="flex-grow py-8 mb-16 md:mb-0">
                <Breadcrumbs items={buildBreadcrumbs()} />
                {renderContent()}
            </main>
            <Footer onNavigate={handleNavigate} />
            <FloatingWhatsApp />

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                currency={currency}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
                isCheckingOut={false}
                checkoutError={null}
                onNavigate={handleNavigate}
            />

            {quickViewProduct && (
                <QuickViewModal
                    product={quickViewProduct}
                    currency={currency}
                    onClose={() => setQuickViewProduct(null)}
                    onAddToCart={handleAddToCart}
                    onProductSelect={(p) => {
                        setQuickViewProduct(null);
                        handleProductSelect(p);
                    }}
                />
            )}
            
            <style>{`
                :root {
                    --color-primary: #3a3a3a;
                    --color-secondary: #E0C3FC; 
                    --color-accent: #d1a892;
                }
                .bg-brand-purple { background-color: #E29CD2; } 
                .text-brand-purple { color: #E29CD2; }
                .bg-brand-purple-dark { background-color: #C079B0; }
                @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default App;
