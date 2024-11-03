import React from 'react';

const About = () => {
    return (
        <section className="container mx-auto py-12 px-6 max-w-screen-xl text-justify">
            <h1 className="text-3xl font-semibold text-center mb-8 font-poppin uppercase ">À Propos de Nous</h1>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Bienvenue chez <span className="font-semibold">DANTECH</span> ! Depuis notre lancement en 2024, nous nous engageons à proposer une sélection premium d'électronique et d'accessoires conçus pour améliorer votre vie et vous garder connecté dans un monde numérique en constante évolution.
            </p>
            
            <h2 className="text-2xl font-semibold text-[#097969] mb-4">Notre Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Chez DANTECH, nous croyons que la technologie doit être accessible, fiable et innovante. Notre mission est de fournir des gadgets de haute qualité conçus pour durer, que ce soit pour le travail, le loisir ou tout autre besoin. Nous visons à donner à nos clients une technologie qui enrichit leurs expériences quotidiennes.
            </p>
            
            <h2 className="text-2xl font-semibold text-[#097969] mb-4">Pourquoi Choisir DANTECH ?</h2>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed mb-6">
                <li><span className="font-semibold">Assurance Qualité</span> : Chaque produit que nous proposons est soumis à des tests rigoureux pour garantir qu'il respecte nos normes élevées.</li>
                <li><span className="font-semibold">Service Axé sur le Client</span> : Nous priorisons votre satisfaction et offrons un support amical et compétent pour rendre votre expérience d'achat fluide.</li>
                <li><span className="font-semibold">Innovation</span> : Notre gamme de produits s'élargit constamment avec les dernières technologies et accessoires, vous permettant de rester à la pointe.</li>
                <li><span className="font-semibold">Large Sélection</span> : Des gadgets les plus récents aux marques de confiance, nous avons une gamme diversifiée d'électroniques pour s'adapter à tous les styles de vie.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#097969] mb-4">Rejoignez-Nous dans Cette Aventure Technologique</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Que vous soyez un passionné de technologie ou simplement à la recherche d'un accessoire fiable, DANTECH a quelque chose pour tout le monde. Explorez notre collection et découvrez des gadgets conçus pour compléter et améliorer votre vie quotidienne.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed">
                Vous avez des questions ou besoin d'aide ? N'hésitez pas à contacter notre équipe à tout moment – nous sommes là pour vous aider !
            </p>
        </section>
    );
};

export default About;
