import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import Loader from '../Loader/Loader';

const OrderDetails = () => {
    const { tnxID } = useParams(); 
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`https://dantech-server.onrender.com/payment/${tnxID}`);
                setOrder(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [tnxID]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Détails de la Commande', 10, 10); // Order Details in French
        
        // Order Information
        doc.text(`ID de la Commande: ${order.tnxID}`, 10, 20); // Order ID
        doc.text(`Statut: ${order.status}`, 10, 30); // Status
        doc.text(`Montant: $${order.amount}`, 10, 40); // Amount
        doc.text(`Créé le: ${new Date(order.createdAt).toLocaleString()}`, 10, 50); // Created At
        doc.text(`Nom: ${order.name}`, 10, 60); // Name
        doc.text(`Email: ${order.email}`, 10, 70); // Email
        doc.text(`Adresse: ${order.address}`, 10, 80); // Address
        
        // Cart Items
        doc.text('Articles dans le Panier:', 10, 90); // Cart Items
        order.cart.forEach((item, index) => {
            const y = 100 + index * 30;
            doc.text(`Nom du Produit: ${item.name}`, 10, y); // Product Name
            doc.text(`Prix: $${item.price}`, 10, y + 10); // Price
        });

        doc.save('détails-de-la-commande.pdf'); // Save the PDF with a French filename
    };

    if (loading) return <Loader />;
    if (error) return <div className="text-center py-4 text-red-500">Erreur: {error}</div>; // Error message in French
    const statusTranslations = {
        "Pending": "En attente",
        "Shipped": "Expédié",
        "Delivered": "Livré",
        "Cancel": "Annulé"
    };
    
    return (
        <div className="flex flex-col items-center p-6 bg-gray-100">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-poppin text-black font-bold mb-4">Détails de la Commande</h1> {/* Order Details */}
                {order ? (
                    <>
                        <div className="mb-6">
                            <p className="mb-2 uppercase"><strong>ID de la Commande:</strong> {order.tnxID}</p> {/* Order ID */}
                            <p className="mb-2 uppercase">
    <strong>Statut :</strong> {statusTranslations[order.status] || 'Attente'}
</p>
                            <p className="mb-2 uppercase"><strong>Montant:</strong> ${order.amount}</p> {/* Amount */}
                            <p className="mb-2 uppercase"><strong>Nom:</strong> {order.name}</p> {/* Name */}
                            <p className="mb-2 "><strong className='uppercase'>Email:</strong> {order.email}</p> {/* Email */}
                            <p className="mb-2 uppercase"><strong>Adresse:</strong> {order.address}</p> {/* Address */}
                        </div>

                        <h2 className="text-xl font-semibold mb-4">Articles dans le Panier:</h2> {/* Cart Items */}
                        {order.cart.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {order.cart.map(item => (
                                    <div key={item._id} className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
                                        <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-md mb-4" />
                                        <div className="text-sm">
                                            <p className="font-semibold mb-1"><strong>Nom du Produit:</strong> {item.name}</p> {/* Product Name */}
                                            <p className="mb-1"><strong>Prix:</strong> ${item.price}</p> {/* Price */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center">Aucun article dans le panier.</p> 
                        )}
                        
                        <button
                            onClick={downloadPDF}
                            className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-lg w-full hover:bg-blue-600"
                        >
                            Télécharger {/* Download */}
                        </button>
                    </>
                ) : (
                    <p className="text-center">Aucun détail de commande disponible.</p>
                )}
            </div>
        </div>
    );
};

export default OrderDetails;
