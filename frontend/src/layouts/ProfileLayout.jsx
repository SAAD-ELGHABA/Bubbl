import React, { useState } from 'react';
import { Bell, Calendar, Camera, ChartArea, Gamepad, LogOut, MessageCircleMore, Newspaper, Settings, Users } from 'lucide-react'
import FeedTab from '../componentns/tabs/FeedTab';
import MessagesTab from '../componentns/tabs/MessagesTab';
import NotificationsTab from '../componentns/tabs/NotificationsTab';
import SettingsTab from '../componentns/tabs/SettingsTab';
import { useSelector } from 'react-redux';

const ProfileLayout = () => {
    const [activeTab, setActiveTab] = useState('feeds');
  const { user, Profile} = useSelector((state) => state.auth);

    const [userData, setUserData] = useState({
        name: "User Name",
        username: "@username",
        profilePic: "/picture-placeholder.png",
        coverPhoto: "/cover-placeholder.png",
        bio: "Software Developer | MERN Stack | Photography Enthusiast",
        friends: 243,
        posts: 156,
        photos: 87
    })
    const handleLogOut = () => {
        console.log('logout')
    }
    return (
        <div className="flex min-h-screen bg-[#CCDEE4]">
            <div className="w-64 bg-[#02182E] text-white p-4 fixed h-full overflow-y-scroll" style={{ scrollbarWidth: 'none' }}>
                <div className="flex items-center justify-center mb-8">
                    <h1 className="text-2xl font-bold">ChatApp</h1>
                </div>

                <div className="mb-8 flex flex-col items-center">
                    <img
                        src={Profile?.avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-[#488DB4] mb-2"
                    />
                    <h2 className="text-lg font-semibold">{user?.name}</h2>
                    <p className="text-sm text-[#85C4E4]">{user?.name}</p>
                </div>

                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab('feeds')}
                        className={`w-full text-left py-3 px-4 rounded-lg flex items-center ${activeTab === 'feeds' ? 'bg-[#022F56] text-white' : 'text-[#85C4E4] hover:bg-[#022F56]'}`}
                    >
                        <span className="mr-2"><Newspaper size={18} /></span> Feeds
                    </button>

                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`w-full text-left py-3 px-4 rounded-lg flex items-center ${activeTab === 'messages' ? 'bg-[#022F56] text-white' : 'text-[#85C4E4] hover:bg-[#022F56]'}`}
                    >
                        <span className="mr-2"><MessageCircleMore size={18} /></span> Messages
                        <span className="ml-auto bg-[#488DB4] text-white text-xs rounded-full px-2 py-1">3</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full text-left py-3 px-4 rounded-lg flex items-center ${activeTab === 'notifications' ? 'bg-[#022F56] text-white' : 'text-[#85C4E4] hover:bg-[#022F56]'}`}
                    >
                        <span className="mr-2"><Bell size={18} /></span> Notifications
                        <span className="ml-auto bg-[#488DB4] text-white text-xs rounded-full px-2 py-1">2</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('friends')}
                        className={`w-full text-left py-3 px-4 rounded-lg flex items-center ${activeTab === 'friends' ? 'bg-[#022F56] text-white' : 'text-[#85C4E4] hover:bg-[#022F56]'}`}
                    >
                        <span className="mr-2"><Users size={18} /></span> Friends
                    </button>

                    <button
                        onClick={() => setActiveTab('photos')}
                        className={`w-full text-left py-3 px-4 rounded-lg flex items-center ${activeTab === 'photos' ? 'bg-[#022F56] text-white' : 'text-[#85C4E4] hover:bg-[#022F56]'}`}
                    >
                        <span className="mr-2"><Camera size={18} /></span> Photos
                    </button>

                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full text-left py-3 px-4 rounded-lg flex items-center ${activeTab === 'settings' ? 'bg-[#022F56] text-white' : 'text-[#85C4E4] hover:bg-[#022F56]'}`}
                    >
                        <span className="mr-2"><Settings size={18} /></span> Settings
                    </button>
                </nav>

                <div className="mt-8">
                    <h3 className="text-sm uppercase text-[#85C4E4] mb-2">Suggested</h3>
                    <button className="w-full text-left py-2 px-4 rounded-lg text-[#85C4E4] hover:bg-[#022F56] flex items-center">
                        <span className="mr-2"><Gamepad size={18} /></span> Games
                    </button>
                    <button className="w-full text-left py-2 px-4 rounded-lg text-[#85C4E4] hover:bg-[#022F56] flex items-center">
                        <span className="mr-2"><Calendar size={18} /></span> Events
                    </button>
                    <button className="w-full text-left py-2 px-4 rounded-lg text-[#85C4E4] hover:bg-[#022F56] flex items-center">
                        <span className="mr-2"><ChartArea size={18} /></span> Analytics
                    </button>
                </div>
                <button className='mt-10 py-2 w-full bg-slate-950  font-semibold border border-slate-950 shadow-md shadow-black/50 rounded-md flex items-center gap-2 justify-center'
                    onClick={() => handleLogOut()}
                >Logout <span><LogOut size={18} /></span></button>
                <div className='mt-4 text-center border-t-1 border-white py-2'>
                    <p className='text-xs italic text-gray-400'>Bubbl-Lorem ipsum dolor sit amet.</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-64 flex-1 p-6">
                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                    <div
                        className="h-80 bg-cover bg-center"
                        style={{ backgroundImage: `url(${Profile?.coverImage})` }}
                    ></div>

                    <div className="p-6 flex flex-col md:flex-row items-center md:items-end relative">
                        <img
                            src={Profile?.avatar}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white absolute -top-12 left-6"
                        />

                        <div className="ml-0 md:ml-32 mt-4 md:mt-0 flex-1">
                            <h1 className="text-2xl font-bold text-[#02182E]">{user?.name}</h1>
                            <p className="text-[#488DB4]">{Profile?.bio || "Not Included"}</p>
                        </div>

                        <button className="mt-4 md:mt-0 bg-[#022F56] text-white px-4 py-2 rounded-lg hover:bg-[#02182E]">
                            Edit Profile
                        </button>
                    </div>

                    <div className="border-t border-gray-200 p-4 flex justify-around text-center">
                        <div>
                            <p className="font-semibold text-[#02182E]">{userData.posts}</p>
                            <p className="text-sm text-[#488DB4]">Posts</p>
                        </div>
                        <div>
                            <p className="font-semibold text-[#02182E]">{userData.friends}</p>
                            <p className="text-sm text-[#488DB4]">Friends</p>
                        </div>
                        <div>
                            <p className="font-semibold text-[#02182E]">{userData.photos}</p>
                            <p className="text-sm text-[#488DB4]">Photos</p>
                        </div>
                    </div>
                </div>

                {/* Content based on active tab */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    {activeTab === 'feeds' && (
                        <div>
                            <h2 className="text-xl font-bold text-[#02182E] mb-4">News Feed</h2>
                            <div className="flex mb-6">
                                <img
                                    src={userData.profilePic}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <input
                                    type="text"
                                    placeholder="What's on your mind?"
                                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#85C4E4]"
                                />
                            </div>
                            <FeedTab />
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <MessagesTab />
                    )}

                    {activeTab === 'notifications' && (
                        <NotificationsTab />
                    )}

                    {activeTab === 'settings' && (
                        <SettingsTab />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;