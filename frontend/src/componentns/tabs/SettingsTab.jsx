import React from 'react'

const SettingsTab = () => {
    return (
        <div>
            <h2 className="text-xl font-bold text-[#02182E] mb-4">Settings</h2>

            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-[#022F56] mb-2">Account Settings</h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <span>Edit Profile</span>
                            <button className="text-[#488DB4]">Edit</button>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <span>Change Password</span>
                            <button className="text-[#488DB4]">Change</button>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <span>Privacy Settings</span>
                            <button className="text-[#488DB4]">Manage</button>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-[#022F56] mb-2">Notification Settings</h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <span>Email Notifications</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#488DB4]"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <span>Push Notifications</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#488DB4]"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsTab