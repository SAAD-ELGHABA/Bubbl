import React from 'react'
import MessagesTab from '../../componentns/tabs/MessagesTab'
import NotificationsTab from '../../componentns/tabs/NotificationsTab'
import { useSelector } from 'react-redux'

const MyProfile = () => {
  const { user, Profile } = useSelector(state => state.auth)

  return (
    <div className="p-4 md:p-6 w">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        {/* Cover Image */}
        <div
          className="h-40 md:h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${Profile?.coverImage || '/cover-placeholder.png'})` }}
        ></div>

        {/* Profile Content */}
        <div className="p-4 md:p-6 flex flex-col md:flex-row items-center md:items-end relative">
          {/* Profile Picture - Adjusted positioning for mobile */}
          <div className=" w-20 h-20 md:w-24 md:h-24 absolute -top-10 left-1/2 transform -translate-x-1/2 md:left-24  ">
            <img
              src={Profile?.avatar || '/picture-placeholder.png'}
              alt="Profile"
              className="w-full h-full  rounded-full border-4 border-white  object-cover"
            />
          </div>

          {/* User Info - Adjusted layout for mobile */}
          <div className="ml-0 md:ml-32 mt-12 md:-mt-4 flex-1 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-[#02182E]">{user?.name || 'User Name'}</h1>
            <p className="text-[#488DB4] text-sm md:text-base mt-1">{user?.bio || 'No bio yet'}</p>
          </div>          
        </div>

        {/* Stats Section - Adjusted for mobile */}
        <div className="border-t border-gray-200 p-4 flex justify-around text-center">
          <div>
            <p className="font-semibold text-[#02182E]">{user?.posts || 0}</p>
            <p className="text-xs md:text-sm text-[#488DB4]">Posts</p>
          </div>
          <div>
            <p className="font-semibold text-[#02182E]">{user?.friends || 0}</p>
            <p className="text-xs md:text-sm text-[#488DB4]">Friends</p>
          </div>
          <div>
            <p className="font-semibold text-[#02182E]">{user?.photos || 0}</p>
            <p className="text-xs md:text-sm text-[#488DB4]">Photos</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile