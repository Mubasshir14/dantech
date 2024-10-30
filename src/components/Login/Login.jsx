// import login from '../../assets/bg.png';
// import bg from '../../assets/authentication.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import img from '../../assets/dantech.png'
import { AuthContext } from '../provider/AuthProvider';
const Login = () => {
    const { signIn, resetPassword } = useContext(AuthContext);
    const [email, setEmail] = useState('');  
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleLogIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const password = form.password.value;

        signIn(email, password)
            .then(res => {
                Swal.fire({
                    title: 'Login Successful!',
                    text: 'You have successfully logged in.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Login Failed!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            });
    };

    const handleResetPassword = async () => {
        if (!email.trim()) {
            return Swal.fire('Error', 'Please enter your email', 'error');
        }
        try {
            await resetPassword(email);
            Swal.fire('Success', 'Check your email for further instructions', 'success');
        }
        catch (err) {
            Swal.fire('Error', err.message, 'error');
        }
    }

    return (
        <div className='mt-8'>
            <div className='p-6 md:p-20 rounded-xl' style={{  }}>
                <div className='p-6 md:p-20 rounded-xl shadow-xl shadow-black' style={{  }}>
                    <div className="flex flex-col lg:flex-row w-full mx-auto overflow-hidden bg-white rounded-lg  lg:max-w-4xl">
                        <div className="hidden lg:block lg:w-1/2 bg-cover " style={{ backgroundImage: `url(${img})` }}></div>

                        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                            <div className="flex justify-center mx-auto">
                                <img className="w-auto h-7 sm:h-8" src={img} alt="Login" />
                            </div>

                            <p className="mt-3 text-xl font-bold text-center text-gray-800 ">
                                Login
                            </p>

                            <form onSubmit={handleLogIn}>
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">Email</label>
                                    <input
                                        id="LoggingEmailAddress"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                        name='email'
                                        placeholder='Email'
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}  // Update email state
                                    />
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between">
                                        <label className="block mb-2 text-sm font-medium text-gray-600 ">Password</label>
                                    </div>
                                    <input
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                        name='password'
                                        placeholder='Password'
                                        type="password"
                                    />
                                </div>
                                <div className='space-y-1'>
                                    <button
                                        type="button"  
                                        onClick={handleResetPassword}
                                        className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
                                        Forgot password?
                                    </button>
                                </div>

                                <div className="mt-6">
                                    <input
                                        className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#097969] rounded-lg hover:bg-[#097969]/70 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                                        type="submit"
                                        value="Sign In"
                                    />
                                </div>
                            </form>

                            <div className="flex items-center justify-between mt-4">
                                <span className="w-1/5 border-b  md:w-1/4"></span>
                                <Link to='/signup' className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">
                                    or sign up
                                </Link>
                                <span className="w-1/5 border-b  md:w-1/4"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
