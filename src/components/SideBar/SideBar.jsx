import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import {
    Search,
    ShoppingBag,
    Watch,
    Headphones,
    Smartphone,
    Battery,
    Mic,
    Monitor,
    Speaker,
    Camera,
    ChevronRight,
    User,
    LogOut,
    Menu
} from 'lucide-react';
import img from '../../assets/photo.jpg'

const SideBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isActive, setActive] = useState(true);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const handleToggle = () => {
        setActive(!isActive);
    };

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

    const categories = [
        { path: '/shop', name: 'Tous les produits', icon: <ShoppingBag className="w-4 h-4" /> },
        { path: '/earbud', name: 'Écouteurs', icon: <Headphones className="w-4 h-4" /> },
        { path: '/smartwatch', name: 'Montre connectée', icon: <Watch className="w-4 h-4" /> },
        { path: '/cover', name: 'Housse', icon: <Smartphone className="w-4 h-4" /> },
        { path: '/earphone', name: 'Écouteur', icon: <Headphones className="w-4 h-4" /> },
        { path: '/adapter', name: 'Adaptateur', icon: <Battery className="w-4 h-4" /> },
        { path: '/powerbank', name: 'Batterie externe', icon: <Battery className="w-4 h-4" /> },
        { path: '/microphone', name: 'Microphone', icon: <Mic className="w-4 h-4" /> },
        { path: '/monitor', name: 'Moniteur', icon: <Monitor className="w-4 h-4" /> },
        { path: '/speaker', name: 'Haut-parleur', icon: <Speaker className="w-4 h-4" /> },
        { path: '/camera', name: 'Appareil photo', icon: <Camera className="w-4 h-4" /> },
    ];

    return (
        <div className="relative my-3">
            {/* Mobile Toggle Button */}
            <button
                onClick={handleToggle}
                className="md:hidden flex top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Sidebar */}
            <aside
                className={` 
                    fixed md:sticky top-0 left-0 h-screen 
                    w-60 md:w-56 lg:w-64 
                    bg-white  shadow-lg 
                    transition-transform duration-300 ease-in-out
                    ${isActive ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
                    z-40 flex flex-col
                `}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-center border-b shrink-0">
                    <Link to="/" className="text-xl font-bold text-emerald-700 font-poppin">
                        <img src={img} className='h-[32px]' alt="" />
                    </Link>
                </div>

                {/* Main Content Wrapper */}
                <div className="flex flex-col flex-grow overflow-hidden">
                    {/* Search */}
                    <div className="p-3 border-b shrink-0">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                name="text"
                                placeholder="Rechercher..."
                                className="w-full px-3 py-1.5 text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                            <button type="submit" className="absolute right-2 top-1.5">
                                <Search className="w-4 h-4 text-gray-400" />
                            </button>
                        </form>
                    </div>

                    {/* Categories - Scrollable */}
                    <div className="flex-grow overflow-y-auto">
                        <div className="p-3">
                            <div className="space-y-0.5">
                                {categories.map((category) => (
                                    <NavLink
                                        key={category.path}
                                        to={category.path}
                                        onClick={() => window.innerWidth < 768 && setActive(true)}
                                        className={({ isActive }) =>
                                            `flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                                                isActive
                                                    ? 'bg-[#097969]/20 text-[#097969]'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`
                                        }
                                    >
                                        {category.icon}
                                        <span className="ml-2 lg:text-lg uppercase font-poppin">{category.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* User Section */}
                    <div className="p-3 border-t bg-white shrink-0">
                        {user ? (
                            <div className="space-y-1">
                                <NavLink
                                    to="/profile"
                                    onClick={() => window.innerWidth < 768 && setActive(true)}
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 text-sm rounded-lg ${
                                            isActive
                                                ? 'bg-emerald-50 text-[]'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`
                                    }
                                >
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" className="w-6 h-6 rounded-full" />
                                    ) : (
                                        <User className="w-4 h-4" />
                                    )}
                                    <span className="ml-2 text-sm lg:text-lg uppercase font-poppin">Profil</span>
                                </NavLink>
                                <button
                                    onClick={handleLogOut}
                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="ml-2 text-sm lg:text-lg uppercase font-poppin">Déconnexion</span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => window.innerWidth < 768 && setActive(true)}
                                className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="ml-2 text-sm lg:text-lg uppercase font-poppin">Connexion</span>
                            </Link>
                        )}
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {!isActive && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={handleToggle}
                />
            )}
        </div>
    );
};

export default SideBar;
