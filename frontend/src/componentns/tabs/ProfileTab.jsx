import { Edit, Mail, MapPin, Phone, Save } from 'lucide-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const ProfileTab = () => {

  const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(
    useSelector(state => state.auth.user)
  );


    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

    const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to save data
      setTimeout(() => {
        setIsLoading(false);
        setEditMode(false);
        alert('Profile updated successfully!');
      }, 1500);
    } catch (error) {
      console.error('Error saving data:', error);
      setIsLoading(false);
    }
  };

    return (
        <div className="space-y-6 w-full pt-16 pb-8 px-4 bg-white rounded-b-md shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#02182E]">Profile Information</h2>
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
                        <label className="block text-sm font-medium text-[#022F56] mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#022F56] mb-1">Email Address</label>
                        <div className="flex items-center">
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                disabled={!editMode}
                                className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
                            />
                            <Mail size={18} className="ml-2 text-[#488DB4]" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#022F56] mb-1">Phone Number</label>
                        <div className="flex items-center">
                            <input
                                type="tel"
                                name="phone"
                                value={userData.phone}
                                onChange={handleInputChange}
                                disabled={!editMode}
                                className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
                            />
                            <Phone size={18} className="ml-2 text-[#488DB4]" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#022F56] mb-1">Role</label>
                        <input
                            type="text"
                            value={userData.role}
                            disabled
                            className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#022F56] mb-1">Address</label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            name="address"
                            value={userData.address}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
                        />
                        <MapPin size={18} className="ml-2 text-[#488DB4]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#022F56] mb-1">City</label>
                        <input
                            type="text"
                            name="city"
                            value={userData.city}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#022F56] mb-1">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={userData.country}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] disabled:bg-gray-100"
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProfileTab