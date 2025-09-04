import React, { useState } from "react";
import Logo from "../../componentns/logo";
import { palette } from "../../assets/Palette";
import Step1 from "../../componentns/profile_steps/Step1";
import Step2 from "../../componentns/profile_steps/Step2";
import Step3 from "../../componentns/profile_steps/Step3";

const steps = ["Account Info", "Personal Details", "Confirmation"];

export default function ProfileSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };
  const [profile, setProfile] = useState({
    avatar: "/BUBB.png",
    coverImage: "",
    bio: "",
    address: "",
    phone: "",
    gender: "",
    birthDate: "",
    profession: "",
    portfolioUrl:""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-center w-full my-4">
        <Logo />
      </div>

      <div className="relative w-full mb-8">
        <div
          className="w-full h-2 rounded-full"
          style={{ backgroundColor: palette.vanilla?.DEFAULT }}
        />
        <div
          className="absolute top-0 left-0 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
            backgroundColor: palette.midnight_green.DEFAULT,
          }}
        />
        <div className="flex justify-between mt-2 text-sm font-medium">
          {steps.map((step, index) => (
            <span
              key={index}
              className="transition-colors duration-300"
              style={{
                color:
                  index === currentStep
                    ? palette.midnight_green.DEFAULT
                    : palette.rich_black[400],
              }}
            >
              {step}
            </span>
          ))}
        </div>
      </div>

      <form
        className="p-6 border rounded-2xl shadow-sm transition-all duration-500"
        key={currentStep}
        style={{
          backgroundColor: palette.vanilla[900],
          borderColor: palette.vanilla[600],
        }}
      >
        {currentStep === 0 && (
          <div className="animate-fade-in">
            <Step1 profile={profile} setProfile={setProfile} />
          </div>
        )}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <Step2 profile={profile} setProfile={setProfile}/>
          </div>
        )}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <Step3 profile={profile} setProfile={setProfile}/>
          </div>
        )}
      </form>

      <div className="flex justify-between mt-6 text-sm">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-lg text-white transition-colors duration-300"
          style={{
            backgroundColor:
              currentStep === 0
                ? palette.rich_black[300]
                : palette.midnight_green[500],
            // color: palette.rich_black?.DEFAULT,
            cursor: currentStep === 0 ? "not-allowed" : "pointer",
          }}
        >
          Back
        </button>
        <div className="flex gap-2 items-center">
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 rounded-lg text-white transition-colors duration-300"
            style={{
              backgroundColor:
                currentStep === steps.length - 1
                  ? palette.rich_black[300]
                  : palette.midnight_green[500],
              cursor:
                currentStep === steps.length - 1 ? "not-allowed" : "pointer",
            }}
          >
            {currentStep === steps.length - 1 ? "Done" : "Next"}
          </button>
          {currentStep >= 1 && (
            <button
              className="px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer"
              style={{
                border: `
                1px solid
                ${palette.midnight_green[500]}
                `,
                color : palette.midnight_green[500]
              }}
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
