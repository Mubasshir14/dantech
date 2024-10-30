import React from 'react';
import { FaShippingFast, FaClock, FaGlobe, FaBoxOpen, FaShieldAlt, FaGift } from 'react-icons/fa';

const DeliveryDetails = () => {
    return (
        <section className="container mx-auto py-16 px-6 md:px-12 max-w-screen-xl text-justify">
            <h1 className="text-4xl font-bold text-center mb-10 font-poppin uppercase  text-black">Delivery Details</h1>
            <div className="rounded-lg shadow-lg p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed bg-gray-50">
                
                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaShippingFast className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Standard Shipping</h2>
                        <p>Delivered within 5-7 business days. Ideal for non-urgent orders. <span className="font-bold">Fee: $5.99</span>. <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">Free over $50</span>.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaClock className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Express Shipping</h2>
                        <p>Get your order within 2-3 business days. <span className="font-bold">Fee: $14.99</span>. Available for most items and locations.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaClock className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Same-Day Delivery</h2>
                        <p>Available in select locations for orders placed by 12 PM. <span className="font-bold">Fee: $19.99</span>. Perfect for urgent needs.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaClock className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Next-Day Delivery</h2>
                        <p>Available in select locations for orders placed by 5 PM. <span className="font-bold">Fee: $17.99</span>. Great for time-sensitive items.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaGlobe className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">International Shipping</h2>
                        <p>Delivery times vary, generally 7-15 business days. Customs fees may apply. See <a href="/international-policy" className="text-[#065f4a] underline">policy details</a>.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaBoxOpen className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Order Tracking</h2>
                        <p>Track your order via the link in your email or visit our <a href="/track-order" className="text-[#065f4a] underline">Order Tracking</a> page.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaShieldAlt className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Package Insurance</h2>
                        <p>Optional insurance to protect against loss or damage during transit. Choose this option at checkout for added peace of mind.</p>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-white shadow-sm flex items-center space-x-4">
                    <FaGift className="text-[#097969] text-2xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-[#097969]">Gift Packaging</h2>
                        <p>Premium packaging available upon request. Fees vary by package size. Ideal for special occasions.</p>
                    </div>
                </div>

                {/* <p className="text-center">
                    For further inquiries, contact our <a href="/support" className="text-[#097969] underline">Customer Support</a> team. We're here to help!
                </p> */}
            </div>
        </section>
    );
};

export default DeliveryDetails;
