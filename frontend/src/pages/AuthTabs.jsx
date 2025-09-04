import React, { useState } from "react";
import { LogIn } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
const AuthTabs = () => {
    const [activeTab, setActiveTab] = useState("login");
    const [formData, setFormData] = useState({
        login: {
            email: "",
            password: "",
        },
        register: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const dispatch = useDispatch()
    const { user, loading, error } = useSelector((state) => state.auth);



    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (tab, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [tab]: {
                ...prev[tab],
                [field]: value,
            },
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(formData.login))

        if(loading){
            console.log('loading')
        }else if(user){
            console.log(user)
        }else{
            console.log(error)
        }
    };
    const nav = useNavigate()
    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register(formData.register,nav))
        if(loading){
            console.log('loading')
        }else if(user){
            console.log(user)
        }else{
            console.log(error)
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-[linear-gradient(135deg,#001219,#005f73,#0a9396,#94d2bd,#e9d8a6,#ee9b00,#ca6702,#bb3e03,#ae2012,#9b2226)]">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
                {/* Tabs */}
                <div className="flex justify-between mb-6">
                    <button
                        className={`w-1/2 py-1 text-md font-semibold rounded-xl transition-all ${activeTab === "login"
                            ? "bg-[#0a9396] text-white shadow-lg"
                            : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                        onClick={() => handleTabChange("login")}
                    >
                        Login
                    </button>
                    <button
                        className={`w-1/2 py-1 text-md font-semibold rounded-xl transition-all ml-2 ${activeTab === "register"
                            ? "bg-[#ee9b00] text-white shadow-lg"
                            : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                        onClick={() => handleTabChange("register")}
                    >
                        Register
                    </button>
                </div>

                {/* Forms */}
                <div>
                    {activeTab === "login" && (
                        <form className="space-y-5" onSubmit={handleLogin}>
                            <h2 className="text-2xl font-bold text-white text-center mb-4">
                                Welcome Back
                            </h2>
                            <div>
                                <label
                                    htmlFor="login-email"
                                    className="block text-sm font-medium text-white mb-1"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="login-email"
                                    value={formData.login.email}
                                    autoComplete
                                    onChange={(e) =>
                                        handleInputChange("login", "email", e.target.value)
                                    }
                                    required
                                    className="w-full px-4 py-1.5 rounded-xl bg-white/20 text-black placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#0a9396]"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="login-password"
                                    className="block text-sm font-medium text-white mb-1"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="login-password"
                                    value={formData.login.password}
                                    onChange={(e) =>
                                        handleInputChange("login", "password", e.target.value)
                                    }
                                    required
                                    className="w-full px-4 py-1.5 rounded-xl bg-white/20 text-black placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#0a9396]"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#0a9396] hover:bg-[#005f73] text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-4"
                            >
                                Login <LogIn />
                            </button>

                            <div className="relative mb-4">
                                <div className="h-0.5 absolute top-1/2 -translate-y-1/2 z-10 w-full rounded-sm  bg-[linear-gradient(135deg,#001219,#005f73,#0a9396,#94d2bd,#e9d8a6,#ee9b00,#ca6702,#bb3e03,#ae2012,#9b2226)]"></div>
                                <h6 className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-black px-1 py-1 z-20 text-xs rounded" style={{ letterSpacing: '2px' }}>OR</h6>
                            </div>

                            <button className="w-full bg-amber-50/50 mt-2 hover:bg-amber-50 rounded-lg py-2 text-lg font-medium shadow-md flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                    <path d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z"></path>
                                </svg>
                                Google
                            </button>
                        </form>
                    )}

                    {activeTab === "register" && (
                        <form className="space-y-5" onSubmit={handleRegister}>
                            <h2 className="text-2xl font-bold text-white text-center mb-4">
                                Create Account
                            </h2>
                            <div>
                                <label
                                    htmlFor="register-name"
                                    className="block text-sm font-medium text-white mb-1"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="register-name"
                                    value={formData.register.name}
                                    autoComplete
                                    onChange={(e) =>
                                        handleInputChange("register", "name", e.target.value)
                                    }
                                    required
                                    className="w-full px-4 py-1.5 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#ee9b00]"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="register-email"
                                    className="block text-sm font-medium text-white mb-1"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="register-email"
                                    value={formData.register.email}
                                    autoComplete
                                    onChange={(e) =>
                                        handleInputChange("register", "email", e.target.value)
                                    }
                                    required
                                    className="w-full px-4 py-1.5 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#ee9b00]"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="register-password"
                                    className="block text-sm font-medium text-white mb-1"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="register-password"
                                    value={formData.register.password}
                                    onChange={(e) =>
                                        handleInputChange("register", "password", e.target.value)
                                    }
                                    required
                                    className="w-full px-4 py-1.5 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#ee9b00]"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="register-confirm-password"
                                    className="block text-sm font-medium text-white mb-1"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="register-confirm-password"
                                    value={formData.register.confirmPassword}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "register",
                                            "confirmPassword",
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="w-full px-4 py-1.5 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#ee9b00]"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#ee9b00] hover:bg-[#ca6702] text-white font-semibold rounded-xl shadow-lg transition-all"
                            >
                                Register
                            </button>
                            <div className="relative mb-4">
                                <div className="h-0.5 absolute top-1/2 -translate-y-1/2 z-10 w-full rounded-sm  bg-[linear-gradient(135deg,#001219,#005f73,#0a9396,#94d2bd,#e9d8a6,#ee9b00,#ca6702,#bb3e03,#ae2012,#9b2226)]"></div>
                                <h6 className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-black px-1 py-1 z-20 text-xs rounded" style={{ letterSpacing: '2px' }}>Continue With</h6>
                            </div>

                            <button className="w-full bg-amber-50/50 mt-2 hover:bg-amber-50 rounded-lg py-2 text-lg font-medium shadow-md flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                    <path d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z"></path>
                                </svg>
                                Google
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthTabs;
