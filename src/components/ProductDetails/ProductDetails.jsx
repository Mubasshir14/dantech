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
        backgroundColor: '#59C6D2',
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
                            title: `${product.name} Added To The Cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to add item to cart. Please try again.',
                    });
                });
        } else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add items to the cart.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
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
                            title: `${product.name} Added To The Wishlist`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(error => {
                    console.error('Error adding to wishlist:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to add item to wishlist. Please try again.',
                    });
                });
        } else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add items to the wishlist.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
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
                Back to Products
            </button>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Gallery */}
                <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={product?.images[selectedImage]}
                            alt={product?.name}
                            className="w-full h-96 md:h-[450px] object-cover object-center"
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
                                    className="w-full h-20 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <span className="inline-block px-3 py-1 text-sm font-medium text-[#097969] bg-[#097969]/10 rounded-full mb-2 font-poppin uppercase">
                            {product?.category}
                        </span>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product?.name}</h1>
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
                        <span className="text-gray-700">Quantity:</span>
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
                            Add to Cart
                        </button>
                        <button
                            onClick={handleAddToWishlist}
                            className="px-6 py-3 border border-[#097969] rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-[#097969] btn"
                        >
                            <Heart className="w-4 h-4 text-[#097969]" />
                            Wishlist
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
                <h2 className="text-xl font-bold mb-4 text-center">Submit Your Review</h2>
                <SubmitReview user={user}
                    productName={product.name} onReviewSubmitted={handleReviewSubmitted} />
                <div className='flex justify-end'>
                    <button
                        onClick={closeModal}
                        className="mt-4 py-2 px-4 rounded border border-gray-300"
                    >
                        Close
                    </button>
                </div>
            </Modal>

            <div className='flex items-center justify-center  mt-10'>
                <Tabs>
                    <TabList className="flex justify-center border-gray-300">
                        <Tab
                            onClick={() => setActiveTab('product-details')}
                            className={`py-2 px-4 text-lg font-semibold cursor-pointer 
          ${activeTab === 'product-details' ? 'border-b-2 border-[#097969] text-[#097969]' : 'hover:text-[#097969]'} 
          focus:outline-none`}
                        >
                            Product Details
                        </Tab>
                        <Tab
                            onClick={() => setActiveTab('reviews')}
                            className={`py-2 px-4 text-lg font-semibold cursor-pointer 
          ${activeTab === 'reviews' ? 'border-b-2 border-[#097969] text-[#097969]' : 'hover:text-[#097969]'} 
          focus:outline-none`}
                        >
                            Reviews
                        </Tab>
                        <Tab
                            onClick={() => setActiveTab('faq')}
                            className={`py-2 px-4 text-lg font-semibold cursor-pointer 
          ${activeTab === 'faq' ? 'border-b-2 border-[#097969] text-[#097969]' : 'hover:text-[#097969]'} 
          focus:outline-none`}
                        >
                            FAQ
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
                                Add Review
                            </button>
                        </div>

                    </TabPanel>
                    <TabPanel>
                        <section className="">
                            <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
                                <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
                                <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>
                                <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
                                    <div>
                                        <h3 className="font-semibold">What payment methods do you accept?</h3>
                                        <p className="mt-1 ">We accept a variety of payment methods, including credit/debit cards, PayPal, and major digital wallets. You can also use store credit or promotional codes during checkout.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">How long does shipping take?</h3>
                                        <p className="mt-1 ">Shipping times depend on your location. Domestic orders usually arrive within 3-5 business days, while international orders may take 7-14 business days. Expedited shipping options are also available at checkout.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Can I return or exchange an item?</h3>
                                        <p className="mt-1 ">Yes, we have a 30-day return policy. If you're not satisfied with your purchase, you can return or exchange it within 30 days of receiving the item, as long as it’s in its original condition. Check our return policy page for more details.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">How can I track my order?</h3>
                                        <p className="mt-1 ">Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order through our website or the carrier’s site. If you have any issues, feel free to contact our support team.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </TabPanel>
                </Tabs>
            </div>
            <NewsLetter/>
        </div> 
    );
};

export default ProductDetails;
