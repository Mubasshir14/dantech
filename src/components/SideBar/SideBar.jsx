import { useContext, useEffect, useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsFillHouseAddFill, BsGraphUp } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MdBookmark, MdHomeWork, MdPeople, MdQuestionAnswer, MdSearch } from 'react-icons/md'
import { FaLayerGroup, FaRocketchat, FaTasks } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

import { IoNewspaper } from 'react-icons/io5'
import axios from 'axios'
import { AuthContext } from '../provider/AuthProvider'

const SideBar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [isActive, setActive] = useState(false)
    const [products, setProducts] = useState([]);
    // const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    // const [users, setUsers] = useState([]);
    const navigate = useNavigate();



    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
        navigate('/')
            .catch(error => {
                console.log(error.message);
            });
    };

    const handleToggle = () => {
        setActive(!isActive)
    }




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
    return (
        <div className='md:mt-10'>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 mt-8 md:mt-0 text-gray-900 flex justify-between md:hidden'>
                <div>
                    <div className=' cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            <h1 className='font-poppin uppercase font-bold'>DANTECH</h1>
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#238e61] md:bg-green-200/10 w-64 space-y-6 px-2 py-4 mt-20 rounded-t-lg absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-green-950 mx-auto  '>
                            <Link to='/'>
                                <h1 className='font-poppin uppercase text-white font-bold'>DANTECH</h1>
                            </Link>
                        </div>
                    </div>


                    <div className='flex flex-col justify-between flex-1 mt-6 text-white'>



                        <nav>
                            <form
                                onSubmit={handleSearch}
                                className={`flex font-poppins uppercase items-center px-4 py-2 my-5 border-2 shadow-lg text-black transform border-white/10 hover:bg-gray-300 hover:text-gray-700`}>
                                <MdSearch className='w-5 h-5 text-black' />
                                <input
                                    type="text"
                                    name="text"
                                    placeholder="Search Product"
                                    style={{ fontFamily: 'Cinzel' }}
                                    className="input bg-transparent border-b-2 border-b-black rounded-none w-full max-w-xs"
                                />
                            </form>
                            <NavLink
                                to='/shop'
                                end
                                className={({ isActive }) =>
                                    `flex items-center uppercase font-poppin rounded-lg shadow-xl  px-4 py-2 my-5 shadow-black/40  transition-colors duration-300 border-2 border-white/10 transform  hover:bg-[#097969]/70   hover:text-white ${isActive ? 'bg-[#097969] shadow-[#097969]/30   text-white' : 'text-black'
                                    }`
                                }
                            >
                                {/*  */}

                                <span className='mx-4 font-poppins uppercase font-medium'>All Products</span>
                            </NavLink>


                            <NavLink
                                to='/earbud'
                                className={({ isActive }) =>
                                    `flex items-center uppercase font-poppin rounded-lg shadow-xl  px-4 py-2 my-5 shadow-black/40  transition-colors duration-300 border-2 border-white/10 transform  hover:bg-[#097969]/70   hover:text-white ${isActive ? 'bg-[#097969] shadow-[#097969]/30   text-white' : 'text-black'
                                    }`
                                }
                            >


                                <span className='mx-4 font-poppins uppercase font-medium'>EARBUDS</span>
                            </NavLink>

                            <NavLink
                                to='/smartwatch'
                                className={({ isActive }) =>
                                    `flex items-center uppercase font-poppin rounded-lg shadow-xl  px-4 py-2 my-5 shadow-black/40  transition-colors duration-300 border-2 border-white/10 transform  hover:bg-[#097969]/70   hover:text-white ${isActive ? 'bg-[#097969] shadow-[#097969]/30   text-white' : 'text-black'
                                    }`
                                }
                            >


                                <span className='mx-4 font-poppins uppercase font-medium'>Smartwatch</span>
                            </NavLink>

                            <NavLink
                                to='/cover'
                                className={({ isActive }) =>
                                    `flex items-center uppercase font-poppin rounded-lg shadow-xl  px-4 py-2 my-5 shadow-black/40  transition-colors duration-300 border-2 border-white/10 transform  hover:bg-[#097969]/70   hover:text-white ${isActive ? 'bg-[#097969] shadow-[#097969]/30   text-white' : 'text-black'
                                    }`
                                }
                            >


                                <span className='mx-4 font-poppins uppercase font-medium'>cover</span>
                            </NavLink>

                            <NavLink
                                to='/earphone'
                                className={({ isActive }) =>
                                    `flex items-center uppercase font-poppin rounded-lg shadow-xl  px-4 py-2 my-5 shadow-black/40  transition-colors duration-300 border-2 border-white/10 transform  hover:bg-[#097969]/70   hover:text-white ${isActive ? 'bg-[#097969] shadow-[#097969]/30   text-white' : 'text-black'
                                    }`
                                }
                            >


                                <span className='mx-4 font-poppins uppercase font-medium'>Earphone</span>
                            </NavLink>
                            <NavLink
                                to='/adapter'
                                className={({ isActive }) =>
                                    `flex items-center uppercase font-poppin rounded-lg shadow-xl  px-4 py-2 my-5 shadow-black/40  transition-colors duration-300 border-2 border-white/10 transform  hover:bg-[#097969]/70   hover:text-white ${isActive ? 'bg-[#097969] shadow-[#097969]/30   text-white' : 'text-black'
                                    }`
                                }
                            >


                                <span className='mx-4 font-poppins uppercase font-medium'>adapter</span>
                            </NavLink>
                            <NavLink
                                to='/powerbank'
                                className={({ isActive }) =>
                                    `flex items-center uppercase font-poppin rounded-lg shadow-xl  px-4 py-2 my-5 shadow-black/40  transition-colors duration-300 border-2 border-white/10 transform  hover:bg-[#097969]/70   hover:text-white ${isActive ? 'bg-[#097969] shadow-[#097969]/30   text-white' : 'text-black'
                                    }`
                                }
                            >


                                <span className='mx-4 font-poppins uppercase font-medium'>powerbank</span>
                            </NavLink>
                            <NavLink
                                to='/microphone'
                                className={({ isActive }) =>
                                    `flex items-center uppercase font-poppin rounded-lg shadow-xl  px-4 py-2 my-5 shadow-black/40  transition-colors duration-300 border-2 border-white/10 transform  hover:bg-[#097969]/70   hover:text-white ${isActive ? 'bg-[#097969] shadow-[#097969]/30   text-white' : 'text-black'
                                    }`
                                }
                            >


                                <span className='mx-4 font-poppins uppercase font-medium'>microphone</span>
                            </NavLink>
                            <NavLink
                                to='/monitor'
                                className={({ isActive }) =>
                                    `flex items-center uppercase font-poppin rounded-lg shadow-xl  px-4 py-2 my-5 shadow-black/40  transition-colors duration-300 border-2 border-white/10 transform  hover:bg-[#097969]/70   hover:text-white ${isActive ? 'bg-[#097969] shadow-[#097969]/30   text-white' : 'text-black'
                                    }`
                                }
                            >


                                <span className='mx-4 font-poppins uppercase font-medium'>monitor</span>
                            </NavLink>
                            <NavLink
                                to='/speaker'
                                className={({ isActive }) =>
                                    `flex items-center uppercase font-poppin rounded-lg shadow-xl  px-4 py-2 my-5 shadow-black/40  transition-colors duration-300 border-2 border-white/10 transform  hover:bg-[#097969]/70   hover:text-white ${isActive ? 'bg-[#097969] shadow-[#097969]/30   text-white' : 'text-black'
                                    }`
                                }
                            >


                                <span className='mx-4 font-poppins uppercase font-medium'>speaker</span>
                            </NavLink>
                            <NavLink
                                to='/camera'
                                className={({ isActive }) =>
                                    `flex items-center uppercase font-poppin rounded-lg shadow-xl  px-4 py-2 my-5 shadow-black/40  transition-colors duration-300 border-2 border-white/10 transform  hover:bg-[#097969]/70   hover:text-white ${isActive ? 'bg-[#097969] shadow-[#097969]/30   text-white' : 'text-black'
                                    }`
                                }
                            >


                                <span className='mx-4 font-poppins uppercase font-medium'>camera</span>
                            </NavLink>


                        </nav>
                    </div>

                </div>

                <div>
                    <hr className='border-[#097969]' />

                    {/* Profile Menu */}
                    <div

                        className={({ isActive }) =>
                            `flex  items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300 border-2 border-white/10 shadow-lg   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-black'
                            }`
                        }
                    >

                    </div>
                    <NavLink
                        to='/profile'
                        className={({ isActive }) =>
                            `flex items-center uppercase font-poppin rounded-lg shadow-xl  px-4 py-2 my-5 shadow-black/40  transition-colors duration-300 border-2 border-white/10 transform  hover:bg-[#097969]/70   hover:text-white ${isActive ? 'bg-[#097969] shadow-[#097969]/30   text-white' : 'text-black'
                            }`
                        }
                    >

                        {
                            user ? <img
                                className="object-cover w-5 h-5 rounded-full ring ring-gray-300 dark:ring-gray-600"
                                src={user?.photoURL}

                                title={user?.displayName || "Profile"}
                                alt="Profile image"
                            /> :
                                <Link to='login'><CgProfile className='w-5 h-5 text-black' /></Link>
                        }

                        <span className='mx-4 font-poppins uppercase font-medium'>Profile</span>
                    </NavLink>

                    <Link
                        to='/login'
                        className='flex w-full items-center px-4 py-2 mt-5 text-black   hover:bg-gray-300 border-2 border-white/10 shadow-xl shadow-black/40 hover:bg-[#097969]/70 transition-colors duration-300 transform'
                    >
                        {
                            user ? <button
                                onClick={handleLogOut}
                                className='flex w-full items-center px-4 py-2 mt-5 text-black border-2 border-white/10 shadow-xl shadow-black/40 hover:bg-[#097969]/70   hover:text-white rounded-lg      transition-colors duration-300 transform'
                            >
                                <GrLogout className='w-5 h-5' />

                                <span className='mx-4 font-poppins uppercase font-medium'>Logout</span>
                            </button> :
                                <Link
                                    to='/login'
                                    className='flex w-full items-center px-4 py-2 mt-5 text-black   hover:bg-gray-300 border-2 border-white/10 shadow-xl shadow-black/40 hover:bg-[#097969]/70 transition-colors duration-300 transform'
                                >
                                    <GrLogout className='w-5 h-5' />

                                    <span className='mx-4 font-poppins uppercase font-medium'>Login</span>
                                </Link>
                        }
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default SideBar