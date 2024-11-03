import React from 'react';
import { FaShippingFast, FaClock, FaGlobe, FaBoxOpen, FaShieldAlt, FaGift } from 'react-icons/fa';

const DeliveryDetails = () => {
    return (
        <section className="container mx-auto py-16 px-6 md:px-12 max-w-screen-xl text-justify">
            <h1 className="text-4xl font-bold text-center mb-10 font-poppin uppercase text-black">Détails de Livraison</h1>
            <div className="rounded-lg shadow-lg p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed bg-gray-50">
                
                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaShippingFast className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Livraison Standard</h2>
                        <p>Livré dans un délai de 5 à 7 jours ouvrables. Idéal pour les commandes non urgentes. <span className="font-bold">Frais : 5,99 $</span>. <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">Gratuit pour plus de 50 $</span>.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaClock className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Livraison Express</h2>
                        <p>Recevez votre commande dans un délai de 2 à 3 jours ouvrables. <span className="font-bold">Frais : 14,99 $</span>. Disponible pour la plupart des articles et des emplacements.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaClock className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Livraison le Jour Même</h2>
                        <p>Disponible dans certaines localités pour les commandes passées avant 12h. <span className="font-bold">Frais : 19,99 $</span>. Parfait pour les besoins urgents.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaClock className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Livraison le Jour Suivant</h2>
                        <p>Disponible dans certaines localités pour les commandes passées avant 17h. <span className="font-bold">Frais : 17,99 $</span>. Idéal pour les articles sensibles au temps.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaGlobe className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Livraison Internationale</h2>
                        <p>Les délais de livraison varient, généralement de 7 à 15 jours ouvrables. Des frais de douane peuvent s'appliquer. Voir <a href="/international-policy" className="text-[#065f4a] underline">les détails de la politique</a>.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaBoxOpen className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Suivi de Commande</h2>
                        <p>Suivez votre commande via le lien dans votre e-mail ou visitez notre <a href="/track-order" className="text-[#065f4a] underline">page de Suivi de Commande</a>.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaShieldAlt className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Assurance de Colis</h2>
                        <p>Assurance facultative pour protéger contre la perte ou les dommages pendant le transport. Choisissez cette option lors du paiement pour plus de tranquillité d'esprit.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaGift className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Emballage Cadeau</h2>
                        <p>Emballage premium disponible sur demande. Les frais varient selon la taille du colis. Idéal pour les occasions spéciales.</p>
                    </div>
                </div>

                {/* <p className="text-center">
                    Pour toute demande, contactez notre <a href="/support" className="text-[#097969] underline">équipe d'Assistance Client</a>. Nous sommes là pour vous aider !
                </p> */}
            </div>
        </section>
    );
};

export default DeliveryDetails;
