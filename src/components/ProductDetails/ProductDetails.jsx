import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Heart, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import NewsLetter from '../NewsLetter/NewsLetter';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useReview from '../../hooks/useReview';
import Modal from 'react-modal';
import tik from '../../assets/tik.png';
import StarRatings from 'react-star-ratings';
import SubmitReview from '../SubmitReview';
import Loader from '../Loader/Loader';

const modalStyles = {
    content: {
        top: '60%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '500px',
        backgroundColor: '#097969',
        color: 'black',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
};

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('product-details');
    const { user } = useAuth();
    const [, refetch] = useCart();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [reviews, refetchReviews] = useReview();

    const categoryTranslations = {
        "earbuds": "Écouteurs",
        "smartwatch": "Montre intelligente",
        "cover": "Étui",
        "earphone": "Oreillette",
        "adapter": "Adaptateur",
        "powerbank": "Batterie externe",
        "speaker": "Haut-parleurs",
        "microphone": "Microphone",
        "monitor": "Moniteur",
        "camera": "Caméra"
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://dantech-server.onrender.com/product/${id}`);
                setProduct(response.data);
                if (response.data.images?.length > 0) {
                    setSelectedImage(0);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to fetch product details. Please try again.',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleQuantityChange = (type) => {
        setQuantity((prev) => (type === 'increment' ? prev + 1 : prev > 1 ? prev - 1 : prev));
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleReviewSubmitted = () => {
        refetchReviews();
        closeModal();
    };

    const productReview = reviews.filter(review => review.productName === product?.name);

    if (loading) {
        return <Loader />;
    }

    const handleAddToCart = () => {
        if (user && user.email) {
            const cartItem = {
                productId: product._id,
                email: user.email,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity,
            };
    
            axios.post('https://dantech-server.onrender.com/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${product.name} ajouté au panier`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de l\'ajout au panier :', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oups...',
                        text: 'Échec de l\'ajout de l\'article au panier. Veuillez réessayer.',
                    });
                });
        } else {
            Swal.fire({
                title: "Vous n'êtes pas connecté",
                text: "Veuillez vous connecter pour ajouter des articles au panier.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Oui, connectez-vous !"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };
    

    const handleAddToWishlist = () => {
        if (user && user.email) {
            const wishlistItem = {
                productId: product._id,
                email: user.email,
                name: product.name,
                price: product.price,
                image: product.images[0],
            };
    
            axios.post('https://dantech-server.onrender.com/wishlist', wishlistItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${product.name} ajouté à la liste de souhaits`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de l\'ajout à la liste de souhaits :', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oups...',
                        text: 'Échec de l\'ajout de l\'article à la liste de souhaits. Veuillez réessayer.',
                    });
                });
        } else {
            Swal.fire({
                title: "Vous n'êtes pas connecté",
                text: "Veuillez vous connecter pour ajouter des articles à la liste de souhaits.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Oui, connectez-vous !"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };
    

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Fermer
            </button>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Gallery */}
                <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={product?.images[selectedImage]}
                            alt={product?.name}
                            className="w-full h-96 md:h-[450px] xl:h-[500px] object-cover object-center"
                        />
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="grid grid-cols-4 gap-2">
                        {product?.images.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-[#097969] shadow-md' : 'border-transparent'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`thumbnail-${index}`}
                                    className="w-full h-20 xl:h-28 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <span className="inline-block px-3 py-1 text-sm font-medium text-[#097969] bg-[#097969]/10 rounded-full mb-2 font-poppin uppercase">
                        {categoryTranslations[product?.category] || product?.category}
                        </span>
                        <h1 className="lg:text-3xl text-xl font-bold text-gray-900 mb-2">{product?.name}</h1>
                        <p className="text-gray-600 text-justify">{product?.details}</p>
                    </div>

                    <div className="flex items-baseline gap-4">
                        <span className="text-3xl font-bold text-gray-900">${product?.price}</span>
                        {product?.deletePrice && (
                            <span className="text-xl text-gray-400 line-through">${product?.deletePrice}</span>
                        )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Quantité :</span>
                        <div className="flex items-center border rounded-lg">
                            <button
                                onClick={() => handleQuantityChange('decrement')}
                                disabled={quantity <= 1}
                                className="h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange('increment')}
                                className="h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-[#097969] hover:bg-[#097969] text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Ajouter au panier
                        </button>
                        <button
                            onClick={handleAddToWishlist}
                            className="px-6 py-3 border border-[#097969] rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-[#097969] btn"
                        >
                            <Heart className="w-4 h-4 text-[#097969]" />
                            Liste de souhaits
                        </button>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Review Modal"
            >
                <h2 className="text-xl font-bold mb-4 text-center text-white">Soumettez votre avis</h2>

                <SubmitReview user={user}
                    productName={product.name} onReviewSubmitted={handleReviewSubmitted} />
                <div className='flex justify-end'>
                    <button
                        onClick={closeModal}
                        className="mt-4 py-2 px-4 rounded border text-white border-gray-300"
                    >
                       Fermer
                    </button>
                </div>
            </Modal>

            <div className='flex items-center justify-center mt-10'>
                <Tabs>
                    <TabList className="flex justify-center border-gray-300">
                        <Tab
                            onClick={() => setActiveTab('product-details')}
                            className={`py-2 px-4 text-lg font-semibold cursor-pointer 
                ${activeTab === 'product-details' ? 'border-b-2 border-[#097969] text-[#097969]' : 'hover:text-[#097969]'} 
                focus:outline-none`}
                        >
                            Détails du produit
                        </Tab>
                        <Tab
                            onClick={() => setActiveTab('reviews')}
                            className={`py-2 px-4 text-lg font-semibold cursor-pointer 
                ${activeTab === 'reviews' ? 'border-b-2 border-[#097969] text-[#097969]' : 'hover:text-[#097969]'} 
                focus:outline-none`}
                        >
                            Avis
                        </Tab>
                        <Tab
                            onClick={() => setActiveTab('faq')}
                            className={`py-2 px-4 text-lg font-semibold cursor-pointer 
                ${activeTab === 'faq' ? 'border-b-2 border-[#097969] text-[#097969]' : 'hover:text-[#097969]'} 
                focus:outline-none`}
                        >
                            FAQ (Questions Fréquemment Posées)
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <div className="my-6 text-justify">
                            {/* product details */}
                            {product?.details}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3'>
                            {productReview.map((review, index) => (
                                <div key={index} className="p-6 border-2 rounded-lg shadow-xl border-black bg-white transition-transform transform hover:scale-105">
                                    <div className="flex items-center mb-4">
                                        <StarRatings
                                            rating={review.rating}
                                            starRatedColor="gold"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension='26px'
                                            starSpacing='2px'
                                        />
                                    </div>
                                    <p className="text-md mb-2"> {review.reviewText}</p>
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        {review.name}
                                        <img src={tik} alt="Verified" className="w-6 h-6" />
                                    </h3>
                                    <p className="text-md text-gray-600">Date: {new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-end'>
                            <button
                                onClick={openModal}
                                className='border-2 border-black text-black px-4 py-2 rounded-lg mt-2'
                            >
                                Ajouter un avis
                            </button>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <section className="">
                            <div className="container flex flex-col justify-center text-justify p-4 mx-auto md:p-8">
                                <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Questions Fréquemment Posées</h2>
                                <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
                                    <div>
                                        <h3 className="font-semibold">Quels modes de paiement acceptez-vous ?</h3>
                                        <p className="mt-1 text-justify">Nous acceptons divers modes de paiement, y compris les cartes de crédit/débit, PayPal et les principaux portefeuilles numériques. Vous pouvez également utiliser un crédit magasin ou des codes promotionnels lors du paiement.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Combien de temps prend la livraison ?</h3>
                                        <p className="mt-1 text-justify">Les délais de livraison dépendent de votre emplacement. Les commandes nationales arrivent généralement dans un délai de 3 à 5 jours ouvrables, tandis que les commandes internationales peuvent prendre 7 à 14 jours ouvrables. Des options de livraison accélérée sont également disponibles lors du paiement.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Puis-je retourner ou échanger un article ?</h3>
                                        <p className="mt-1 text-justify">Oui, nous avons une politique de retour de 30 jours. Si vous n'êtes pas satisfait de votre achat, vous pouvez le retourner ou l'échanger dans les 30 jours suivant la réception de l'article, tant qu'il est en bon état. Consultez notre page de politique de retour pour plus de détails.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Comment puis-je suivre ma commande ?</h3>
                                        <p className="mt-1 text-justify">Une fois votre commande expédiée, vous recevrez un numéro de suivi par e-mail. Vous pouvez utiliser ce numéro pour suivre votre commande sur notre site web ou celui du transporteur. Si vous avez des problèmes, n'hésitez pas à contacter notre équipe d'assistance.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </TabPanel>
                </Tabs>
            </div>

            <NewsLetter />
        </div>
    );
};

export default ProductDetails;
