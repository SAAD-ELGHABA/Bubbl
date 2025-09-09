import { Eye, EyeOff, Lock, } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { updatePassword } from '../../actions/authActions';

const PasswordTab = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        const formData = new FormData();
        formData.append('userId', user?._id);
        formData.append('currentPassword', passwordData.currentPassword);
        formData.append('newPassword', passwordData.newPassword);
        setIsLoading(true);
        try {
            dispatch(updatePassword(formData));
                setTimeout(() => {
                    setIsLoading(false);
                    setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    });
                    toast.success('Password updated successfully!');
                }, 1500);
            
        } catch (error) {
            toast.error('Error updating password:', error);
            setIsLoading(false);
        }
    };


    return (
        <div className="space-y-6 w-full pt-16 pb-8 px-4 bg-white rounded-b-md shadow-lg">
            <h2 className="text-xl font-bold text-[#02182E] mb-6">Change Password</h2>

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[#022F56] mb-1">Current Password</label>
                    <div className="relative">
                        <input
                            type={showPasswords.current ? "text" : "password"}
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            required
                            placeholder='Enter current password'
                            className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#488DB4]"
                            onClick={() => togglePasswordVisibility('current')}
                        >
                            {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#022F56] mb-1">New Password</label>
                    <div className="relative">
                        <input
                            type={showPasswords.new ? "text" : "password"}
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            required
                            placeholder='Enter new password'
                            className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#488DB4]"
                            onClick={() => togglePasswordVisibility('new')}
                        >
                            {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#022F56] mb-1">Confirm New Password</label>
                    <div className="relative">
                        <input
                            type={showPasswords.confirm ? "text" : "password"}
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                            placeholder="Confirm new password"
                            className="w-full px-4 py-2 rounded-lg border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4] pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#488DB4]"
                            onClick={() => togglePasswordVisibility('confirm')}
                        >
                            {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-[#022F56] text-white px-6 py-2 rounded-lg hover:bg-[#02182E] transition-colors flex items-center"
                >
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                        <Lock size={18} className="mr-2" />
                    )}
                    {isLoading ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </div>
    )
}

export default PasswordTab