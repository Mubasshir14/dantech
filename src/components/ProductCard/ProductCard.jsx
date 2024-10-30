import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ p }) => {
    return (
        <div className="relative max-w-xs mx-auto transform transition-transform duration-300 hover:scale-105">
            <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                <img
                    className="object-cover w-full h-64 mt-2 rounded-t-lg"
                    src={p.images}
                    alt={p.name}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-xl">
                    <Link to={`/product/${p._id}`} className="px-3 py-2 text-sm font-semibold text-gray-100 uppercase transition-colors duration-300 transform bg-[#097969] rounded-full hover:bg-[#097969] focus:bg-[#097969] focus:outline-none">
                        <FaEye className='text-2xl' />
                    </Link>
                </div>
                {/* truncate */}
                <div className="px-4 py-3">
                    <h1 className="text-sm font-bold text-gray-800 uppercase  h-[40px]">{p.name}</h1>
                </div>
                <div className="flex items-center justify-center gap-2 px-4 py-3  rounded-b-lg">
                <h1 className="text-sm font-semibold text-black line-through">
                        $ {p.deletePrice}
                    </h1>
                    <h1 className="text-lg font-semibold text-black">$ {p.price}</h1>
                    
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
