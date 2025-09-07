import React, { useState } from "react";
import { resendEmail } from "../api/apis";

function ResendEmail() {
  const [isLoading, setIsloading] = useState(false);
  const handleResendEmail = async () => {
    setIsloading(true)
    try {
      const response = await resendEmail()
      console.log(response);
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsloading(false)
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row items-center  max-w-4xl w-full">
        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src="/email-sending.gif"
            alt="sending-email"
            className="max-w-xs md:max-w-sm cursor-not-allowed"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-2xl font-bold text-[#02182E] mb-2">
            We have sent you an email
          </h1>
          <h5 className="text-gray-600 mb-6">Please check your email inbox</h5>
          <p className="text-gray-500">
            <span className="block mb-3">Didn’t receive it?</span>
            <button
              className="w-1/2 py-3 bg-gradient-to-r from-[#022F56] to-[#488DB4] hover:from-[#02182E] hover:to-[#022F56] text-white font-semibold rounded-lg shadow-md transition-all flex cursor-pointer items-center justify-center gap-2 disabled:opacity-70"
              onClick={handleResendEmail}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  resend Email
                </>
              )}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResendEmail;
