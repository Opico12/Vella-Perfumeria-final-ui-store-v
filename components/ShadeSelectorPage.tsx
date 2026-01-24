
import React, { useState, useRef } from 'react';
import { allProducts } from './products';
import type { Product } from './types';

const ShadeSelectorPage: React.FC<{ onProductSelect: (p: Product) => void }> = ({ onProductSelect }) => {
    const [step, setStep] = useState(1);
    const [skinTone, setSkinTone] = useState<string | null>(null);
    const [undertone, setUndertone] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);

    const startCamera = async () => {
        setIsCameraActive(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("No se pudo acceder a la cámara. Puedes continuar seleccionando manualmente.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
        setIsCameraActive(false);
    };

    const handleToneSelect = (tone: string) => {
        setSkinTone(tone);
        setStep(2);
    };

    const handleUndertoneSelect = (under: string) => {
        setUndertone(under);
        setStep(3);
        if (isCameraActive) stopCamera();
    };

    const getRecommendation = () => {
        // Lógica simplificada de recomendación basada en los códigos Giordani Gold proporcionados
        if (skinTone === 'light') {
            return allProducts.filter(p => [43243, 43244, 42102].includes(p.id));
        } else if (skinTone === 'medium') {
            return allProducts.filter(p => [43245, 43246, 42105].includes(p.id));
        }
        return allProducts.filter(p => [43247, 43248, 42107].includes(p.id));
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-black p-8 text-center text-white">
                    <h1 className="text-3xl font-black uppercase tracking-tighter italic">Virtual Shade Finder</h1>
                    <p className="text-brand-purple text-sm font-bold mt-2">GIORDANI GOLD • PROFESSIONAL MATCH</p>
                </div>

                <div className="p-8">
                    {step === 1 && (
                        <div className="animate-fade-in">
                            <h2 className="text-2xl font-bold text-center mb-8">Paso 1: ¿Cuál es tu tono de piel?</h2>
                            
                            <div className="flex flex-col items-center mb-8">
                                {!isCameraActive ? (
                                    <button 
                                        onClick={startCamera}
                                        className="mb-6 flex items-center gap-2 bg-brand-purple text-black px-6 py-3 rounded-full font-bold hover:bg-brand-purple-dark transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Activar Probador Virtual
                                    </button>
                                ) : (
                                    <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border-4 border-brand-purple shadow-xl mb-6">
                                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                                        <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none">
                                            <div className="w-full h-full border-2 border-dashed border-white rounded-full"></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { id: 'light', label: 'Claro', color: '#F9E4D4' },
                                    { id: 'medium', label: 'Medio', color: '#E9C4A6' },
                                    { id: 'tan', label: 'Bronceado', color: '#D4A373' },
                                    { id: 'deep', label: 'Intenso', color: '#8B5E3C' }
                                ].map(t => (
                                    <button 
                                        key={t.id} 
                                        onClick={() => handleToneSelect(t.id)}
                                        className="group flex flex-col items-center p-4 border-2 border-transparent hover:border-black rounded-2xl transition-all"
                                    >
                                        <div className="w-16 h-16 rounded-full shadow-inner mb-2" style={{ backgroundColor: t.color }}></div>
                                        <span className="font-bold uppercase text-xs">{t.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in">
                            <button onClick={() => setStep(1)} className="text-xs font-bold uppercase mb-4 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7" /></svg>
                                Volver
                            </button>
                            <h2 className="text-2xl font-bold text-center mb-8">Paso 2: ¿Cuál es tu subtono?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { id: 'cool', label: 'Frío', desc: 'Venas azuladas, te quemas fácil.', color: 'from-pink-100 to-pink-200' },
                                    { id: 'neutral', label: 'Neutro', desc: 'Venas verdes/azules, bronceado gradual.', color: 'from-gray-100 to-gray-200' },
                                    { id: 'warm', label: 'Cálido', desc: 'Venas verdosas, te bronceas rápido.', color: 'from-yellow-100 to-amber-100' }
                                ].map(u => (
                                    <button 
                                        key={u.id}
                                        onClick={() => handleUndertoneSelect(u.id)}
                                        className={`p-6 rounded-2xl border-2 border-gray-100 hover:border-black transition-all text-center bg-gradient-to-br ${u.color}`}
                                    >
                                        <h3 className="font-black uppercase mb-2">{u.label}</h3>
                                        <p className="text-xs text-gray-600 leading-tight">{u.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in text-center">
                            <h2 className="text-3xl font-black mb-2 uppercase italic">¡Tu match perfecto!</h2>
                            <p className="text-gray-500 mb-8 font-medium">Basado en tu selección para Giordani Gold Eternal Glow</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                {getRecommendation().map(p => (
                                    <div key={p.id} className="bg-gray-50 p-6 rounded-3xl border border-gray-200 flex flex-col items-center">
                                        <img src={p.imageUrl} alt={p.name} className="w-48 h-48 object-contain mb-4 mix-blend-multiply" />
                                        <span className="text-[10px] font-black bg-black text-white px-2 py-1 rounded mb-2">REF: {p.id}</span>
                                        <h3 className="font-bold text-lg leading-tight mb-4 uppercase">{p.name}</h3>
                                        <button 
                                            onClick={() => onProductSelect(p)}
                                            className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm"
                                        >
                                            Ver Producto
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button 
                                onClick={() => setStep(1)}
                                className="mt-12 text-sm font-black underline uppercase hover:text-brand-purple-dark"
                            >
                                Reiniciar Test
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShadeSelectorPage;
