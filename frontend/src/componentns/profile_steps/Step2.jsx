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
<div className="space-y-5">
  {/* Cover Image / Avatar */}
  <div className="relative w-full h-48 bg-gray-100 rounded-2xl overflow-hidden border border-[#85C4E4]">
    <input
      type="file"
      accept="image/*"
      ref={coverImgRef}
      onChange={handleCoverChange}
      className="hidden"
    />

    {profile.coverImage && (
      <img
        src={profile.coverImage}
        alt="Cover"
        className="w-full h-full object-cover"
      />
    )}

    {/* Cover Image Upload Button */}
    <div
      className={`absolute left-1/2 transform -translate-x-1/2 ${
        profile.coverImage ? "bottom-2" : "top-1/2 -translate-y-1/2"
      } z-10 cursor-pointer`}
      onClick={handleCoverClick}
    >
      <div className="bg-gradient-to-r from-[#022F56] to-[#488DB4] p-3 rounded-full flex items-center justify-center opacity-90 hover:brightness-110 transition-all">
        <Camera className="w-6 h-6 text-white" />
      </div>
    </div>

    {/* Avatar */}
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
          className="w-24 h-24 rounded-full object-cover border-4 border-[#488DB4]"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-[#022F56] flex items-center justify-center border-4 border-[#488DB4]">
          <Camera className="text-white w-6 h-6" />
        </div>
      )}
    </div>
  </div>

  {/* Address */}
  <div>
    <label className="block text-sm font-medium text-[#022F56] mb-2">
      Address
    </label>
    <input
      type="text"
      name="address"
      value={profile.address}
      onChange={handleChange}
      placeholder="Address"
      className="w-full px-4 py-3 rounded-lg bg-white text-[#02182E] border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] focus:border-transparent transition-all"
    />
  </div>

  {/* Gender */}
  <div>
    <label className="block text-sm font-medium text-[#022F56] mb-2">
      Gender *
    </label>
    <select
      name="gender"
      value={profile.gender || ""}
      onChange={handleChange}
      className="w-full px-4 py-3 rounded-lg bg-white text-[#02182E] border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] focus:border-transparent transition-all"
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
