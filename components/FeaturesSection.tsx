
import React from 'react';

const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-brand-purple-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 17a2 2 0 10-4 0 2 2 0 004 0zM19 17a2 2 0 10-4 0 2 2 0 004 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h2a1 1 0 001-1V7.572a1 1 0 00-.218-.671l-1.5-2.25a1 1 0 00-.868-.451H13v11z" />
    </svg>
);

const LockClosedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-brand-purple-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-brand-purple-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-brand-purple-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const FeaturesSection: React.FC = () => {
    return (
        <div className="bg-white border-y border-gray-100 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Feature 1 */}
                    <div className="flex flex-col items-center text-center p-4 transition-transform hover:-translate-y-1 duration-300">
                        <TruckIcon />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Envío Gratis</h3>
                        <p className="text-sm text-gray-600">
                            En pedidos superiores a 35€. Entrega rápida y segura en tu domicilio.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col items-center text-center p-4 transition-transform hover:-translate-y-1 duration-300">
                        <LockClosedIcon />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Pago 100% Seguro</h3>
                        <p className="text-sm text-gray-600">
                            Tus datos están protegidos. Aceptamos Bizum, Tarjeta y PayPal.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col items-center text-center p-4 transition-transform hover:-translate-y-1 duration-300">
                        <ShieldCheckIcon />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Garantía de Calidad</h3>
                        <p className="text-sm text-gray-600">
                            Productos auténticos de Oriflame. Satisfacción garantizada.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex flex-col items-center text-center p-4 transition-transform hover:-translate-y-1 duration-300">
                        <SupportIcon />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Atención Personalizada</h3>
                        <p className="text-sm text-gray-600">
                            ¿Dudas? Nuestro equipo de expertos en belleza está aquí para ayudarte.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;
