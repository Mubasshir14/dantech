import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';

const CheckOut = () => {
    const [cart] = useCart();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); 
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const deliveryFee = 15;

    const totalCartPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const displayPrice = (totalCartPrice + deliveryFee).toFixed(2);

    const onSubmit = async (data, event) => {
        event.preventDefault(); 

        if (isSubmitting) return; 
        setIsSubmitting(true); 

        const orderDetails = {
            ...data,
            cart,
            totalCartPrice,
            deliveryFee,
            displayPrice
        };

        navigate('/payment', { state: { orderDetails } });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-300 my-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Checkout Form</h2>

            <div className='flex flex-col lg:flex-row gap-8'>
                {/* Cart Summary */}
                <div className="w-full lg:w-1/2">
                    <div className='border border-gray-300 rounded-lg p-4 shadow-md'>
                        <h3 className="text-lg font-semibold mb-4">Cart Summary</h3>
                        <ul className="flex flex-col gap-4">
                            {cart.map((c, index) => (
                                <div key={index} className="flex items-center p-2 border border-gray-200 rounded-md">
                                    <img src={c.image} alt="Item" className="w-20 h-20 object-cover mr-4" />
                                    <div className="flex-1">
                                        <h2 className="font-semibold text-lg text-gray-900">{c.name}</h2>
                                        <p className="text-gray-700">Price: ${(c.price * c.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </ul>
                        <div className="mt-6 p-4 bg-[#097969]/10 rounded-lg">
                            <h4 className="text-lg font-semibold text-[#097969] text-center">Total Cart Price: ${totalCartPrice.toFixed(2)}</h4>
                        </div>
                    </div>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 p-6 shadow-md rounded-md border border-gray-200 flex-1">
                    <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            defaultValue={user.email}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address"
                                }
                            })}
                            className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                            readOnly
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Mobile</label>
                        <input
                            type="text"
                            {...register("mobile", { required: "Mobile number is required" })}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your mobile number"
                        />
                        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Address</label>
                        <input
                            type="text"
                            {...register("address", { required: "Address is required" })}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your address"
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Total Price (Includes Delivery Fee: $15)</label>
                        <input
                            type="text"
                            value={displayPrice}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting} 
                        className={`w-full bg-[#097969] text-white py-2 rounded text-xl transition duration-300 ease-in-out hover:bg-[#097969] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckOut;
