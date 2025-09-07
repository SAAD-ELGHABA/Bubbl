import React, { useEffect, useState } from "react";
import Logo from "../../componentns/logo";
import Step1 from "../../componentns/profile_steps/Step1";
import Step2 from "../../componentns/profile_steps/Step2";
import Step3 from "../../componentns/profile_steps/Step3";
import { toast } from "sonner";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
import { setProfileData } from "../../api/apis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const steps = ["Account Info", "Personal Details", "Confirmation"];

export default function ProfileSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const { user, loading, error, success, Profile } = useSelector(
    (state) => state.auth
  );

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const [profile, setProfile] = useState({
    avatar: "",
    coverImage: "",
    bio: "",
    address: "",
    phone: "",
    city: "",
    country: "",
    gender: "",
    birthDate: "",
    profession: "",
    portfolioUrl: "",
  });
  const dispatch = useDispatch();
  const handleProfile = async () => {
    const today = new Date();
    const birth = new Date(profile.birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (
      age < 18 ||
      (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      toast.error("You must be at least 18 years old");
      return;
    }

    if (!profile.profession || !profile.phone || !profile.gender) {
      toast.error("Please fill all required fields: Profession, Phone, Gender");
      return;
    }

    try {
      const avatarUrl = await uploadToCloudinary(profile.avatar);

      const coverUrl = await uploadToCloudinary(profile.coverImage);

      setProfile({
        ...profile,
        avatar: avatarUrl,
        coverImage: coverUrl,
      });

      console.log("Updated profile:", {
        ...profile,
        avatar: avatarUrl,
        coverImage: coverUrl,
      });
      const response = await setProfileData({
        ...profile,
        avatar: avatarUrl,
        coverImage: coverUrl,
      });
      console.log(response);
      dispatch({ type: "SET_PROFILE", payload: response.data?.profile });
    } catch (err) {
      console.error("Upload error:", err);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    Profile?.isProfileCompleted && user && navigate("/me/profile");
  }, [Profile?.isProfileCompleted, navigate, user]);
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-r from-[#02182E] to-[#022F56]">
      <div className="bg-gradient-to-r from-[#02182E] to-[#022F56] p-6 text-center w-full">
        <h1 className="text-3xl font-bold text-white mb-2">BUBBL</h1>
        <p className="text-[#85C4E4]">
          Complete your profile to get more flexibility
        </p>
      </div>
      <form
        className="w-full max-w-2xl space-y-5 bg-white rounded-2xl p-4 md:p-8 shadow-lg"
        key={currentStep}
      >
        <h2 className="text-2xl font-bold text-[#02182E] text-center mb-2">
          {steps[currentStep]}
        </h2>
        <p className="text-center text-[#488DB4] mb-6">
          Fill in your details to continue
        </p>

        {currentStep === 0 && (
          <Step1 profile={profile} setProfile={setProfile} />
        )}
        {currentStep === 1 && (
          <Step2 profile={profile} setProfile={setProfile} />
        )}
        {currentStep === 2 && (
          <Step3 profile={profile} setProfile={setProfile} />
        )}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
              currentStep === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-[#022F56] to-[#488DB4] text-white hover:brightness-110"
            }`}
          >
            Back
          </button>

          <div className="flex gap-3">
            {currentStep < steps.length - 1 && (
              <button
                type="button"
                onClick={nextStep}
                className="px-5 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-[#022F56] to-[#488DB4] hover:from-[#02182E] hover:to-[#022F56] transition-all duration-300"
              >
                Next
              </button>
            )}
            {currentStep === steps.length - 1 && (
              <button
                type="button"
                className={`px-5 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-[#022F56] to-[#488DB4] hover:from-[#02182E] hover:to-[#022F56] transition-all duration-300 ${
                  !profile.profession ||
                  !profile.phone ||
                  !profile.gender ||
                  !profile.birthDate ||
                  new Date().getFullYear() -
                    new Date(profile.birthDate).getFullYear() <
                    18
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleProfile}
                disabled={
                  !profile.profession ||
                  !profile.phone ||
                  !profile.gender ||
                  !profile.birthDate ||
                  new Date().getFullYear() -
                    new Date(profile.birthDate).getFullYear() <
                    18
                }
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
