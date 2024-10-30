import React from 'react';
import Banner from '../Banner/Banner';
import TabProduct from '../TabProduct/TabProduct';
import PromoBanners from '../PromoBanners/PromoBanners';
import PromoBanners2 from '../PromoBanners/PromoBanners2';
import Product from '../Product/Product';
import TopSold from '../TopSold/TopSold';
import Testimonials from '../Testimonials/Testimonials';
import Collection from '../Collection/Collection';


const Home = () => {
    return (
        <div>
            <Banner/>
            <Collection/>
            <TabProduct/>
            <PromoBanners2/>
            <Product/>
            <PromoBanners/>
            <TopSold/>
            <Testimonials/>
        </div>
    );
};

export default Home;