import React from 'react';

const About = () => {
    return (
        <section className="container mx-auto py-12 px-6 max-w-screen-xl text-justify">
            <h1 className="text-3xl font-semibold text-center mb-8 font-poppin uppercase ">About Us</h1>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Welcome to <span className="font-semibold">DANTECH</span>! Since our launch in 2024, we’ve been committed to curating a premium selection of electronics and accessories designed to enhance your life and keep you connected in a fast-paced digital world.
            </p>
            
            <h2 className="text-2xl font-semibold text-[#097969] mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                At DANTECH, we believe technology should be accessible, reliable, and innovative. Our mission is to provide high-quality gadgets that are built to last, whether for work, play, or anything in between. We aim to empower our customers with technology that enriches their day-to-day experiences.
            </p>
            
            <h2 className="text-2xl font-semibold text-[#097969] mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed mb-6">
                <li><span className="font-semibold">Quality Assurance</span>: Every product we offer goes through rigorous testing to ensure it meets our high standards.</li>
                <li><span className="font-semibold">Customer-Centric Service</span>: We prioritize your satisfaction and provide friendly, knowledgeable support to make your shopping experience seamless.</li>
                <li><span className="font-semibold">Innovation</span>: Our product line is always expanding with the latest in tech and accessories, so you stay ahead of the curve.</li>
                <li><span className="font-semibold">Wide Selection</span>: From the newest gadgets to trusted brands, we have a diverse range of electronics to fit every lifestyle.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#097969] mb-4">Join Us on This Tech Journey</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Whether you’re a tech enthusiast or just looking for a reliable accessory, DANTECH has something for everyone. Explore our collection and discover gadgets that are crafted to complement and enhance your daily life.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed">
                Have questions or need assistance? Feel free to reach out to our team at any time – we’re here to help!
            </p>
        </section>
    );
};

export default About;
