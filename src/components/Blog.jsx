import React, { useState } from 'react';

const Blog = () => {
    const [expanded, setExpanded] = useState(Array(5).fill(false));

    const toggleExpand = (index) => {
        setExpanded(expanded.map((item, idx) => (idx === index ? !item : item)));
    };

    const blogs = [
        {
            title: "Top 10 Gadgets pour 2024",
            description: "Des téléphones pliables et des lunettes intelligentes aux wearables alimentés par IA, découvrez les gadgets technologiques qui font sensation cette année. Nous avons sélectionné les derniers appareils qui redéfinissent la commodité et la connectivité, y compris des gadgets qui prennent en charge les maisons intelligentes, le suivi de la santé et le divertissement mobile amélioré.",
            date: "25 octobre 2024",
            fullText: "Des téléphones pliables et des lunettes intelligentes aux wearables alimentés par IA, découvrez les gadgets technologiques qui font sensation cette année. Nous avons sélectionné les derniers appareils qui redéfinissent la commodité et la connectivité, y compris des gadgets qui prennent en charge les maisons intelligentes, le suivi de la santé et le divertissement mobile amélioré. Obtenez des informations sur les raisons pour lesquelles ces gadgets sont en tête des charts et comment ils peuvent s'intégrer dans votre mode de vie."
        },
        {
            title: "Essentiels pour une Maison Intelligente",
            description: "Transformez votre espace de vie avec les essentiels pour une maison intelligente. Ce guide couvre tout ce dont vous avez besoin, des haut-parleurs intelligents et de l'éclairage aux systèmes de sécurité et aux thermostats automatisés, conçus pour s'intégrer parfaitement aux besoins de la vie moderne et amener votre maison dans le futur.",
            date: "18 octobre 2024",
            fullText: "Transformez votre espace de vie avec les essentiels pour une maison intelligente. Ce guide couvre tout ce dont vous avez besoin, des haut-parleurs intelligents et de l'éclairage aux systèmes de sécurité et aux thermostats automatisés. Découvrez quels produits sont indispensables et comment ils peuvent élever vos routines quotidiennes, offrant confort et contrôle à portée de main."
        },
        {
            title: "L'Avenir de l'IA dans l'Électronique Grand Public",
            description: "L'intelligence artificielle transforme rapidement notre interaction avec la technologie. Cet article explore les appareils alimentés par l'IA, comme les assistants vocaux, les téléviseurs intelligents et les trackers de santé, révélant l'impact futur potentiel sur la commodité et la productivité.",
            date: "15 octobre 2024",
            fullText: "L'intelligence artificielle transforme rapidement notre interaction avec la technologie. Des assistants personnels activés par la voix aux téléviseurs intelligents alimentés par l'IA et aux trackers de santé portables, cet article explore l'avenir de l'IA dans l'électronique grand public et son rôle dans la création d'appareils plus intelligents et intuitifs. Découvrez comment l'IA peut redéfinir vos interactions quotidiennes et quelles nouvelles avancées attendre dans ce domaine."
        },
        {
            title: "Meilleurs Gadgets Technologiques Abordables",
            description: "À la recherche de technologie de qualité à petit prix ? Ce guide couvre des smartphones abordables, des écouteurs à réduction de bruit et des haut-parleurs portables qui ne videront pas votre portefeuille.",
            date: "10 octobre 2024",
            fullText: "Envie de technologie de pointe sans vous ruiner ? Nous avons rassemblé les meilleurs gadgets abordables qui ne compromettent pas la qualité. Découvrez des smartphones abordables, des écouteurs à réduction de bruit et des haut-parleurs portables qui sont parfaits pour les passionnés de technologie à petit budget. Apprenez comment vous pouvez profiter d'appareils de haute qualité avec une fonctionnalité exceptionnelle à une fraction du coût habituel."
        },
        {
            title: "Top 5 des Écouteurs Sans Fil de 2024",
            description: "Découvrez notre sélection des meilleurs écouteurs sans fil de 2024, offrant une qualité audio exceptionnelle, du confort et une autonomie de batterie pour les mélomanes et les athlètes.",
            date: "5 octobre 2024",
            fullText: "Restez sans fil et profitez d'un son cristallin avec notre sélection des meilleurs écouteurs sans fil de 2024. Nous examinons les meilleurs modèles pour leur qualité audio, leur confort, leur autonomie de batterie et leurs fonctionnalités intelligentes qui les rendent idéaux pour les mélomanes, les athlètes et les voyageurs. Découvrez quels écouteurs offrent la meilleure combinaison de son, de durabilité et de connectivité pour une expérience d'écoute sans faille."
        },
        {
            title: "Guide des Achats Technologiques Durables",
            description: "Découvrez comment faire des choix technologiques durables en 2024, en mettant l'accent sur les marques et produits écologiques ayant un impact environnemental réduit.",
            date: "30 septembre 2024",
            fullText: "Vous pensez à votre empreinte carbone ? Découvrez les choix technologiques durables en 2024, en mettant l'accent sur les marques et produits écologiques ayant un impact environnemental réduit. Des appareils économes en énergie aux gadgets fabriqués à partir de matériaux recyclables, apprenez à faire des achats technologiques qui soutiennent un avenir plus vert."
        },
        {
            title: "Technologie 5G : Quoi de Neuf en 2024",
            description: "Découvrez les dernières avancées en matière de 5G et comment elles façonnent une connectivité plus rapide et plus fiable dans les réseaux mobiles du monde entier.",
            date: "20 septembre 2024",
            fullText: "Avec la 5G de plus en plus disponible, cet article révèle les dernières avancées en matière de 5G et son impact sur la connectivité. Découvrez comment la 5G permet des vitesses de téléchargement plus rapides, améliore la latence et renforce la connectivité pour les réseaux mobiles du monde entier, en faisant une mise à niveau technologique essentielle pour des expériences internet sans faille en 2024."
        },
        {
            title: "Consoles de Jeux : Mises à Jour de la Prochaine Génération",
            description: "Un aperçu approfondi des nouvelles fonctionnalités et des améliorations de performance dans les dernières consoles de jeux, des mises à jour graphiques aux nouvelles expériences de jeu.",
            date: "10 septembre 2024",
            fullText: "Les consoles de jeux ont évolué de manière spectaculaire, et les derniers modèles de prochaine génération offrent des graphismes époustouflants et des expériences de jeu immersives. Cet article plonge dans les dernières fonctionnalités, y compris les mises à jour graphiques, une puissance de traitement plus rapide et de nouvelles capacités VR, offrant aux joueurs l'expérience interactive ultime en 2024."
        },
        {
            title: "Tendances Technologiques : Ce à Quoi S'attendre en 2025",
            description: "Préparez-vous aux innovations technologiques prévues pour 2025, des IA avancées aux écosystèmes de maison intelligente plus intégrés et aux technologies portables.",
            date: "1er septembre 2024",
            fullText: "L'avenir de la technologie s'annonce plus brillant que jamais. Cet article vous prépare aux principales innovations technologiques attendues en 2025, des applications d'IA plus avancées et des écosystèmes de maison intelligente intégrés aux technologies portables offrant des informations sur la santé et le bien-être. Découvrez ce qui attend le monde de l'électronique grand public et comment ces tendances peuvent façonner votre mode de vie."
        }
    ];
    

    return (
        <section className="container mx-auto py-10 px-4 max-w-screen-xl text-justify">
            <h1 className="text-4xl font-bold font-poppin uppercase text-center mb-12 text-black">Derniers Blogs</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                    <div 
                        key={index} 
                        className="bg-white rounded-lg shadow-lg p-6 transform hover:-translate-y-2 transition duration-300 hover:shadow-xl"
                    >
                        <h2 className="text-2xl font-semibold mb-2 text-[#333]">{blog.title}</h2>
                        <p className="text-gray-400 text-sm mb-4">{blog.date}</p>
                        <p className="text-gray-600 leading-relaxed">
                            {expanded[index] ? blog.fullText : blog.description}
                        </p>
                        <button 
                            onClick={() => toggleExpand(index)} 
                            className="mt-6 px-4 py-2 bg-[#097969] text-white rounded hover:bg-[#065f4a] transition duration-300 focus:outline-none"
                        >
                            {expanded[index] ? "Voir Moins" : "Lire Plus"}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blog;
