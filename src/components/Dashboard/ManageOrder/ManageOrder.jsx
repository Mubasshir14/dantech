import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Dashboard from '../Dashboard';
import Loader from '../../Loader/Loader';


const ManageOrder = () => {
    const [order, setOrder] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get('https://dantech-server.onrender.com/payment');
                setOrder(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrder();
    }, []);

    const statusTranslations = {
        "Pending": "En attente",
        "Shipped": "Expédié",
        "Delivered": "Livré",
        "Cancel": "Annulé"
    };


    const handleStatusUpdate = async (tnxID, newStatus) => {
        try {
            const response = await axios.patch(`https://dantech-server.onrender.com/payment/${tnxID}`, {
                status: newStatus
            });

            setOrder(prevOrders => prevOrders.map(order =>
                order.tnxID === tnxID ? { ...order, status: newStatus } : order
            ));
            const updatedOrder = order.find(o => o.tnxID === tnxID);

            await axios.post('https://dantech-server.onrender.com/notifications', {
                userID: updatedOrder.email,
                message: `Le statut de votre commande (${tnxID}) a été mis à jour en ${statusTranslations[newStatus] || newStatus}.`,
                date: new Date().toISOString(),

            });
            console.log(message);

        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut de la commande:", error);
        }
    };

    if (loading) return <Loader />

    return (
        <div>
            <Dashboard />
            <div className='max-w-screen-xl mx-auto -mt-20 md:-mt-28 mb-4'>
                <div>
                    <div className="text-black font-bold text-xl md:text-2xl font-poppin uppercase text-center mb-8">Gérer les commandes</div>
                    <div className=" mx-auto shadow-md bg-white border border-gray-200">
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
                                            <td className="py-2 px-4 uppercase font-bold">ID de paiement</td>
                                            <td className="py-2 px-4 uppercase font-bold">Montant</td>
                                            <td className="py-2 px-4 uppercase font-bold">Statut</td>
                                            <td className="py-2 px-4 uppercase font-bold">Action</td>
                                            <td className="py-2 px-4 uppercase font-bold">Voir</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {order.length > 0 ? order.map((order, index) => (
                                            order.cart && Array.isArray(order.cart) && order.cart.map((product, productIndex) => (
                                                <tr key={`${order._id}-${product._id}`} className={`border-t ${productIndex === 0 ? 'bg-gray-100' : ''}`}>
                                                    <td className="py-2 px-4 text-[hsl(0,0%,8%)] font-bold">{index + 1}.{productIndex + 1}</td>
                                                    <td className="py-2 px-4">
                                                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover mx-auto" />
                                                    </td>
                                                    <td className="py-2 px-4 text-[#737373]">{product.name}</td>
                                                    <td className="py-2 px-4 text-[#737373]">${product.price}</td>
                                                    <td className="py-2 px-4 text-[#737373]">{product.quantity}</td>
                                                    {productIndex === 0 && (
                                                        <>
                                                            <td className="py-2 px-4 text-[#737373] uppercase">{order.tnxID}</td>
                                                            <td className="py-2 px-4 text-[#737373] uppercase">${order.amount}</td>

                                                            <td className="py-2 px-4 text-xs text-center text-black uppercase">
                                                                <span className={`px-3  py-1 rounded text-xs text-white ${order.status === 'Shipped' ? 'bg-green-500' : order.status === 'Cancel' ? 'bg-red-500' : 'bg-[#097969]'}`}>
                                                                    {order.status === 'Shipped' ? 'Expédié' : order.status === 'Cancel' ? 'Annulé' : 'Attente'}
                                                                </span>
                                                            </td>
                                                            <td className="py-2 px-4 flex flex-col gap-2 text-[#737373] uppercase">
                                                                <button
                                                                    className="btn flex items-center border-green-600 btn-xs border-2 font-bold rounded-md"
                                                                    onClick={() => handleStatusUpdate(order.tnxID, 'Shipped')}
                                                                    disabled={order.status === 'Shipped' || order.status === 'Cancel'}
                                                                >
                                                                    <FcApprove className='text-xl ' />
                                                                    {/* <span className="ml-1">Approuvé</span> Button label in French */}
                                                                </button>
                                                                <button
                                                                    className="btn flex items-center border-red-600 btn-xs border-2 font-bold rounded-md"
                                                                    onClick={() => handleStatusUpdate(order.tnxID, 'Cancel')}
                                                                    disabled={order.status === 'Shipped' || order.status === 'Cancel'}
                                                                >
                                                                    <FcDisapprove className='text-xl ' />
                                                                    {/* <span className="ml-1">Annulé</span> Button label in French */}
                                                                </button>
                                                            </td>

                                                            <td className="py-2 px-4 text-[#737373] uppercase">
                                                                <Link to={`/payment/${order.tnxID}`}><FaEye /></Link>
                                                            </td>

                                                        </>
                                                    )}
                                                </tr>
                                            ))
                                        )) : (
                                            <tr>
                                                <td colSpan="8" className="py-4 text-center text-gray-500">No orders found.</td>
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

export default ManageOrder;
