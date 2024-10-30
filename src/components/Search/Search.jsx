import React, { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import Loader from '../Loader/Loader';

const Search = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [sortOption, setSortOption] = useState('default');
    const [sortedResults, setSortedResults] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const { results } = location.state || { results: [] };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Function to handle sorting
    const handleSort = (option) => {
        setSortOption(option);
    };

    useEffect(() => {
        if (results.length > 0) {
            let sortedArray = [...results];
            switch (sortOption) {
                case 'priceLowToHigh':
                    sortedArray.sort((a, b) => a.price - b.price);
                    break;
                case 'priceHighToLow':
                    sortedArray.sort((a, b) => b.price - a.price);
                    break;
                case 'alphabetical':
                    sortedArray.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'newest':
                    sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                default:
                    break;
            }
            setSortedResults(sortedArray);
        }
        setLoading(false); // Set loading to false after processing results
    }, [results, sortOption]);

    if (loading) return <Loader />;

    return (
        <div>
            <div className='max-w-screen-xl mx-auto'>
                <div className='lg:flex lg:gap-8'>
                    <div className='flex justify-between items-center p-4'>
                        <div></div> {/* Empty div for spacing */}
                        <button
                            className='block lg:hidden p-2 bg-gray-200 rounded-lg'
                            onClick={toggleDrawer}
                        >
                            <h1 className='flex gap-2 text-xl items-center'>
                                Filter <FaFilter className='text-xl' />
                            </h1>
                        </button>
                    </div>

                    {/* Product Content */}
                    <div className='flex-1 lg:mt-12 mb-6 p-2'>
                        <h1 className='md:text-4xl text-2xl uppercase font-extrabold text-center mb-4'>Your Search Result</h1>

                        {/* Sorting Dropdown */}
                        <div className='flex justify-center mb-4'>
                            <select
                                value={sortOption}
                                onChange={(e) => handleSort(e.target.value)}
                                className='p-2 border border-gray-300 rounded'
                            >
                                <option value='default'>Default</option>
                                <option value='priceLowToHigh'>Low to High</option>
                                <option value='priceHighToLow'>High to Low</option>
                                <option value='alphabetical'>A-Z</option>
                                <option value='newest'>Newest First</option>
                            </select>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                            {sortedResults.length > 0 ? (
                                sortedResults.map(p => (
                                    <ProductCard key={p._id} p={p} /> 
                                ))
                            ) : (
                                <p>No results found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
