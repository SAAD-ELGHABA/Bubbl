import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/authActions';
import { toast } from 'sonner';

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const dispatch = useDispatch()
    const { loading, user, error,success } = useSelector(state => state.auth)

    const handleRegister = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        dispatch(register(formData, navigate));
    };
    //register with google
    const googleRegister = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // tokenResponse has { access_token, expires_in, scope, token_type }
                const { access_token } = tokenResponse;

                const { data } = await axios.post("http://localhost:5000/api/user/google", {
                    token: access_token, // send the actual Google access_token
                });
                window.localStorage.setItem('auth-user', JSON.stringify(data.user))
                dispatch({ type: "LOGIN_SUCCESS", payload: data });
                console.log("Google signup success:", data);
            } catch (error) {
                console.error("Google signup error:", error.response?.data || error.message);
            }
        },
        onError: () => {
            console.log("Google Signup Failed");
        },
    });

 useEffect(()=>{
        success && (
            toast.success('You are loged in successfully!')
        )
    },[success])

    return (
        <form className="space-y-5" onSubmit={handleRegister}>
            <h2 className="text-2xl font-bold text-[#02182E] text-center mb-2">
                Create Account
            </h2>
            <p className="text-center text-[#488DB4] mb-6">
                Join our community today
            </p>

            <div>
                <label
                    htmlFor="register-name"
                    className="block text-sm font-medium text-[#022F56] mb-2"
                >
                    Full Name
                </label>
                <input
                    type="text"
                    id="register-name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white text-[#02182E] border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                />
            </div>

            <div>
                <label
                    htmlFor="register-email"
                    className="block text-sm font-medium text-[#022F56] mb-2"
                >
                    Email Address
                </label>
                <input
                    type="email"
                    id="register-email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white text-[#02182E] border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] focus:border-transparent transition-all"
                    placeholder="Enter your email"
                />
            </div>

            <div>
                <label
                    htmlFor="register-password"
                    className="block text-sm font-medium text-[#022F56] mb-2"
                >
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="register-password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white text-[#02182E] border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] focus:border-transparent transition-all pr-12"
                        placeholder="Create a password"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#488DB4] hover:text-[#022F56]"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div>
                <label
                    htmlFor="register-confirm-password"
                    className="block text-sm font-medium text-[#022F56] mb-2"
                >
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="register-confirm-password"
                        value={formData.confirmPassword}

                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white text-[#02182E] border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] focus:border-transparent transition-all pr-12"
                        placeholder="Confirm your password"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#488DB4] hover:text-[#022F56]"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#022F56] to-[#488DB4] hover:from-[#02182E] hover:to-[#022F56] text-white font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
                {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>

                ) : (
                    <>
                        Create Account <UserPlus size={18} />
                    </>
                )}
            </button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#85C4E4]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-[#488DB4]">Or continue with</span>
                </div>
            </div>

            <button
                type="button"
                onClick={() => googleRegister()}
                className="w-full bg-white mt-2 hover:bg-gray-50 rounded-lg py-3 text-[#02182E] font-medium shadow-sm border border-[#85C4E4] flex items-center justify-center gap-3 transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
                    <path d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z"></path>
                </svg>
                Continue with Google
            </button>
        </form>
    )
}

export default SignUpForm