import React from 'react';
import { FaRegHandshake, FaCreditCard, FaUndo, FaUserShield, FaShieldAlt, FaQuestionCircle } from 'react-icons/fa';

const TermsAndConditions = () => {
    return (
        <section className="container mx-auto py-12 px-4 max-w-screen-xl text-justify">
            <h1 className="text-3xl font-semibold text-center mb-8 font-poppin uppercase text-black">Conditions Générales</h1>
            <div className="space-y-6 text-gray-700">
                
                <div className="flex items-center space-x-3">
                    <FaRegHandshake className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">1. Acceptation des Conditions</h2>
                </div>
                <p className="ml-8">En accédant et en utilisant ce site, vous confirmez que vous acceptez de vous conformer à ces conditions générales. Veuillez les lire attentivement avant d'effectuer un achat.</p>
                
                <div className="flex items-center space-x-3">
                    <FaCreditCard className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">2. Paiement & Facturation</h2>
                </div>
                <p className="ml-8">Nous acceptons les principales cartes de crédit, PayPal et d'autres méthodes de paiement disponibles. Tous les paiements sont traités en toute sécurité. Veuillez vous assurer que vos informations de facturation sont exactes pour éviter tout retard.</p>
                
                <div className="flex items-center space-x-3">
                    <FaUndo className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">3. Retours & Remboursements</h2>
                </div>
                <p className="ml-8">Les retours sont acceptés dans les 30 jours suivant l'achat. Les articles doivent être inutilisés et dans leur emballage d'origine. Les remboursements seront crédités sur le mode de paiement d'origine dans les 5 à 7 jours ouvrables suivant la réception du retour.</p>

                <div className="flex items-center space-x-3">
                    <FaUserShield className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">4. Politique de Confidentialité</h2>
                </div>
                <p className="ml-8">Nous attachons une grande importance à votre vie privée. Les informations personnelles collectées sur ce site sont protégées et utilisées uniquement pour traiter vos commandes et améliorer nos services. Pour plus de détails, consultez notre <a href="/privacy-policy" className="text-[#065f4a] underline">Politique de Confidentialité</a>.</p>
                
                <div className="flex items-center space-x-3">
                    <FaShieldAlt className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">5. Sécurité</h2>
                </div>
                <p className="ml-8">Notre site utilise le chiffrement et des protocoles sécurisés pour protéger vos informations. Cependant, nous vous recommandons de prendre des mesures pour protéger vos comptes en ligne, telles que choisir des mots de passe forts et les garder privés.</p>

                <div className="flex items-center space-x-3">
                    <FaQuestionCircle className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">6. Changements aux Conditions</h2>
                </div>
                <p className="ml-8">Nous pouvons mettre à jour ces conditions de temps à autre. Les changements seront publiés sur cette page. En continuant à utiliser notre site, vous acceptez les conditions révisées.</p>
                
                {/* <p className="text-center mt-8">
                    Pour toute question, veuillez contacter notre équipe de <a href="/support" className="text-[#097969] underline">Service Client</a>. Nous sommes là pour vous aider !
                </p> */}
            </div>
        </section>
    );
};

export default TermsAndConditions;
