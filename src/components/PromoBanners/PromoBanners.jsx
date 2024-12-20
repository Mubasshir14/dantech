import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../assets/speaker1.jpg';
import img2 from '../../assets/speaker2.jpg';

const PromoBanners = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* First Promo Banner */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden group">
          <div className="flex items-center justify-between p-8 h-[300px]">
            
            {/* Text Content */}
            <div className="w-1/2 space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Jusqu'à 40 % de réduction
              </h2>
              <p className="text-xl text-gray-800">
                Tous les nouveaux produits
              </p>
              <Link 
                to="/shop" 
                className="mt-4 text-gray-900 font-medium hover:text-white btn btn-outline hover-bg-[#097969] border-[#097969]"
              >
                Magasiner maintenant
              </Link>
            </div>
            
            {/* Image */}
            <div className="w-1/2 flex justify-end">
              <img 
                src={img1}
                alt="Produit 1"
                className="max-w-[180px] md:max-w-[200px] lg:max-w-[220px] transition-transform duration-300 transform group-hover:scale-105 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Second Promo Banner */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden group">
          <div className="flex items-center justify-between p-8 h-[300px]">
            
            {/* Text Content */}
            <div className="w-1/2 space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Livraison gratuite et
              </h2>
              <p className="text-xl text-gray-800">
                Les meilleurs articles garantis
              </p>
              <Link 
                to="/shop" 
                className="hover:text-white btn btn-outline hover-bg-[#097969] border-[#097969]"
              >
                Magasiner maintenant
              </Link>
            </div>
            
            {/* Image */}
            <div className="w-1/2 flex justify-end">
              <img 
                src={img2}
                alt="Produit 2"
                className="max-w-[180px] md:max-w-[200px] lg:max-w-[220px] transition-transform duration-300 transform group-hover:scale-105 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanners;
