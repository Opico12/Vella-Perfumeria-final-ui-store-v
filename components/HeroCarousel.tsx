
import React, { useState, useEffect, useCallback } from 'react';
import type { View } from './types';

interface HeroCarouselProps {
    onNavigate: (view: View) => void;
}

const slides = [
    {
        imageUrl: 'https://media-cdn.oriflame.com/digitalPromotionsMedia/images/banner-media/ES/20899847/20866148.jpg',
        title: 'LUJO EN CADA DETALLE',
        subtitle: 'DESCUBRE EL TONO PERFECTO PARA TU PIEL CON GIORDANI GOLD',
        buttonText: 'BUSCAR MI TONO',
        view: 'shadeSelector' as View,
    },
    {
        imageUrl: 'https://media-cdn.oriflame.com/digitalPromotionsMedia/images/banner-media/ES/20900001/20866153.jpg',
        title: 'All or Nothing Amplified',
        subtitle: 'SIENTE EL PODER DE LA FRAGANCIA AMBARINA',
        buttonText: 'COMPRAR AHORA',
        view: 'products' as View,
    }
];

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);


const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, []);

    const prevSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="w-full h-[70vh] max-h-[600px] m-auto relative group rounded-3xl overflow-hidden shadow-2xl">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${slide.imageUrl})` }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-6">
                            <div className="max-w-xl text-center text-white bg-black/40 backdrop-blur-md p-10 rounded-2xl border border-white/20 shadow-2xl">
                                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-4 leading-none">{slide.title}</h2>
                                <p className="mb-8 text-sm md:text-base font-bold uppercase tracking-widest opacity-90">{slide.subtitle}</p>
                                <button
                                    onClick={() => onNavigate(slide.view)}
                                    className="bg-[#E29CD2] text-black font-black py-4 px-12 rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-105 uppercase tracking-widest text-xs"
                                >
                                    {slide.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Left Arrow */}
                <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors">
                    <button onClick={prevSlide} aria-label="Anterior diapositiva"><ChevronLeftIcon /></button>
                </div>
                {/* Right Arrow */}
                <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors">
                    <button onClick={nextSlide} aria-label="Siguiente diapositiva"><ChevronRightIcon /></button>
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;
