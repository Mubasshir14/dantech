import React, { useContext, useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaCartPlus, FaSearch } from 'react-icons/fa';
import { IoIosNotifications, IoIosNotificationsOutline } from 'react-icons/io';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { Heart } from 'lucide-react';
import useCart from '../../hooks/useCart';
import { RxCross1 } from 'react-icons/rx';
import useWislist from '../../hooks/useWislist';
import useNotification from '../../hooks/useNotification';
import { AiOutlineClose } from 'react-icons/ai';
import Notification from '../Notification/Notification';
import image from '../../assets/logo(1).png';
import axios from 'axios';
import { MdDashboard, MdOutlineDashboard } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";
import img99 from '../../assets/photo.jpg'

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [cart] = useCart();
    const [userNotifications] = useNotification();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [wishList] = useWislist();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axios.get('https://dantech-server.onrender.com/users');
                const foundUser = response.data.find(u => u.email === user?.email);

                // Set admin status based on user role
                if (foundUser && foundUser.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchAdmin();
        }
    }, [user]);

    const scrollToSection = (id) => {
        const section = document.querySelector(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const navItem = (
        <>
            <li>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `text-lg ${isActive ? 'text-white hover:bg-[#097969]/80  border-b-2  shadow-xl bg-[#097969] rounded-xl' : ''}`
                    }
                >
                    Accueil
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/shop'
                    className={({ isActive }) =>
                        `text-lg ${isActive ? 'text-white hover:bg-[#097969]/80 border-b-2  shadow-xl bg-[#097969] rounded-xl' : ''}`
                    }
                >
                    Boutique
                </NavLink>
            </li>
            <li
                onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#collection');
                }}
                className='text-lg'
            >
                <div
                    className={({ isActive }) =>
                        `text-lg ${isActive ? 'text-white  hover:bg-[#097969]/80 border-b-2  shadow-xl bg-[#097969] rounded-xl' : ''}`
                    }
                >
                    Collection
                </div>
            </li>
            <li
                onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#blog');
                }}
            >
                <NavLink
                    to='/blog'
                    className={({ isActive }) =>
                        `text-lg ${isActive ? 'text-white hover:bg-[#097969]/80 border-b-2  shadow-xl bg-[#097969] rounded-xl' : ''}`
                    }
                >
                    Blog
                </NavLink>
            </li>
        </>
    );

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dantech-server.onrender.com/product');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const translations = {
        "écouteurs": "earbuds",
        "montre intelligente": "smartwatch",
        "étui": "cover",
        "oreillette": "earphone",
        "adaptateur": "adapter",
        "batterie externe": "powerbank",
        "haut-parleurs": "speaker",
        "microphone": "microphone",
        "moniteur": "monitor",
        "caméra": "camera",
        "offre flash": "flashdeal",
        "nouvelle arrivée": "newarrival",
        "meilleure vente": "topsale",
        "aucune": "blank"
    };

    const translateSearchTerm = (text) => {
        const lowerText = text.toLowerCase();
        // Check if the text matches any French key in translations
        for (const [french, english] of Object.entries(translations)) {
            if (lowerText.includes(french.toLowerCase())) {
                // Replace the French term with its English equivalent
                return lowerText.replace(french.toLowerCase(), english);
            }
        }
        return lowerText;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const originalText = form.text.value.toLowerCase();
        const translatedText = translateSearchTerm(originalText);

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(translatedText) ||
            product.category.toLowerCase().includes(translatedText) ||
            product.subcategory.toLowerCase().includes(translatedText)
        );

        navigate('/search', { state: { results: filteredProducts } });
        form.reset();
    };
    const handleProfileClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    // Open the notification modal
    const openNotificationModal = () => {
        setIsNotificationOpen(true);
    };

    // Close the notification modal
    const closeNotificationModal = () => {
        setIsNotificationOpen(false);
    };


    return (
        <div>
            <div className="navbar bg-base-100 border-b-2 border-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu text-gray-900 menu-sm dropdown-content bg-base-100 rounded-box z-10  mt-3 w-52 p-2 shadow">
                            {navItem}
                        </ul>
                    </div>
                    <Link to='/'>
                        <img src={img99} className='md:h-8 h-7' alt="Logo" />
                    </Link>
                </div>
                {/* <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-3">
                        {navItem}
                    </ul>
                </div> */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu text-gray-900 menu-horizontal px-1 gap-3">
                        {navItem}
                    </ul>

                </div>
                <li className="hidden md:flex mr-8">
            <form
                onSubmit={handleSearch}
                className="flex items-center border-b-2 border-black px-4 py-1 shadow-sm transition duration-200"
            >
                <FaSearch className="text-gray-900 mr-2 hover:text-gray-800 transition-colors duration-200" />
                <input
                    type="text"
                    name="text"
                    placeholder="Recherche..."
                    className="bg-transparent placeholder-gray-900 focus:outline-none text-sm flex-1"
                />
            </form>
        </li>
                <div className="navbar-end flex items-center gap-3 text-xl">
                    {/* Show Dashboard link only if user is admin */}
                    {isAdmin && <Link to='/dashboard' className="hover:text-[#065f52] transition-colors duration-300 text-3xl">
                        <MdOutlineDashboard />
                    </Link>}
                    <div>
                        <div onClick={openNotificationModal} className="relative inline-block text-black">
                            <IoIosNotificationsOutline size={30} className="hover:text-[#065f52] transition-colors duration-300" />
                            {userNotifications.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#097969] text-white rounded-full text-xs font-semibold w-5 h-5 flex items-center justify-center shadow-md">
                                    {userNotifications.length}
                                </span>
                            )}
                        </div>

                    </div>

                    <Link
                        to='/wishlist'
                        className="relative inline-block text-black"
                    >
                        <Heart size={30} className=" hover:text-[#065f52] transition-colors duration-300" />
                        {wishList.length > 0 && (
                            <span
                                className="absolute -top-2 -right-2 bg-[#097969] text-white rounded-full text-xs font-semibold w-5 h-5 flex items-center justify-center shadow-md"
                            >
                                {wishList.length}
                            </span>
                        )}
                    </Link>
                    <Link
                        to='/cart'
                        className="relative inline-block text-black"
                    >
                        <BsCartPlus size={30} className=" hover:text-[#065f52] transition-colors duration-300" />
                        {cart.length > 0 && (
                            <span
                                className="absolute -top-2 -right-2 bg-[#097969] text-white rounded-full text-xs font-semibold w-5 h-5 flex items-center justify-center shadow-md"
                            >
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    {
                        user ? <img
                            onClick={handleProfileClick}
                            className="object-cover w-10 h-10 rounded-full ring ring-gray-300 dark:ring-gray-600"
                            src={user?.photoURL}

                            title={user?.displayName || "Profile"}
                            alt="Profile image"
                        /> :
                            <Link to='/login'><CgProfile className='w-10 h-10 text-black' /></Link>
                    }
                </div>
            </div>
            {isModalOpen && (
                <div className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl transition transform ease-out duration-100 scale-100">
                    <button onClick={closeModal} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-red-600">
                        <RxCross1 className='text-black' />
                    </button>
                    <Link to='/profile' className="block font-poppin px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                        Mon Profil
                    </Link>
                    <Link to='/cart' className="block font-poppin px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                        Mon Panier
                    </Link>
                    <Link to='/wishlist' className="block font-poppin px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                        Liste de Souhaits
                    </Link>
                    <Link to='/orders' className="block font-poppin px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                        Mes Commandes
                    </Link>


                    <button onClick={handleLogOut} className="block font-poppin px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                        Se Déconnecter
                    </button>


                </div>
            )}

            {/* Notification Modal */}
            {isNotificationOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 "
                    onClick={closeNotificationModal}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-md w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeNotificationModal}
                        >
                            <AiOutlineClose size={24} />
                        </button>
                        <h2 className="text-xl font-semibold mb-4 text-center pb-3 border-b-2 border-black">Notifications</h2>
                        <Notification notifications={userNotifications} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
