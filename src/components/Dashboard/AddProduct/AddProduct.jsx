import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import Dashboard from '../Dashboard';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

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

            if (selectedImages.length === 0) {
                Swal.fire({
                    icon: "error",
                    title: "Veuillez sélectionner au moins une image.",
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            // Upload all images
            const imageUrls = await uploadImages(selectedImages);

            const productItem = {
                name: data.name,
                category: data.category,
                subcategory: data.subcategory,
                price: parseFloat(data.sellingPrice),
                deletePrice: parseFloat(data.deletePrice),
                details: data.details,
                images: imageUrls,
                status: 'available',
                createdAt: new Date().toISOString()
            };

            const productRes = await axios.post('https://dantech-server.onrender.com/product', productItem);

            if (productRes.data.insertedId) {
                reset();
                setSelectedImages([]);
                setPreviewUrls(prev => {
                    // Cleanup URLs
                    prev.forEach(url => URL.revokeObjectURL(url));
                    return [];
                });

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} a été ajouté à la collection de produits.`,
                    showConfirmButton: false,
                    timer: 1500
                });

                // navigate('/manage-product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Une erreur s'est produite. Veuillez réessayer",
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <Dashboard />
            <h1 className='font-poppin text-2xl md:text-3xl uppercase font-extrabold text-center -mt-20 '>AJOUTER UN PRODUIT</h1>
            <div className="flex items-center  justify-center md:mb-20 p-2">

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-lg mt-6 border-2 border-black">
                    {/* Product Name */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-gray-700 font-bold uppercase font-poppin">Nom du produit*</span>
                        </div>
                        <input
                            {...register("name", {
                                required: "Le nom du produit est requis",
                                minLength: { value: 3, message: "Le nom doit comporter au moins 3 caractères" }
                            })}
                            type="text"
                            placeholder="Nom du produit"
                            className="input input-bordered w-full"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </label>

                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Category Selection */}
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text text-gray-700 font-bold uppercase font-poppin">Catégorie*</span>
                            </div>
                            <select
                                defaultValue="default"
                                {...register("category", {
                                    required: "La catégorie est requise"
                                })}
                                className="select select-bordered w-full font-bold uppercase font-poppin"
                            >
                                <option disabled value='default'>Sélectionner une catégorie</option>
                                <option value="earbuds">Écouteurs</option>
                                <option value="smartwatch">Montre intelligente</option>
                                <option value="cover">Étui</option>
                                <option value="earphone">Oreillette</option>
                                <option value="adapter">Adaptateur</option>
                                <option value="powerbank">Batterie externe</option>
                                <option value="speaker">Haut-parleurs</option>
                                <option value="microphone">Microphone</option>
                                <option value="monitor">Moniteur</option>
                                <option value="camera">Caméra</option>

                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                        </label>

                        {/* Sub Category Selection */}
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text text-gray-700 font-bold uppercase font-poppin">Sous-catégorie*</span>
                            </div>
                            <select
                                defaultValue="default"
                                {...register("subcategory", {
                                    required: "La sous-catégorie est requise."
                                })}
                                className="select select-bordered w-full font-bold uppercase font-poppin"
                            >
                                <option disabled value='default'>Sélectionner une sous-catégorie</option>
                                <option value="flashdeal">Offre Flash</option>
                                <option value="newarrival">Nouvelle Arrivée</option>
                                <option value="topsale">Meilleure Vente</option>
                                <option value="blank">Aucune</option>

                            </select>
                            {errors.subcategory && <p className="text-red-500 text-sm mt-1">{errors.subcategory.message}</p>}
                        </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Selling Price */}
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text text-gray-700 font-bold uppercase font-poppin">Prix de vente*</span>
                            </div>
                            <input
                                {...register("sellingPrice", {
                                    required: "Le prix de vente est requis.",
                                    min: { message: "Le prix ne peut pas être négatif." },
                                    valueAsNumber: true
                                })}
                                type="number"
                                placeholder="Prix de vente"
                                className="input input-bordered w-full"
                            />
                            {errors.sellingPrice && <p className="text-red-500 text-sm mt-1">{errors.sellingPrice.message}</p>}
                        </label>

                        {/* Delete Price */}
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text text-gray-700 font-bold uppercase font-poppin">Prix de suppression*</span>
                            </div>
                            <input
                                {...register("deletePrice", {
                                    required: "Le prix de suppression est requis",
                                    min: { message: "Le prix ne peut pas être négatif" },
                                    valueAsNumber: true
                                })}
                                type="number"
                                placeholder="Prix de suppression"
                                className="input input-bordered w-full"
                            />
                            {errors.deletePrice && <p className="text-red-500 text-sm mt-1">{errors.deletePrice.message}</p>}
                        </label>

                    </div>

                    {/* Product Details */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text text-gray-700 font-bold uppercase font-poppin">Détails du produit*</span>
                        </div>
                        <textarea
                            {...register("details", {
                                required: "Les détails du produit sont requis"
                            })}
                            className="textarea textarea-bordered w-full min-h-32"
                            placeholder="Détails du produit"
                        ></textarea>
                        {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>}
                    </label>




                    {/* Multiple Image Upload */}
                    <div className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text text-gray-700 font-bold uppercase font-poppin">Images du produit*</span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            placeholder='Images du produit'
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
                        {isUploading ? 'Téléchargement en cours......' : 'Ajouter un produit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;