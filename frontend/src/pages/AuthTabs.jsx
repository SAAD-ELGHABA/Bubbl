import React, { useState } from "react";
import { LogIn, Eye, EyeOff, UserPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import SignUpForm from "../componentns/forms/SignUpForm";
import LoginForm from "../componentns/forms/LoginForm";

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("login");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[url(/auth-bg.png)] bg-cover bg-center p-4 overflow-hidden ">
      {/* your content */}

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#02182E] to-[#022F56]  text-center">
          <h1 className="text-3xl font-bold text-white mb-2">BUBBL</h1>
          <p className="text-[#85C4E4]">
            Connect with friends and the world around you
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#CCDEE4]">
          <button
            className={`flex-1 py-4 font-medium transition-all duration-300 ${
              activeTab === "login"
                ? "text-[#022F56] border-b-2 border-[#488DB4] bg-[#85C4E4]/10"
                : "text-[#488DB4] hover:bg-[#CCDEE4]/30"
            }`}
            onClick={() => handleTabChange("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-4 font-medium transition-all duration-300 ${
              activeTab === "register"
                ? "text-[#022F56] border-b-2 border-[#488DB4] bg-[#85C4E4]/10"
                : "text-[#488DB4] hover:bg-[#CCDEE4]/30"
            }`}
            onClick={() => handleTabChange("register")}
          >
            Register
          </button>
        </div>

        {/* Forms */}
        <div className="p-6">
          {activeTab === "login" && <LoginForm />}

          {activeTab === "register" && <SignUpForm />}
        </div>

        {/* Footer */}
        <div className="bg-[#CCDEE4] p-4 text-center text-sm text-[#488DB4]">
          © {new Date().getFullYear()} BubblApp. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AuthTabs;
