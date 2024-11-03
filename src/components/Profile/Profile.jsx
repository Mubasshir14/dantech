import React, { useState, useEffect } from 'react';
import { Camera, Mail, Phone, MapPin, Calendar, Edit2, Heart } from 'lucide-react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaCartPlus, FaFirstOrder } from 'react-icons/fa';
import useCart from '../../hooks/useCart';
import useWislist from '../../hooks/useWislist';
import { NavLink } from 'react-router-dom';

const Profile = () => {
    const [cart] = useCart();
    const [wishList] = useWislist();
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('https://dantech-server.onrender.com/users');
                const userData = response.data.find(u => u.email === user?.email);
                setProfileData(userData);
                setEditedData(userData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserProfile();
        }
    }, [user]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await axios.patch(`https://dantech-server.onrender.com/updateusers/${profileData._id}`, editedData);
            setProfileData(editedData);
            setIsEditing(false);
            Swal.fire({
                icon: 'success',
                title: 'Profil Mis à Jour !',
                text: 'Votre profil a été mis à jour avec succès.',
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                icon: 'error',
                title: 'Échec de la Mise à Jour',
                text: 'Il y a eu une erreur lors de la mise à jour de votre profil.',
            });
        }
    };

    const handleCancel = () => {
        setEditedData(profileData);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setEditedData({
            ...editedData,
            [e.target.name]: e.target.value
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-gray-700">Profil non trouvé</h2>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 my-10 bg-white shadow-md rounded-lg">
            <div className="relative p-6 bg-gradient-to-r from-[#097969] to-[#097969] text-white rounded-t-lg">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <img
                            src={profileData.photoURL || 'https://via.placeholder.com/150'}
                            alt="Profil"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg">
                            <Camera className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold">{profileData.name}</h1>
                    </div>
                    {!isEditing && (
                        <button
                            onClick={handleEdit}
                            className="absolute top-6 right-6 text-white hover:text-gray-200"
                        >
                            <Edit2 className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            <div className="p-6">
                {isEditing ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nom</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editedData.name || ''}
                                    readOnly
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editedData.email || ''}
                                    readOnly
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editedData.phone || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Adresse</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={editedData.address || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-[#097969] text-white rounded-md hover:bg-green-800"
                            >
                                Enregistrer les Changements
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-900">{profileData.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Téléphone</p>
                                    <p className="text-gray-900">{profileData.phone || 'Non défini'}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Adresse</p>
                                    <p className="text-gray-900">{profileData.address || 'Non défini'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <div className='flex md:flex-row flex-wrap md:justify-center border-b-2 border-black p-3 gap-3 '>
                        <NavLink to='/cart' className='flex gap-3 h-16 items-center border-2 border-black rounded-md p-2'>
                            <div style={{ position: 'relative', display: 'inline-block', color: 'black' }}>
                                <FaCartPlus size={30} />

                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-10px',
                                        backgroundColor: '#097969',
                                        color: 'white',
                                        borderRadius: '50%',
                                        padding: '5px 4px',
                                        fontSize: '10px',
                                    }}
                                >
                                    +{cart.length}
                                </span>

                            </div>
                            <h1 className='md:text-2xl text-black uppercase'>Panier</h1>
                        </NavLink>
                        <NavLink to='/wishlist' className='flex gap-3 h-16 items-center border-2 border-black rounded-md p-2'>
                            <div style={{ position: 'relative', display: 'inline-block', color: 'black' }}>
                                <Heart size={30} />

                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-10px',
                                        backgroundColor: '#097969',
                                        color: 'white',
                                        borderRadius: '50%',
                                        padding: '5px 4px',
                                        fontSize: '10px',
                                    }}
                                >
                                    +{wishList.length}
                                </span>

                            </div>
                            <h1 className='md:text-2xl text-black uppercase'>Liste de Souhaits</h1>
                        </NavLink>
                        <NavLink to='/orders' className='flex gap-3 h-16 items-center border-2 border-black rounded-md p-2'>
                            <FaFirstOrder size={30} className='text-black' />
                            <h1 className='md:text-2xl text-black uppercase'>Commandes</h1>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
