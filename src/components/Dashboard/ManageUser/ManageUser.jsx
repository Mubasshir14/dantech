import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Dashboard from '../Dashboard';

const ManageUser = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('https://dantech-server.onrender.com/users');
            console.log('Response:', res);
            return res.data;
        }
    });

    const handleDelete = (user) => {
        Swal.fire({
            title: "Êtes-vous sûr ?",
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, supprimez-le !"
        }).then((result) => {
            if (result.isConfirmed) { 
                axios.delete(`https://dantech-server.onrender.com/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Supprimé !",
                                text: "L'utilisateur a été supprimé.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Erreur !",
                            text: "Une erreur s'est produite lors de la suppression de l'utilisateur.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Êtes-vous sûr ?",
            text: `Voulez-vous faire de ${user.name} un administrateur ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, faire administrateur !"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`https://dantech-server.onrender.com/users/${user._id}`, { role: "admin" })
                    .then(res => {
                        if (res.data.modifiedCount > 0) { 
                            refetch(); 
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.name} est maintenant un administrateur`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Erreur !",
                            text: "Une erreur s'est produite lors de la mise à jour de l'utilisateur.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div>
            <Dashboard />
            <div className="md:-mt-28 -mt-20 mb-20 max-w-4xl mx-auto shadow-md bg-white border border-gray-200">
                <div className="p-6">
                    <h1 className='font-poppin font-bold text-2xl text-center'>Gérer les Utilisateurs</h1>
                    <div className="flex flex-col md:flex-row justify-between mb-6 items-center">
                        {/* You can add any additional stats here if needed */}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr className="bg-[#097969] text-white">
                                    <td className="py-2 px-4 uppercase font-bold"></td>
                                    <td className="py-2 px-4 uppercase font-bold">Nom</td>
                                    <td className="py-2 px-4 uppercase font-bold">Email</td>
                                    <td className="py-2 px-4 uppercase font-bold">Rôle</td>
                                    <td className="py-2 px-4 uppercase font-bold">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => (
                                        <tr key={user._id} className="border-t">
                                            <td className="py-2 px-4 text-[#151515] font-bold">{index + 1}</td>
                                            <td className="py-2 px-4 text-[#737373]">
                                                {user.name}
                                            </td>
                                            <td className="py-2 px-4 text-[#737373]">
                                                {user.email}
                                            </td>
                                            <td className="py-2 px-4">
                                                {
                                                    user.role === 'admin' ? 
                                                    <button className="mx-auto text-[#737373]">
                                                        Administrateur
                                                    </button>
                                                    :
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        className="bg-gray-600 text-white px-2 py-2 rounded mx-auto">
                                                        <FaUsers />
                                                    </button>
                                                }
                                            </td>
                                            <td className="py-2 px-4">
                                                <button
                                                    onClick={() => handleDelete(user)}
                                                    className="bg-[#B91C1C] text-white px-2 py-2 rounded mx-auto">
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
