import React, { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Camera } from 'lucide-react';
import img from '../../assets/dantech.png';
import login from '../../assets/dantech.png';
import bg from '../../assets/dantech.png';
import { AuthContext } from '../provider/AuthProvider';

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
            // Handle image upload
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
                
            }

            const dbRes = await axios.post('https://dantech-server.onrender.com/users', userInfo);

            if (dbRes.data.insertedId) {
                reset();
                setVerificationEmailSent(true);
                navigate('/login')
                Swal.fire({
                    title: 'Success!',
                    text: 'Your account has been created successfully. Please check your email to verify your account before logging in.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error during sign up:', error);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred during sign up. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='mt-10 md:mt-8'>
            {/* <Helmet>
                <title>Nexus||Sign Up</title>
            </Helmet> */}
            <div className='p-6 md:p-20 rounded-xl' style={{  }}>
                <div className='p-6 md:p-20 rounded-xl shadow-xl shadow-black' style={{  }}>
                    <div className="flex flex-col lg:flex-row-reverse w-full mx-auto overflow-hidden bg-white rounded-lg  lg:max-w-4xl">
                        <div className="hidden lg:flex items-center justify-center lg:w-1/2 bg-cover" > <img src={img} alt="" /></div>
                        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                            <div className="flex justify-center mx-auto">
                                <img className="w-auto h-7 sm:h-8" src={img} alt="" />
                            </div>
                            <p className="mt-3 text-xl font-bold text-center text-gray-800 dark:text-gray-200">Sign Up</p>
                            {verificationEmailSent && (
                                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                                    A verification email has been sent to your email address. Please verify your email before logging in.
                                </div>
                            )}
                           

                           
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* Common Fields */}
                                    <div className="mt-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Name</label>
                                        <input className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                            {...register("name", { required: true })}
                                            placeholder="Name"
                                            type="text"
                                        />
                                        {errors.name && <span className='text-red-600'>Name is required</span>}
                                    </div>

                                    <div className="mt-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-600">Photo</label>
                                        <div className="form-control w-full flex items-center">
                                            <input
                                                {...register("image", { required: "Image is required" })}
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
                                                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-full" />
                                                ) : (
                                                    <Camera size={48} className="text-gray-400" />
                                                )}
                                            </div>
                                            <span className="ml-4 text-sm text-gray-500">Click to upload an image</span>
                                        </div>
                                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                                    </div>

                                    <div className="mt-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-600 ">Email </label>
                                        <input className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                            {...register("email", { required: true })}
                                            placeholder="Email"
                                            type="email"
                                        />
                                        {errors.email && <span className='text-red-600'>Email is required</span>}
                                    </div>

                                    <div className="mt-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Password</label>
                                        <input
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters",
                                                },
                                                maxLength: {
                                                    value: 20,
                                                    message: "Password must not exceed 20 characters",
                                                },
                                                pattern: {
                                                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d)(?=.*[a-z])/,
                                                    message: "Password must include uppercase, lowercase, number, and special character",
                                                },
                                            })}
                                            placeholder="Password"
                                            type="password"
                                        />
                                        <div className="space-y-1">
                                            <p className="text-xs font-poppin text-gray-400 uppercase">
                                                Use uppercase, lowercase, special character, and number
                                            </p>
                                        </div>
                                        {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                                    </div>


                                    

                                    {/* Sign Up Button */}
                                    <button
                                        type="submit"
                                        className="block w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 hover:bg-blue-500 disabled:opacity-50"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Signing Up...
                                            </span>
                                        ) : (
                                            'Sign Up'
                                        )}
                                    </button>
                                </form>
                            

                            <p className="mt-6 text-xs font-light text-center text-gray-400">Already have an account? <Link to="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">Sign in</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;