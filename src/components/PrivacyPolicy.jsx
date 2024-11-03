import React from 'react';
import { FaUser, FaLock, FaUserShield, FaMailBulk } from 'react-icons/fa';

const PrivacyPolicy = () => {
    return (
        <section className="container mx-auto py-12 px-6 max-w-screen-xl text-justify">
            <h1 className="text-3xl font-semibold text-center mb-8 text-[#097969]">Politique de Confidentialité</h1>
            <div className="space-y-6 text-gray-700">
                
                <div className="flex items-center space-x-3">
                    <FaUser className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">1. Collecte d'Informations</h2>
                </div>
                <p className="ml-8">
                    Nous collectons des informations personnelles que vous fournissez, comme lorsque vous créez un compte, effectuez un achat ou vous abonnez à notre newsletter. Nous pouvons également rassembler des données sur vos interactions avec notre site Web pour améliorer nos services.
                </p>
                
                <div className="flex items-center space-x-3">
                    <FaMailBulk className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">2. Préférences de Communication</h2>
                </div>
                <p className="ml-8">
                    Vous pouvez recevoir des messages promotionnels et des mises à jour concernant vos commandes ou de nouveaux produits. Vous pouvez mettre à jour vos préférences de communication dans les paramètres de votre compte ou vous désinscrire en suivant le lien de désinscription dans nos e-mails.
                </p>
                
                <div className="flex items-center space-x-3">
                    <FaUserShield className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">3. Utilisation des Informations</h2>
                </div>
                <p className="ml-8">
                    Nous utilisons vos informations pour compléter les transactions, personnaliser votre expérience et améliorer nos services. Les analyses de données nous permettent d'offrir un contenu, des produits et des promotions pertinents adaptés à vos intérêts.
                </p>

                <div className="flex items-center space-x-3">
                    <FaLock className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">4. Sécurité des Informations</h2>
                </div>
                <p className="ml-8">
                    Nous utilisons des mesures de sécurité conformes aux normes de l'industrie, y compris le chiffrement, des serveurs sécurisés et le contrôle d'accès, pour protéger vos données personnelles. Une surveillance et des mises à jour régulières nous aident à prévenir tout accès non autorisé.
                </p>
                
                <div className="flex items-center space-x-3">
                    <FaUserShield className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">5. Partage de Données et Tiers</h2>
                </div>
                <p className="ml-8">
                    Vos données ne sont partagées que lorsque cela est nécessaire, par exemple avec des prestataires de services de confiance (par exemple, des processeurs de paiement et des services de livraison) pour compléter les transactions. Nous ne vendons pas vos informations personnelles à des tiers.
                </p>
                
                <div className="flex items-center space-x-3">
                    <FaUserShield className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">6. Conservation des Données et Accès</h2>
                </div>
                <p className="ml-8">
                    Nous conservons vos informations aussi longtemps que nécessaire pour remplir les objectifs décrits dans cette politique, sauf exigence contraire de la loi. Vous pouvez demander l'accès, la correction ou la suppression de vos données en nous contactant.
                </p>

                <p className="text-center mt-8">
                    Pour toute question ou préoccupation, veuillez contacter notre <a href="/support" className="text-[#097969] underline">équipe d'Assistance Client</a>.
                </p>
            </div>
        </section>
    );
};

export default PrivacyPolicy;
