import React, { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Camera } from 'lucide-react';
import img from '../../assets/photo.png';
import { AuthContext } from '../provider/AuthProvider';
import SocialLogin from '../SocialLogin';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Signup = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [verificationEmailSent, setVerificationEmailSent] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setValue('image', file);
                clearErrors('image');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', data.image);

            const response = await axios.post(image_hosting_api, formData);
            const photoURL = response.data.data.url;

            const userRes = await createUser(data.email, data.password);
            await updateUserProfile(data.name, photoURL);

            let userInfo = {
                name: data.name,
                email: data.email,
                photoURL: photoURL,
            };

            const dbRes = await axios.post('https://dantech-server.onrender.com/users', userInfo);

            if (dbRes.data.insertedId) {
                reset();
                setVerificationEmailSent(true);
                navigate('/login');
                Swal.fire({
                    title: 'Succès !',
                    text: 'Votre compte a été créé avec succès. Veuillez vérifier votre email pour valider votre compte avant de vous connecter.',
                    icon: 'success',
                    confirmButtonText: 'D\'accord'
                });
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            Swal.fire({
                title: 'Erreur !',
                text: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.',
                icon: 'error',
                confirmButtonText: 'Réessayer'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='mt-10 md:mt-8'>
            <div className='p-6 md:p-20 rounded-xl'>
                <div className='p-6 md:p-20 rounded-xl shadow-xl shadow-black'>
                    <div className="flex flex-col lg:flex-row-reverse w-full mx-auto overflow-hidden bg-white rounded-lg lg:max-w-4xl">
                        <div className="hidden lg:flex items-center justify-center lg:w-1/2 bg-center bg-no-repeat"><img src={img} alt="" /></div>
                        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                            <div className="flex justify-center mx-auto">
                                <img className="w-auto h-7 sm:h-8" src={img} alt="" />
                            </div>
                            <p className="mt-3 text-xl font-bold text-center text-gray-800 dark:text-gray-200">S'inscrire</p>
                            {verificationEmailSent && (
                                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                                    Un email de vérification a été envoyé à votre adresse email. Veuillez vérifier votre email avant de vous connecter.
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Nom</label>
                                    <input className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                        {...register("name", { required: true })}
                                        placeholder="Nom"
                                        type="text"
                                    />
                                    {errors.name && <span className='text-red-600'>Le nom est requis</span>}
                                </div>

                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-600">Photo</label>
                                    <div className="form-control w-full flex items-center">
                                        <input
                                            {...register("image", { required: "L'image est requise" })}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                            ref={fileInputRef}
                                        />
                                        <div
                                            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer"
                                            onClick={handleIconClick}
                                        >
                                            {previewImage ? (
                                                <img src={previewImage} alt="Aperçu" className="w-full h-full object-cover rounded-full" />
                                            ) : (
                                                <Camera size={48} className="text-gray-400" />
                                            )}
                                        </div>
                                        <span className="ml-4 text-sm text-gray-500">Cliquez pour télécharger une image</span>
                                    </div>
                                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                                </div>

                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">Email</label>
                                    <input className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                        {...register("email", { required: true })}
                                        placeholder="Email"
                                        type="email"
                                    />
                                    {errors.email && <span className='text-red-600'>L'email est requis</span>}
                                </div>

                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Mot de passe</label>
                                    <input
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                        {...register("password", {
                                            required: "Le mot de passe est requis",
                                            minLength: {
                                                value: 6,
                                                message: "Le mot de passe doit comporter au moins 6 caractères",
                                            },
                                            maxLength: {
                                                value: 20,
                                                message: "Le mot de passe ne doit pas dépasser 20 caractères",
                                            },
                                            pattern: {
                                                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d)(?=.*[a-z])/,
                                                message: "Le mot de passe doit inclure une majuscule, une minuscule, un nombre et un caractère spécial",
                                            },
                                        })}
                                        placeholder="Mot de passe"
                                        type="password"
                                    />
                                    <div className="space-y-1">
                                        <p className="text-xs font-poppin text-gray-400 uppercase">
                                            Utilisez une majuscule, une minuscule, un caractère spécial et un nombre
                                        </p>
                                    </div>
                                    {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                                </div>

                                <button
                                    type="submit"
                                    className="block w-full px-4 py-2 mt-4 text-white bg-[#097969] rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 hover:bg-blue-500 disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5a8 8 0 008 8v-4a4 4 0 00-4-4H6z"></path>
                                            </svg>
                                            Chargement...
                                        </span>
                                    ) : (
                                        'S\'inscrire'
                                    )}
                                </button>
                            </form>
                            <div className="divider divider-accent text-gray-800">OU</div>
<SocialLogin/>
                            <p className="mt-6 text-sm font-medium text-center text-gray-600">
                                Vous avez déjà un compte ?{' '}
                                <Link to="/login" className="text-[#097969] hover:underline">Connectez-vous</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
