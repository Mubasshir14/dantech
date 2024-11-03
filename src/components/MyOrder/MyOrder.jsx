import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader/Loader';
// import Dashboard from '../Dashboard/Dashboard';

const MyOrder = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://dantech-server.onrender.com/payment');
                setOrders(response.data || []);
            } catch (error) {
                setError('Erreur lors de la récupération des commandes');
                console.error('Erreur lors de la récupération des commandes :', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const myOrders = orders.filter(order => order.email === user.email);

    if (loading) return <Loader />;
    const statusTranslations = {
        "Pending": "En attente",
        "Shipped": "Expédié",
        "Delivered": "Livré",
        "Cancel": "Annulé"
    };
    
   
   
    

    return (
        <div>
            {/* <Dashboard /> */}
            <div className='max-w-screen-xl mx-auto min-h-[calc(100vh-250px)] p-4 md:p-8'>
                <div>
                    <div className="text-black font-bold text-xl md:text-2xl font-poppin uppercase text-center mb-8">Mes Commandes</div>
                    <div className="mx-auto shadow-md bg-white border border-gray-200">
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead>
                                        <tr className="bg-[#097969] text-white">
                                            <td className="py-2 px-4 uppercase font-bold">#</td>
                                            <td className="py-2 px-4 uppercase font-bold">Image</td>
                                            <td className="py-2 px-4 uppercase font-bold">Nom</td>
                                            <td className="py-2 px-4 uppercase font-bold">Prix</td>
                                            <td className="py-2 px-4 uppercase font-bold">Quantité</td>
                                            <td className="py-2 px-4 uppercase font-bold">ID de Paiement</td>
                                            <td className="py-2 px-4 uppercase font-bold">Montant</td>
                                            <td className="py-2 px-4 uppercase font-bold">Statut</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myOrders.length > 0 ? (
                                            myOrders.map((order, index) => (
                                                order.cart && Array.isArray(order.cart) ? (
                                                    order.cart.map((product, productIndex) => (
                                                        <tr key={`${order._id}-${product._id}`} className={`border-t ${productIndex === 0 ? 'bg-gray-100' : ''}`}>
                                                            <td className="py-2 px-4 text-[hsl(0,0%,8%)] font-bold">{index + 1}.{productIndex + 1}</td>
                                                            <td className="py-2 px-4">
                                                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover mx-auto" />
                                                            </td>
                                                            <td className="py-2 px-4 text-[#737373]">{product.name}</td>
                                                            <td className="py-2 px-4 text-[#737373]">${product.price}</td>
                                                            <td className="py-2 px-4 text-[#737373] text-center">{product.quantity}</td>
                                                            {productIndex === 0 && (
                                                                <>
                                                                    <td className="py-2 px-4 text-[#737373] uppercase">{order.tnxID}</td>
                                                                    <td className="py-2 px-4 text-[#737373] uppercase">${order.amount}</td>
                                                                    <td className="py-2 px-4 text-center text-black uppercase">
    <span className={`px-3 py-1 rounded text-white ${
        order.status === 'Shipped' ? 'bg-green-500' : 
        order.status === 'Pending' ? 'bg-yellow-500' : 
        'bg-red-500'
    }`}>
        {statusTranslations[order.status] || 'Attente'}
    </span>
</td>

                                                                </>
                                                            )}
                                                        </tr>
                                                    ))
                                                ) : null
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="py-2 px-4 text-center">Aucune commande trouvée</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrder;
