import React from "react";
import { palette } from "../../assets/Palette";

function Step3({ profile, setProfile }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Bio</label>
        <textarea
          name="bio"
          value={profile.bio || ""}
          rows={5}
          onChange={handleChange}
          className={`w-full border rounded p-2 border-[${palette.midnight_green.DEFAULT}] focus:ring-1 focus:ring-[${palette.dark_cyan.DEFAULT}]`}
          placeholder="Write a short bio"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Portfolio URL</label>
        <input
          type="url"
          name="portfolioUrl"
          value={profile.portfolioUrl || ""}
          onChange={handleChange}
          className={`w-full border rounded p-2 border-[${palette.midnight_green.DEFAULT}] focus:ring-1 focus:ring-[${palette.dark_cyan.DEFAULT}]`}
          placeholder="https://your-portfolio.com"
        />
      </div>
    </div>
  );
}

export default Step3;
