import React, { useRef } from "react";
import { palette } from "../../assets/Palette";
import { Camera } from "lucide-react";

function Step2({ profile, setProfile }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const coverImgRef = useRef(null);
  const avatarImgRef = useRef(null);

  const handleCoverClick = () => coverImgRef.current?.click();
  const handleAvatarClick = () => avatarImgRef.current?.click();

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
        <input
          type="file"
          accept="image/*"
          ref={coverImgRef}
          onChange={handleCoverChange}
          className="hidden"
        />

        {profile.coverImage ? (
          <img
            src={profile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : null}

        <div
          className={`absolute left-1/2 transform -translate-x-1/2 ${
            profile.coverImage ? "bottom-2" : "top-1/2"
          } ${profile.coverImage ? "translate-y-0" : "-translate-y-1/2"} z-10 cursor-pointer`}
          onClick={handleCoverClick}
        >
          <div
            className={`bg-[${palette.dark_cyan.DEFAULT}] p-2 rounded-full opacity-90 flex items-center justify-center`}
          >
            <Camera className="w-16 h-16 text-white" />
          </div>
        </div>

        <div
          className="absolute bottom-2 right-2 cursor-pointer z-20"
          onClick={handleAvatarClick}
        >
          <input
            type="file"
            accept="image/*"
            ref={avatarImgRef}
            onChange={handleAvatarChange}
            className="hidden"
          />
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt="Avatar Preview"
              className={`w-24 h-24 rounded-full object-cover border-4 border-[${palette.dark_cyan.DEFAULT}]`}
            />
          ) : (
            <div
              className={`w-24 h-24 rounded-full bg-[${palette.midnight_green.DEFAULT}] flex items-center justify-center border-4 border-[${palette.dark_cyan.DEFAULT}]`}
            >
              <Camera className="text-white w-6 h-6" />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={profile.address}
          onChange={handleChange}
          className={`w-full border rounded p-2 border-[${palette.midnight_green.DEFAULT}] focus:ring-1 focus:ring-[${palette.dark_cyan.DEFAULT}]`}
          placeholder="Address"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Gender</label>
        <select
          name="gender"
          value={profile.gender || ""}
          onChange={handleChange}
          className={`w-full border rounded p-2 border-[${palette.midnight_green.DEFAULT}] focus:ring-1 focus:ring-[${palette.dark_cyan.DEFAULT}]`}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
}

export default Step2;
