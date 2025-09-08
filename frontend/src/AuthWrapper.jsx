// src/layouts/AuthWrapper.jsx
import { useEffect, useState } from "react";
import { useNavigate , Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserDecoded } from "./api/apis";
import React from 'react'

export default function AuthWrapper({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (localStorage.getItem("token")) {
          const response = await getUserDecoded(localStorage.getItem("token"));

          dispatch({ type: "SET_USER", payload: response?.user });
          dispatch({ type: "SET_PROFILE", payload: response?.profile });

          if (response?.user) {
            if (response?.profile?.isProfileCompleted) {
              navigate("/me/profile");
            } else {
              navigate("/complete-profile");
            }
          } else {
            navigate("/");
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [dispatch, navigate]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-[#02182E] to-[#022F56] z-50">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <Outlet />;
}
