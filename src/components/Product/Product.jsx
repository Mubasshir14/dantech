import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';

const Product = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dantech-server.onrender.com/product');
                const storedData = response.data.sort((a, b) => {
                    const dateA = a.time ? new Date(a.time.replace(/(\d+)(th|st|nd|rd)/, '$1')) : new Date(0);
                    const dateB = b.time ? new Date(b.time.replace(/(\d+)(th|st|nd|rd)/, '$1')) : new Date(0);
                    return dateB - dateA;
                });
                setProduct(storedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = product.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(product.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <Loader />;

    return (
        <div className='my-10 max-w-screen-xl mx-auto'>
            <h1 className='font-poppin text-3xl uppercase text-center font-bold'>All Products</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5'>
                {currentProducts.map(p => (
                    <ProductCard p={p} key={p._id} />
                ))}
            </div>
            {/* Pagination */}
            <div className='flex justify-center mt-8'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handleClick(index + 1)}
                        className={`px-3 py-1 mx-1 border rounded ${
                            currentPage === index + 1 ? 'bg-[#097969] text-white' : 'bg-white text-gray-900'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Product;
