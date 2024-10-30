import React, { useState, useEffect } from 'react';
import { Camera, Mail, Phone, MapPin, Calendar, Edit2 } from 'lucide-react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Profile = () => {
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
                title: 'Profile Updated!',
                text: 'Your profile has been successfully updated.',
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'There was an error updating your profile.',
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
                <h2 className="text-2xl font-bold text-gray-700">Profile not found</h2>
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
                            alt="Profile"
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
                                <label className="block text-sm font-medium text-gray-700">Name</label>
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
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editedData.phone || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
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
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-[#097969] text-white rounded-md hover:bg-green-800"
                            >
                                Save Changes
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
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="text-gray-900">{profileData.phone || 'Not set'}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="text-gray-900">{profileData.address || 'Not set'}</p>
                                </div>
                            </div>
                            {/* <div className="flex items-center space-x-3">
                                <Calendar className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Member Since</p>
                                    <p className="text-gray-900">
                                        {new Date(profileData.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
