import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import Dashboard from '../Dashboard';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch product data by ID
        axios.get(`https://dantech-server.onrender.com/product/${id}`)
            .then(response => {
                const data = response.data;
                // Set form default values from fetched data
                setValue('name', data.name);
                setValue('details', data.details);
                setValue('category', data.category);
                setValue('subcategory', data.subcategory);
                setValue('sellingPrice', data.price);
                setValue('deletePrice', data.deletePrice);

                // Set preview images if they exist
                if (data.images && data.images.length > 0) {
                    setPreviewUrls(data.images);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                setLoading(false);
            });
    }, [id, setValue]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // Create preview URLs
        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviewUrls]);

        // Store selected files
        setSelectedImages(prev => [...prev, ...files]);
    };

    const removeImage = (index) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => {
            // Revoke the URL to prevent memory leaks
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const uploadImages = async (images) => {
        const uploadPromises = images.map(async (image) => {
            const formData = new FormData();
            formData.append('image', image);

            const response = await axios.post(image_hosting_api, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            return response.data.data.display_url;
        });

        return Promise.all(uploadPromises);
    };

    const onSubmit = async (data) => {
        try {
            setIsUploading(true);

            let imageUrls = [...previewUrls];
            if (selectedImages.length > 0) {
                const newImageUrls = await uploadImages(selectedImages);
                imageUrls = [...imageUrls, ...newImageUrls];
            }

            const productItem = {
                name: data.name,
                category: data.category,
                subcategory: data.subcategory,
                price: parseFloat(data.sellingPrice),
                deletePrice: parseFloat(data.deletePrice),
                details: data.details,
                images: imageUrls,
                updatedAt: new Date().toISOString()
            };

            const productRes = await axios.patch(`https://dantech-server.onrender.com/product/${id}`, productItem);

            if (productRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been updated successfully.`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/manage-product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "An error occurred. Please try again.",
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setIsUploading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    return (
        <div>
            <Dashboard />
            <h1 className='font-poppin text-2xl md:text-3xl uppercase font-extrabold text-center -mt-20'>UPDATE PRODUCT</h1>
            <div className="flex items-center justify-center md:mb-20 p-2">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-lg mt-6 border-2 border-black">
                    {/* Product Name */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-gray-700 font-bold uppercase font-poppin">Product Name*</span>
                        </div>
                        <input
                            {...register("name", {
                                required: "Product Name is required",
                                minLength: { value: 3, message: "Name must be at least 3 characters" }
                            })}
                            type="text"
                            placeholder="Product Name"
                            className="input input-bordered w-full"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </label>

                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Category Selection */}
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text text-gray-700 font-bold uppercase font-poppin">Category*</span>
                            </div>
                            <select
                                {...register("category", {
                                    required: "Category is required"
                                })}
                                className="select select-bordered w-full font-bold uppercase font-poppin"
                            >
                                <option disabled value='default'>Select category</option>
                                <option value="earbuds">Earbuds</option>
                                <option value="smartwatch">Smartwatch</option>
                                <option value="cover">Cover</option>
                                <option value="earphone">Earphone</option>
                                <option value="adapter">Adapter</option>
                                <option value="powerbank">Powerbank</option>
                                <option value="speaker">Speakers</option>
                                <option value="microphone">Microphone</option>
                                <option value="monitor">Monitor</option>
                                <option value="camera">Camera</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                        </label>

                        {/* Sub Category Selection */}
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text text-gray-700 font-bold uppercase font-poppin">Sub Category*</span>
                            </div>
                            <select
                                {...register("subcategory", {
                                    required: "Subcategory is required"
                                })}
                                className="select select-bordered w-full font-bold uppercase font-poppin"
                            >
                                <option disabled value='default'>Select subcategory</option>
                                <option value="flashdeal">Flash Deal</option>
                                <option value="newarrival">New Arrival</option>
                                <option value="topsale">Top Sale</option>
                                <option value="blank">None</option>
                            </select>
                            {errors.subcategory && <p className="text-red-500 text-sm mt-1">{errors.subcategory.message}</p>}
                        </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Selling Price */}
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text text-gray-700 font-bold uppercase font-poppin">Selling Price*</span>
                            </div>
                            <input
                                {...register("sellingPrice", {
                                    required: "Selling Price is required",
                                    min: { message: "Price cannot be negative" },
                                    valueAsNumber: true
                                })}
                                type="number"
                                placeholder="Selling Price"
                                className="input input-bordered w-full"
                            />
                            {errors.sellingPrice && <p className="text-red-500 text-sm mt-1">{errors.sellingPrice.message}</p>}
                        </label>

                        {/* Delete Price */}
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text text-gray-700 font-bold uppercase font-poppin">Delete Price*</span>
                            </div>
                            <input
                                {...register("deletePrice", {
                                    required: "Delete Price is required",
                                    min: { message: "Price cannot be negative" },
                                    valueAsNumber: true
                                })}
                                type="number"
                                placeholder="Delete Price"
                                className="input input-bordered w-full"
                            />
                            {errors.deletePrice && <p className="text-red-500 text-sm mt-1">{errors.deletePrice.message}</p>}
                        </label>
                    </div>

                    {/* Product Details */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text text-gray-700 font-bold uppercase font-poppin">Product Details*</span>
                        </div>
                        <textarea
                            {...register("details", {
                                required: "Product Details are required",
                                minLength: { value: 20, message: "Details must be at least 20 characters" }
                            })}
                            className="textarea textarea-bordered w-full min-h-32"
                            placeholder="Product Details"
                        ></textarea>
                        {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>}
                    </label>

                    {/* Multiple Image Upload */}
                    <div className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text text-gray-700 font-bold uppercase font-poppin">Product Images*</span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="file-input w-full"
                        />

                        {/* Image Preview Grid */}
                        {previewUrls.length > 0 && (
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {previewUrls.map((url, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={url}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-24 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isUploading}
                        className="w-full my-6 text-white p-2 rounded flex items-center justify-center gap-2 bg-black disabled:bg-gray-400 hover:bg-gray-800 transition-colors"
                    >
                        {isUploading ? 'Updating...' : 'Update Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;