import React, { useState } from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';
import visa from '../../assets/visapng.png';
import mastercard from '../../assets/mastercard.png';
import paypal from '../../assets/paypal.png';
import applepay from '../../assets/pay.png';
import googlepay from '../../assets/googlepay.png';
import logo from '../../assets/logo(1).png';
import { Link } from 'react-router-dom';
import img from '../../assets/photo.png'

const Footer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            // Handle email subscription logic here (API call or Firebase logic)
            setMessage('Merci de vous être abonné !'); // "Thank you for subscribing!"
            setEmail('');
        } else {
            setMessage('Veuillez entrer un e-mail valide.'); // "Please enter a valid email."
        }
    };

    const scrollToSection = (id) => {
        const section = document.querySelector(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-gray-100 py-12">
            <div className="container max-w-screen-xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Logo & Social Media */}
                    <div>
                        <img src={img} className="md:h-8 h-7 bg-gray-100" alt="Logo" />
                        <p className="text-gray-600 mt-4 text-justify">Nous avons les derniers appareils électroniques qui correspondent à votre style de vie et vous maintiennent connecté. Des smartphones aux maisons intelligentes.</p> {/* Translated description */}
                        <div className="flex space-x-4 mt-4">
                            <FaTwitter className="text-xl text-gray-600 hover:text-gray-800" />
                            <FaFacebookF className="text-xl text-gray-600 hover:text-gray-800" />
                            <FaInstagram className="text-xl text-gray-600 hover:text-gray-800" />
                            <FaGithub className="text-xl text-gray-600 hover:text-gray-800" />
                        </div>
                    </div>

                    {/* Links - Company */}
                    <div>
                        <h2 className="text-lg font-semibold">SOCIÉTÉ</h2> {/* "COMPANY" translated */}
                        <ul className="mt-2 space-y-2 text-gray-600">
                            <li><Link to='/about' className="hover:underline">À propos</Link></li> {/* "About" translated */}
                            <li><Link to='/shop' className="hover:underline">Boutique</Link></li> {/* "Shop" translated */}
                            <li onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('#collection');
                            }}><p className="hover:underline">Collection</p></li>
                            <li><Link to='/blog' className="hover:underline">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Links - Help */}
                    <div>
                        <h2 className="text-lg font-semibold">AIDE</h2> {/* "HELP" translated */}
                        <ul className="mt-2 space-y-2 text-gray-600">
                            <li><Link 
                                to='/delivery-details'
                                className="hover:underline">Détails de livraison</Link></li> {/* "Delivery Details" translated */}
                            <li><Link 
                                to='/terms' className="hover:underline">Conditions générales</Link></li> {/* "Terms & Conditions" translated */}
                            <li><Link
                                to='/privacy-policy' className="hover:underline">Politique de confidentialité</Link></li> {/* "Privacy Policy" translated */}
                            <li><Link
                                to='/shipping-policy' className="hover:underline">Politique d'expédition</Link></li> {/* "Shipping Policy" translated */}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className=" p-6 rounded-lg ">
                        <h2 className="text-lg font-semibold text-gray-800">Restez informé</h2> {/* "Stay Updated" translated */}
                       
                        <form onSubmit={handleSubscribe} className="mt-4 space-y-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Entrez votre email" 
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#097969] focus:border-transparent outline-none"
                            />
                            <button
                                type="submit"
                                className="w-full bg-[#097969] text-white py-2 rounded-md font-semibold hover:bg-[#065b51] transition-colors"
                            >
                                S'abonner {/* "Subscribe" translated */}
                            </button>
                        </form>
                        {message && <p className="mt-2 text-sm text-[#097969]">{message}</p>}
                       
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-300 my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600">INF777 © 2000-2024, Tous droits réservés</p> {/* "All Rights Reserved" translated */}
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <img src={visa} alt="Visa" className="h-8 w-auto" />
                        <img src={mastercard} alt="Mastercard" className="h-8 w-auto" />
                        <img src={paypal} alt="Paypal" className="h-8 w-auto" />
                        <img src={applepay} alt="Apple Pay" className="h-8 w-auto" />
                        <img src={googlepay} alt="Google Pay" className="h-8 w-auto" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
