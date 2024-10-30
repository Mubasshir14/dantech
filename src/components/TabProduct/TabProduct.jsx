import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Loader from '../Loader/Loader';
import ProductCard from '../ProductCard/ProductCard';

const TabProduct = () => {
    const [activeTab, setActiveTab] = useState('flash-sale');
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const newArrival = product.filter(p => p.subcategory === 'newarrival');
    const flashSale = product.filter(p => p.subcategory === 'flashdeal');
    if (loading) return <Loader />;

    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className='flex items-center justify-center mt-10 mb-10'>
                <Tabs selectedIndex={activeTab === 'flash-sale' ? 0 : 1} onSelect={(index) => setActiveTab(index === 0 ? 'flash-sale' : 'new-arrival')}>
                    <TabList className="flex items-center justify-center border-gray-300">
                        <Tab
                            className={`py-2 font-poppin font-bold uppercase px-4 text-lg cursor-pointer 
                                ${activeTab === 'flash-sale' ? 'border-b-2 border-[#097969] text-[#097969]' : 'hover:text-[#097969]'} 
                                focus:outline-none`}
                        >
                            FLASH SALE
                        </Tab>
                        <Tab
                            className={`py-2 px-4 text-lg font-bold uppercase cursor-pointer 
                                ${activeTab === 'new-arrival' ? 'border-b-2 border-[#097969] text-[#097969]' : 'hover:text-[#097969]'} 
                                focus:outline-none`}
                        >
                            New Arrival
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 mt-5'>
                            {newArrival.map(p => (
                                <ProductCard p={p} key={p._id} />
                            ))}
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5'>
                            {flashSale.map(p => (
                                <ProductCard p={p} key={p._id} />
                            ))}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default TabProduct;
