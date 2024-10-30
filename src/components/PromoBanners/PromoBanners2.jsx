import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../assets/s1.png';
import img2 from '../../assets/s2.png';

const PromoBanners2 = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-6">

                {/* First Promo Banner */}
                <div className="relative bg-yellow-400 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 flex flex-col justify-between p-6 h-[300px]">
                    <div className="space-y-1">
                        <p className="text-white font-semibold italic text-lg">New Arrivals</p>
                        <h2 className="text-4xl font-extrabold text-gray-900">Colorful Cloth</h2>
                        <p className="text-md text-gray-900">Sale up to 30% off all</p>
                    </div>
                    <Link
                        to="/shop"
                        className="mt-4 text-sm text-gray-900 font-medium hover:underline inline-block"
                    >
                        VIEW COLLECTION
                        <div className="w-16 h-0.5 bg-gray-900 mt-1"></div>
                    </Link>
                    <img
                        src={img1}
                        alt="Product"
                        className="absolute bottom-4 right-4 w-[140px] h-auto transform transition-transform duration-300 hover:scale-110"
                    />
                </div>

                {/* Second Promo Banner */}
                <div className="relative bg-gradient-to-r from-yellow-200 via-yellow-100 to-gray-100 rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105 p-8 flex flex-col justify-between h-[320px]">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-yellow-500 font-extrabold text-8xl font-cinzel drop-shadow-lg">10%</h2>
                        <p className="text-3xl text-gray-700 font-semibold">Sale</p>
                    </div>

                    <p className="text-md text-gray-600 hover:text-gray-800 transition duration-300 cursor-pointer">
                        Shop Now
                    </p>

                    <img
                        src={img2}
                        alt="Model"
                        className="absolute bottom-4 right-4 w-[160px] h-auto transform transition-transform duration-300 hover:scale-110 drop-shadow-lg"
                    />

                    <div className="absolute bottom-0 left-0 w-full h-14 bg-yellow-400 flex items-center justify-center">
                        <p className="text-md text-gray-900 font-semibold tracking-wide">EXCLUSIVE SALE OFFER</p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default PromoBanners2;
