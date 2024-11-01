import React, { useContext, useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaCartPlus, FaSearch } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { IoIosNotifications } from 'react-icons/io';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { Heart } from 'lucide-react';
import useCart from '../../hooks/useCart';
import { RxCross1 } from 'react-icons/rx';
import useWislist from '../../hooks/useWislist';
import useNotification from '../../hooks/useNotification';
import { AiOutlineClose } from 'react-icons/ai';
import Notification from '../Notification/Notification';
import image from '../../assets/logo(1).png'

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [cart] = useCart();
    const [userNotifications] = useNotification();
    const [isOpen, setIsOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [wishList] = useWislist();
    const scrollToSection = (id) => {
        const section = document.querySelector(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const navItem = (
        <>
            <li

            >
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `text-lg ${isActive ? 'text-white hover:bg-[#097969]/80  border-b-2  shadow-xl bg-[#097969] rounded-xl' : ''}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/shop'
                    className={({ isActive }) =>
                        `text-lg ${isActive ? 'text-white hover:bg-[#097969]/80 border-b-2  shadow-xl bg-[#097969] rounded-xl' : ''}`
                    }
                >
                    Shop
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
                    // to='/collection'
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

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const text = form.text.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(text) ||
            product.category.toLowerCase().includes(text) ||
            product.subcategory.toLowerCase().includes(text)
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10  mt-3 w-52 p-2 shadow">
                            {navItem}
                        </ul>
                    </div>
                    <Link to='/' >
                        <img src={image} className='h-16 w-16' alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-3">
                        {navItem}
                    </ul>

                </div>
                <li className="hidden md:flex">
                    <form
                        onSubmit={handleSearch}
                        className="text-lg flex items-center justify-center"
                    >
                        <FaSearch className="mr-2 text-gray-600" />
                        <input
                            type="text"
                            name="text"
                            placeholder="Search..."
                            className="border-b-2 border-black ring-0 focus:border-black focus:outline-none focus:bg-gray-100 transition-all duration-200 ease-in-out placeholder-gray-500"
                        />
                    </form>
                </li>


                <div className="navbar-end gap-3 text-2xl">
                    <div>

                        <div onClick={openNotificationModal} className="relative inline-block text-black">
                            <IoIosNotifications size={36} className="hover:text-[#065f52] transition-colors duration-300" />
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
                        <Heart size={36} className=" hover:text-[#065f52] transition-colors duration-300" />
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
                        <FaCartPlus size={36} className=" hover:text-[#065f52] transition-colors duration-300" />
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
                    <Link to='/profile' className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                        Your profile
                    </Link>
                    
                    <button onClick={handleLogOut} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                        Sign Out
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