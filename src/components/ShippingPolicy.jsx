import React from 'react';

const ShippingPolicy = () => {
    return (
        <section className="container mx-auto py-12 px-6 max-w-screen-xl text-justify">
            <h1 className="text-3xl font-semibold text-center mb-8 font-poppin uppercase text-black">Politique d'Expédition</h1>
            <div className="space-y-6 text-gray-700 leading-relaxed">
                
                <p className="text-lg">
                    Nous travaillons dur pour vous livrer votre commande le plus rapidement possible ! Voici tout ce que vous devez savoir sur notre processus d'expédition, nos tarifs et nos délais.
                </p>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#097969]">Tarifs d'Expédition</h2>
                    <p>
                        Les tarifs d'expédition varient en fonction de votre emplacement et du mode d'expédition que vous choisissez lors du paiement. Vous pouvez consulter ces tarifs et sélectionner votre option préférée pendant le processus de commande. Les commandes de plus de <span className="font-bold">$50</span> bénéficient de la livraison standard gratuite.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#097969]">Délai de Traitement</h2>
                    <p>
                        Les commandes sont généralement traitées dans un délai de <span className="font-bold">1 à 2 jours ouvrables</span>. Pendant les périodes de forte demande, le traitement peut prendre un peu plus de temps, mais nous vous tiendrons informé en cas de retard.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#097969]">Expédition Domestique</h2>
                    <p>
                        Nous proposons plusieurs options d'expédition pour répondre à vos besoins :
                    </p>
                    <ul className="list-disc list-inside ml-4">
                        <li><span className="font-bold">Expédition Standard</span> : 5-7 jours ouvrables.</li>
                        <li><span className="font-bold">Expédition Express</span> : 2-3 jours ouvrables.</li>
                        <li><span className="font-bold">Livraison le Jour Suivant</span> : Disponible dans certaines localités pour les commandes passées avant 17 heures.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#097969]">Expédition Internationale</h2>
                    <p>
                        Nous expédions vers certains pays à l'international ! Les délais de livraison et les frais d'expédition varient en fonction de la destination. Veuillez noter que les expéditions internationales peuvent être soumises à des droits de douane, taxes ou frais supplémentaires à l'arrivée.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#097969]">Suivi de Commande</h2>
                    <p>
                        Une fois votre commande expédiée, nous vous enverrons un lien de suivi par e-mail. Vous pouvez utiliser ce lien pour suivre le trajet de votre commande depuis notre entrepôt jusqu'à votre porte. Pour tout problème de suivi, veuillez contacter notre <a href="/support" className="text-[#065f4a] underline">équipe d'Assistance Client</a> pour obtenir de l'aide.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#097969]">Colis Perdus ou Retardés</h2>
                    <p>
                        Si votre colis est retardé ou semble perdu, veuillez nous contacter dans un délai de <span className="font-bold">7 jours</span> à compter de la date de livraison prévue. Nous sommes là pour vous aider à vous assurer que vous recevez votre commande ou à obtenir le soutien nécessaire en cas de retard.
                    </p>
                </div>

                {/* <p className="text-center mt-8">
                    Si vous avez des questions concernant l'expédition, veuillez contacter notre <a href="/support" className="text-[#097969] underline">équipe d'Assistance Client</a>. Nous sommes là pour vous aider !
                </p> */}
            </div>
        </section>
    );
};

export default ShippingPolicy;
