
import React, { useState, useRef } from 'react';
import { allProducts } from './products';
import type { Product } from './types';

const ShadeSelectorPage: React.FC<{ onProductSelect: (p: Product) => void }> = ({ onProductSelect }) => {
    const [mode, setMode] = useState<'selection' | 'diagnostic' | 'virtual'>('selection');
    const [step, setStep] = useState(1);
    const [skinTone, setSkinTone] = useState<string | null>(null);
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
            alert("No se pudo acceder a la cámara. Puedes continuar con el Diagnóstico Personalizado.");
            setMode('diagnostic');
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

    const getRecommendation = () => {
        if (skinTone === 'light') return allProducts.filter(p => [43243, 43244, 42101].includes(p.id));
        if (skinTone === 'medium') return allProducts.filter(p => [43245, 43246].includes(p.id));
        return allProducts.filter(p => [43247, 43248].includes(p.id));
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 min-h-[70vh] flex flex-col">
                {/* Header del Selector */}
                <div className="bg-black p-10 text-center text-white">
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-2">Shade Finder Pro</h1>
                    <p className="text-[#E29CD2] text-sm font-bold tracking-[3px]">GIORDANI GOLD • TU ESPACIO, TU ESENCIA</p>
                </div>

                <div className="flex-grow flex flex-col">
                    {mode === 'selection' && (
                        <div className="p-12 flex flex-col items-center justify-center h-full animate-fade-in text-center">
                            <h2 className="text-3xl font-bold mb-6 text-black">¿Cómo quieres encontrar tu tono?</h2>
                            <p className="text-gray-500 mb-12 max-w-md mx-auto">Utiliza nuestro diagnóstico profesional para un resultado preciso o prueba nuestra tecnología de cámara en tiempo real.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                                {/* Opción Diagnóstico (Typeform) */}
                                <button 
                                    onClick={() => setMode('diagnostic')}
                                    className="group p-8 border-2 border-gray-100 rounded-3xl hover:border-[#E29CD2] transition-all bg-gray-50 flex flex-col items-center shadow-sm"
                                >
                                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                    </div>
                                    <h3 className="font-black text-xl uppercase mb-2">Diagnóstico Personalizado</h3>
                                    <p className="text-sm text-gray-600 italic">Asistente interactivo "Tu Maquillaje"</p>
                                </button>

                                {/* Opción Probador Virtual (Camera) */}
                                <button 
                                    onClick={() => { setMode('virtual'); startCamera(); }}
                                    className="group p-8 border-2 border-gray-100 rounded-3xl hover:border-[#E29CD2] transition-all bg-gray-50 flex flex-col items-center shadow-sm"
                                >
                                    <div className="w-16 h-16 bg-[#E29CD2] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <h3 className="font-black text-xl uppercase mb-2">Probador Virtual</h3>
                                    <p className="text-sm text-gray-600 italic">Detección de tono por cámara</p>
                                </button>
                            </div>
                        </div>
                    )}

                    {mode === 'diagnostic' && (
                        <div className="flex-grow relative h-[600px] animate-fade-in">
                            <button 
                                onClick={() => setMode('selection')}
                                className="absolute top-4 left-4 z-10 bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase"
                            >
                                ← Volver
                            </button>
                            <iframe 
                                src="https://3xod3bmqf5s.typeform.com/TuMaquillaje" 
                                title="Diagnóstico de Maquillaje"
                                className="w-full h-full border-none"
                                allow="camera; microphone; autoplay; encrypted-media;"
                            />
                        </div>
                    )}

                    {mode === 'virtual' && (
                        <div className="p-10 animate-fade-in">
                            <div className="flex justify-between items-center mb-8">
                                <button onClick={() => { stopCamera(); setMode('selection'); }} className="text-xs font-black uppercase flex items-center gap-1">← Atrás</button>
                                <span className="bg-red-500 text-white px-2 py-1 rounded text-[10px] font-bold animate-pulse">EN VIVO</span>
                            </div>

                            {step === 1 && (
                                <div className="text-center">
                                    <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border-4 border-[#E29CD2] shadow-2xl mx-auto mb-10">
                                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                                        <div className="absolute inset-0 border-[60px] border-black/40 pointer-events-none">
                                            <div className="w-full h-full border-2 border-dashed border-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-6">Selecciona tu tono visual</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {['light', 'medium', 'tan', 'deep'].map(t => (
                                            <button 
                                                key={t} 
                                                onClick={() => handleToneSelect(t)}
                                                className="p-4 border-2 border-gray-100 rounded-2xl hover:border-black transition-all bg-white"
                                            >
                                                <div className={`w-12 h-12 rounded-full mx-auto mb-2 ${t === 'light' ? 'bg-[#F9E4D4]' : t === 'medium' ? 'bg-[#E9C4A6]' : t === 'tan' ? 'bg-[#D4A373]' : 'bg-[#8B5E3C]'}`} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{t === 'light' ? 'Claro' : t === 'medium' ? 'Medio' : t === 'tan' ? 'Bronceado' : 'Intenso'}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="text-center animate-scale-in">
                                    <h2 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">¡Match Perfecto!</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {getRecommendation().map(p => (
                                            <div key={p.id} className="bg-gray-50 p-6 rounded-3xl border border-gray-200 flex flex-col items-center">
                                                <img src={p.imageUrl} alt="" className="w-40 h-40 object-contain mb-4 mix-blend-multiply" />
                                                <p className="text-xs font-black text-gray-400 mb-1">CÓDIGO {p.id}</p>
                                                <h3 className="font-bold text-lg mb-4">{p.name}</h3>
                                                <button onClick={() => onProductSelect(p)} className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all uppercase tracking-widest text-xs">Comprar Ahora</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => setStep(1)} className="mt-10 text-xs font-black underline uppercase">Reiniciar Escaneo</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer del Hub */}
                <div className="bg-gray-50 border-t border-gray-100 p-6 text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[2px]">Toda la gama Eternal Glow SPF 25 disponible para tu tipo de piel</p>
                </div>
            </div>
        </div>
    );
};

export default ShadeSelectorPage;
