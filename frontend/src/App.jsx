import React, { useEffect, useState } from "react";
import { RouterProvider, useNavigate } from "react-router-dom";
import { Router } from "./Router";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { getUserDecoded } from "./api/apis";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  const getUser = async () => {
    try {
      setIsLoading(true);
      const response = await getUserDecoded(localStorage.getItem("token"));
      dispatch({ type: "SET_USER", payload: response?.user });
      dispatch({ type: "SET_PROFILE", payload: response?.profile });
      // if (response?.user) {
      //   if (response?.profile?.isProfileCompleted) {
      //     navigate("/me/profile");
      //   } else {
      //     navigate("/complete-profile");
      //   }
      // }else{
      //   navigate('/')
      // }
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage?.getItem("token")) {
      getUser();
    }
  }, []);

  return isLoading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-[#02182E] to-[#022F56] z-50">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <Toaster />
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
