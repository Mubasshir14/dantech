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
        // Récupérer les données du produit par ID
        axios.get(`https://dantech-server.onrender.com/product/${id}`)
            .then(response => {
                const data = response.data;
                // Définir les valeurs par défaut du formulaire à partir des données récupérées
                setValue('name', data.name);
                setValue('details', data.details);
                setValue('category', data.category);
                setValue('subcategory', data.subcategory);
                setValue('sellingPrice', data.price);
                setValue('deletePrice', data.deletePrice);

                // Définir les images d'aperçu si elles existent
                if (data.images && data.images.length > 0) {
                    setPreviewUrls(data.images);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du produit :', error);
                setLoading(false);
            });
    }, [id, setValue]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // Créer des URLs d'aperçu
        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviewUrls]);

        // Stocker les fichiers sélectionnés
        setSelectedImages(prev => [...prev, ...files]);
    };

    const removeImage = (index) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => {
            // Révoquer l'URL pour éviter les fuites de mémoire
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
                    title: `${data.name} a été mis à jour avec succès.`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/manage-product');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit :', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Une erreur s'est produite. Veuillez réessayer.",
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
            <h1 className='font-poppin text-2xl md:text-3xl uppercase font-extrabold text-center -mt-20'>MISE À JOUR DU PRODUIT</h1>
            <div className="flex items-center justify-center md:mb-20 p-2">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-lg mt-6 border-2 border-black">
                    {/* Nom du produit */}
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
                        {/* Sélection de la catégorie */}
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text text-gray-700 font-bold uppercase font-poppin">Catégorie*</span>
                            </div>
                            <select
                                {...register("category", {
                                    required: "La catégorie est requise"
                                })}
                                className="select select-bordered w-full font-bold uppercase font-poppin"
                            >
                                <option disabled value='default'>Sélectionner la catégorie</option>
                                <option value="earbuds">Earbuds</option>
                                <option value="smartwatch">Montre connectée</option>
                                <option value="cover">Étui</option>
                                <option value="earphone">Écouteur</option>
                                <option value="adapter">Adaptateur</option>
                                <option value="powerbank">Powerbank</option>
                                <option value="speaker">Haut-parleurs</option>
                                <option value="microphone">Microphone</option>
                                <option value="monitor">Moniteur</option>
                                <option value="camera">Caméra</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                        </label>

                        {/* Sélection de la sous-catégorie */}
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text text-gray-700 font-bold uppercase font-poppin">Sous-catégorie*</span>
                            </div>
                            <select
                                {...register("subcategory", {
                                    required: "La sous-catégorie est requise"
                                })}
                                className="select select-bordered w-full font-bold uppercase font-poppin"
                            >
                                <option disabled value='default'>Sélectionner la sous-catégorie</option>
                                <option value="flashdeal">Offre flash</option>
                                <option value="newarrival">Nouvelle arrivée</option>
                                <option value="topsale">Meilleure vente</option>
                                <option value="blank">Aucun</option>
                            </select>
                            {errors.subcategory && <p className="text-red-500 text-sm mt-1">{errors.subcategory.message}</p>}
                        </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Prix de vente */}
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text text-gray-700 font-bold uppercase font-poppin">Prix de vente*</span>
                            </div>
                            <input
                                {...register("sellingPrice", {
                                    required: "Le prix de vente est requis",
                                    min: { message: "Le prix ne peut pas être négatif" },
                                    valueAsNumber: true
                                })}
                                type="number"
                                placeholder="Prix de vente"
                                className="input input-bordered w-full"
                            />
                            {errors.sellingPrice && <p className="text-red-500 text-sm mt-1">{errors.sellingPrice.message}</p>}
                        </label>

                        {/* Prix de suppression */}
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text text-gray-700 font-bold uppercase font-poppin">Prix de suppression</span>
                            </div>
                            <input
                                {...register("deletePrice", {
                                    required: false,
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

                    {/* Détails du produit */}
                    <label className="form-control w-full mt-3">
                        <div className="label">
                            <span className="label-text text-gray-700 font-bold uppercase font-poppin">Détails du produit*</span>
                        </div>
                        <textarea
                            {...register("details", {
                                required: "Les détails sont requis",
                                minLength: { value: 20, message: "Les détails doivent comporter au moins 20 caractères" }
                            })}
                            placeholder="Détails du produit"
                            className="textarea textarea-bordered h-24"
                        ></textarea>
                        {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>}
                    </label>

                    {/* Sélection d'images */}
                    <div className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text text-gray-700 font-bold uppercase font-poppin">Sélectionner des images*</span>
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

                    <div className="flex flex-col md:flex-row gap-3 mt-5">
                        {/* Images sélectionnées */}
                        <div className='flex flex-col'>
                            <span className='font-bold text-gray-700 uppercase font-poppin'>Aperçu des images :</span>
                            <div className='flex flex-row overflow-x-auto mt-2'>
                                {previewUrls.map((url, index) => (
                                    <div key={index} className='relative'>
                                        <img src={url} alt="Aperçu" className="w-20 h-20 object-cover mr-2 border-2 border-gray-300 rounded" />
                                        <button
                                            type='button'
                                            onClick={() => removeImage(index)}
                                            className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
                                        >
                                            <X className='w-3 h-3' />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bouton de mise à jour */}
                    <div className='flex justify-end mt-5'>
                        <button type="submit" className={`w-full my-6 text-white p-2 rounded flex items-center justify-center gap-2 bg-black disabled:bg-gray-400 hover:bg-gray-800 transition-colors ${isUploading ? 'Mise à jour en cours...' : ''}`}>
                            {isUploading ? "Mise à jour en cours..." : "Mettre à jour le produit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
