import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {  getUserDecoded } from "../api/apis";

function EmailVerifying() {
  const location = useLocation();
  const nav = useNavigate()
  const getUser = async () => {
    try {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const response = await getUserDecoded(token);
      if(response?.isVerified){
        nav('/complete-profile')
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [location]);

  return (
    <h1>
      <div className="min-h-screen gap-4 w-full flex items-center justify-center">
        <div
          className="w-12 h-12 rounded-full border-4 border-b-2 border-b-transparent animate-spin border-[#022F56]"
          style={{
            borderStyle: "solid",
          }}
        ></div>
        <h1>Verifying ..</h1>
      </div>
    </h1>
  );
}

export default EmailVerifying;
