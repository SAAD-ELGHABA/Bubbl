import { Edit, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { professions } from "../../assets/fields";
import ProfessionDropdown from "../drop_downs/ProfessionDropdown";
import { toast } from "sonner";
import { updateProfile } from "../../actions/authActions";

const ProfileTab = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(
    useSelector((state) => state.auth.user)
  );
  const [Profile, setProfile] = useState(
    useSelector((state) => state.auth?.Profile)
  );

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // dispatch(updateUser(userData));
      dispatch(updateProfile(Profile));
      setTimeout(() => {
        setIsLoading(false);
        setEditMode(false);
        // toast.success('Profile updated successfully!');
      }, 1500);
    } catch (error) {
      console.error("Error saving data:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full pt-16 pb-8 px-4 bg-white rounded-b-md shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#02182E]">
          Profile Information
        </h2>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center bg-[#488DB4] text-white px-4 py-2 rounded-lg hover:bg-[#022F56] transition-colors"
          >
            <Edit size={18} className="mr-2" /> Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="flex items-center bg-[#022F56] text-white px-4 py-2 rounded-lg hover:bg-[#02182E] transition-colors"
          >
            <Save size={18} className="mr-2" /> Save Changes
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#022F56] mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              disabled={!editMode}
              className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#022F56] mb-1">
              Email Address
            </label>
            <div className="flex items-center">
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                disabled={!editMode}
                className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#022F56] mb-1">
            Biography
          </label>
          <textarea
            name="bio"
            placeholder="Type your biography"
            className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
            onChange={(e) => setProfile({ ...Profile, bio: e.target.value })}
          >
            {Profile?.bio}
          </textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#022F56] mb-1">
              Phone Number
            </label>
            <div className="flex items-center">
              <input
                type="tel"
                name="phone"
                value={Profile?.phone}
                onChange={(e) =>
                  setProfile({ ...Profile, phone: e.target.value })
                }
                disabled={!editMode}
                className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#022F56] mb-1">
              Role
            </label>
            <input
              type="text"
              value={userData.role}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#022F56] mb-1">
              Birth day
            </label>
            <input
              type="date"
              name="birthDate"
              value={new Date(Profile?.birthDate)?.toISOString()?.split("T")[0]}
              onChange={(e) =>
                setProfile({ ...Profile, birthDate: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 
                     px-3 py-2 text-gray-800 dark:text-gray-200 
                     bg-white dark:bg-gray-800 
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#022F56] mb-1">
              Address
            </label>
            <div className="flex items-center">
              <input
                type="text"
                name="address"
                value={Profile?.address}
                onChange={(e) =>
                  setProfile({ ...Profile, address: e.target.value })
                }
                disabled={!editMode}
                className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#022F56] mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={Profile?.city}
              onChange={(e) => setProfile({ ...Profile, city: e.target.value })}
              disabled={!editMode}
              className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#022F56] mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={Profile?.country}
              onChange={(e) =>
                setProfile({ ...Profile, country: e.target.value })
              }
              disabled={!editMode}
              className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ProfessionDropdown
              value={Profile?.profession}
              onChange={(val) =>
                setProfile((prev) => ({ ...prev, profession: val }))
              }
              options={professions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#022F56] mb-1">
              Portfolio Url
            </label>
            <input
              type="text"
              name="portfolioUrl"
              value={Profile?.portfolioUrl || "https://www.yourportfolio.com"}
              onChange={(e) =>
                setProfile({ ...Profile, portfolioUrl: e.target.value })
              }
              disabled={!editMode}
              className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
