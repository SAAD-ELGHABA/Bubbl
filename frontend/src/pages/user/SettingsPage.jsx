import React,{ useState, useEffect, use } from 'react';
import { 
  Save, 
  Edit, 
  Upload, 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Lock,
  Eye,
  EyeOff,
  Camera
} from 'lucide-react';
import { useSelector } from 'react-redux';

const SettingsPage = () => {
  const [userData, setUserData] = useState(
    useSelector(state => state.auth.user)
  );

  // const { user } = useSelector(state => state.auth)
console.log(userData)


  const [editMode, setEditMode] = useState(false);
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
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate fetching user data
  useEffect(() => {
    // In a real app, you would fetch this from your API
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);



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
      alert("New passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call to update password
      setTimeout(() => {
        setIsLoading(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        alert('Password updated successfully!');
      }, 1500);
    } catch (error) {
      console.error('Error updating password:', error);
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate avatar upload
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData(prev => ({
          ...prev,
          avatar: {
            ...prev.avatar,
            url: e.target.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full w-full bg-[#CCDEE4]">
      <div className=" bg-white overflow-hidden">
        {/* Header */}
        

        <div className="flex flex-col md:flex-row">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-[#022F56] text-white">
            <div className="p-6 flex flex-col items-center border-b border-[#02182E]">
              <div className="relative mb-4">
                <img 
                  src={userData?.profile?.url} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-[#488DB4]"
                />
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-[#488DB4] p-2 rounded-full cursor-pointer">
                  <Camera size={16} />
                  <input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>
              <h2 className="font-semibold text-lg">{userData.name}</h2>
              <p className="text-sm text-[#85C4E4]">{userData.email}</p>
            </div>

            <nav className="p-4 space-y-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left py-3 px-4 rounded-lg flex items-center ${activeTab === 'profile' ? 'bg-[#02182E] text-white' : 'text-[#85C4E4] hover:bg-[#02182E]'}`}
              >
                <User size={18} className="mr-2" /> Profile
              </button>
              
              <button 
                onClick={() => setActiveTab('password')}
                className={`w-full text-left py-3 px-4 rounded-lg flex items-center ${activeTab === 'password' ? 'bg-[#02182E] text-white' : 'text-[#85C4E4] hover:bg-[#02182E]'}`}
              >
                <Lock size={18} className="mr-2" /> Password
              </button>
              
              <button 
                onClick={() => setActiveTab('privacy')}
                className={`w-full text-left py-3 px-4 rounded-lg flex items-center ${activeTab === 'privacy' ? 'bg-[#02182E] text-white' : 'text-[#85C4E4] hover:bg-[#02182E]'}`}
              >
                <Eye size={18} className="mr-2" /> Privacy
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {isLoading && (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#488DB4]"></div>
              </div>
            )}

            

            {activeTab === 'password' && (
              <div>
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
                    <Lock size={18} className="mr-2" /> Update Password
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-xl font-bold text-[#02182E] mb-6">Privacy Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-[#85C4E4] rounded-lg">
                    <div>
                      <h3 className="font-medium text-[#022F56]">Account Visibility</h3>
                      <p className="text-sm text-gray-600">Make your profile visible to everyone</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#488DB4]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-[#85C4E4] rounded-lg">
                    <div>
                      <h3 className="font-medium text-[#022F56]">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive emails about your account activity</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#488DB4]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-[#85C4E4] rounded-lg">
                    <div>
                      <h3 className="font-medium text-[#022F56]">Data Collection</h3>
                      <p className="text-sm text-gray-600">Allow us to collect analytics data to improve our service</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#488DB4]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;