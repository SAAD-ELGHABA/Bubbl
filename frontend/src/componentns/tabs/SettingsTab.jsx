import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileTab from "./ProfileTab";
import { Camera } from "lucide-react";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
import { toast } from "sonner";
import { updateProfile } from "../../actions/authActions";
import PasswordTab from "./PasswordTab";

const SettingsTab = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector((state) => state.auth?.user));
  const [profile, setProfile] = useState(
    useSelector((state) => state.auth?.Profile)
  );
  const [settingTarget, setSettingTarget] = useState("none");
  const { success } = useSelector((state) => state.auth);

  const handleAvatarUpload = async (e) => {
    const updateAvatar = await uploadToCloudinary(e.target.files[0]);
    setUser({ ...user, avatar: updateAvatar });
    dispatch(updateProfile(user));
    if (success) {
      toast.success("Profile updated successfully!");
      setSettingTarget("none");
    }
  };
  const handleCoverChange = async (e) => {
    const coverImage = await uploadToCloudinary(e.target.files[0]);
    setUser({ ...user, coverImage });
    dispatch(updateProfile(user));
    if (success) {
      toast.success("Profile updated successfully!");
      setSettingTarget("none");
    }
  };

  return (
    <div className="w-full overflow-hidden h-full  ">
      <div className="bg-gradient-to-r from-[#02182E] to-[#022F56] p-3 mb-4 text-white">
        <h1 className="text-xl md:text-2xl font-bold">Account Settings</h1>
        <p className="text-[#85C4E4] text-xs md:text-sm">
          Manage your profile and account preferences
        </p>
      </div>
      <div className="flex flex-col md:max-w-5xl md:mx-auto w-full mb-8">
        <div
          className="h-80 bg-cover bg-center rounded-t-lg  relative"
          style={{
            backgroundImage: `url(${
              profile?.coverImage || "/cover-placeholder.png"
            })`,
          }}
        >
          {settingTarget === "profile" && (
            <label
              htmlFor="cover-upload"
              className="absolute bottom-2 right-2 flex items-center justify-center gap-2 bg-[#488DB4] text-white border border-[#02182E] p-2 rounded-full cursor-pointer"
            >
              Edit Profile Cover <Camera size={18} />
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverChange}
              />
            </label>
          )}

          <div className="absolute -bottom-12 left-6 w-24 h-24">
            <img
              src={profile?.avatar || "/picture-placeholder.png"}
              alt="Profile"
              className="w-full h-full rounded-full border-4 border-white object-cover"
            />
            {settingTarget === "profile" && (
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-[#488DB4] p-2 rounded-full cursor-pointer"
              >
                <Camera size={16} />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
            )}
          </div>
        </div>
        {settingTarget === "none" && (
          <div className="space-y-6 w-full pt-16 pb-8 px-4 bg-white rounded-b-md shadow-lg">
            <div>
              <h3 className="font-semibold text-[#022F56] mb-2">
                Account Settings
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span>Edit Profile</span>
                  <button
                    onClick={() => setSettingTarget("profile")}
                    className="text-[#488DB4] hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span>Change Password</span>
                  <button
                    onClick={() => setSettingTarget("password")}
                    className="text-[#488DB4] hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span>Privacy Settings</span>
                  <button
                    onClick={() => setSettingTarget("privacy")}
                    className="text-[#488DB4] hover:underline cursor-pointer"
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#022F56] mb-2">
                Notification Settings
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span>Email Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#488DB4]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span>Push Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#488DB4]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        {settingTarget === "profile" && <ProfileTab />}

        {settingTarget === "password" && <PasswordTab /> }
      </div>
    </div>
  );
};

export default SettingsTab;
