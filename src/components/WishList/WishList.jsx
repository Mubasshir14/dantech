import React from 'react';
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useWislist from '../../hooks/useWislist';

const WishList = () => {
    const [wishList, refetch] = useWislist();
    const navigate = useNavigate();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://dantech-server.onrender.com/wishlist/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire("Error", "There was an issue deleting the item.", "error");
                    });
            }
        });
    }

    // Card click handler - now using productId instead of _id
    const handleCardClick = (productId, event) => {
        // Check if clicking on delete button or its children
        const isDeleteButton = event.target.closest('.delete-btn');
        if (isDeleteButton) {
            return;
        }
        navigate(`/product/${productId}`);
    };

    return (
        <div>
            <Dashboard />
            <div className='max-w-screen-xl mx-auto min-h-[calc(100vh-250px)] md:-mt-32 -mt-36 p-4 md:p-8'>
                <div className="text-black font-bold text-xl md:text-2xl font-poppin uppercase text-center mb-8">WishList</div>

                {wishList.length > 0 ? (
                    <div className='flex items-center lg:justify-center lg:flex-row flex-col gap-4'>
                        <div className='border-2 border-black p-2 rounded-lg'>
                            {wishList.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="card card-side p-2 flex flex-col md:flex-row border border-[#1313181A] mb-4 w-full md:w-[600px] cursor-pointer hover:shadow-lg transition-shadow"
                                    onClick={(e) => handleCardClick(item.productId, e)}
                                >
                                    <figure>
                                        <img 
                                            src={item.image || "placeholder-image-url"} 
                                            alt={item.name} 
                                            className="w-32 h-32 object-cover" 
                                        />
                                    </figure>
                                    <div className="card-body p-0 my-8 lg:my-0 lg:p-2 mt-4 lg:mt-0 flex flex-col justify-between">
                                        <div className='flex justify-between items-center'>
                                            <h2 className="card-title font-extrabold text-xl text-[#131318]">
                                                {item.name}
                                            </h2>

                                            <button
                                                className="delete-btn bg-gray-600 text-white px-2 py-2 rounded ml-6"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(item._id);
                                                }}
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                        <div>
                                            <div className="flex flex-col lg:flex-row lg:gap-3">
                                                <h2 className="text-[#FF4240] font-extrabold mb-3 lg:mb-0">
                                                    Price - ${(item.price).toFixed(0)}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-4 rounded-lg">
                        <Link to="/shop">
                            <button className="bg-gray-600 text-white px-4 py-2 text-xl rounded mt-4">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishList;