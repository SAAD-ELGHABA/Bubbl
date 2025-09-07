import React from "react";
import { palette } from "../../assets/Palette";

function Step3({ profile, setProfile }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
<div className="space-y-5">
  {/* Bio */}
  <div>
    <label
      htmlFor="bio"
      className="block text-sm font-medium text-[#022F56] mb-2"
    >
      Bio
    </label>
    <textarea
      id="bio"
      name="bio"
      value={profile.bio || ""}
      rows={5}
      onChange={handleChange}
      placeholder="Write a short bio"
      className="w-full px-4 py-3 rounded-lg bg-white text-[#02182E] border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] focus:border-transparent transition-all resize-none"
    />
  </div>

  {/* Portfolio URL */}
  <div>
    <label
      htmlFor="portfolioUrl"
      className="block text-sm font-medium text-[#022F56] mb-2"
    >
      City
    </label>
    <input
      type="text"
      id="city"
      name="city"
      value={profile.city || ""}
      onChange={handleChange}
      placeholder="Enter your city"
      className="w-full px-4 py-3 rounded-lg bg-white text-[#02182E] border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] focus:border-transparent transition-all"
    />
  </div>
  <div>
    <label
      htmlFor="country"
      className="block text-sm font-medium text-[#022F56] mb-2"
    >
      Country
    </label>
    <input
      type="counrty"
      id="country"
      name="country"
      value={profile.country || ""}
      onChange={handleChange}
      placeholder="Enter your country"
      className="w-full px-4 py-3 rounded-lg bg-white text-[#02182E] border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] focus:border-transparent transition-all"
    />
  </div>
  <div>
    <label
      htmlFor="portfolioUrl"
      className="block text-sm font-medium text-[#022F56] mb-2"
    >
      Portfolio URL
    </label>
    <input
      type="url"
      id="portfolioUrl"
      name="portfolioUrl"
      value={profile.portfolioUrl || ""}
      onChange={handleChange}
      placeholder="https://your-portfolio.com"
      className="w-full px-4 py-3 rounded-lg bg-white text-[#02182E] border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] focus:border-transparent transition-all"
    />
  </div>
</div>

  );
}

export default Step3;
