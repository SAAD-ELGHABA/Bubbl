import React from 'react'
import MessagesTab from '../../componentns/tabs/MessagesTab'
import NotificationsTab from '../../componentns/tabs/NotificationsTab'
import { useSelector } from 'react-redux'

const MyProfile = () => {

  const { user , Profile} = useSelector(state => state.auth)


  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div
          className="h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${Profile?.coverImage || '/cover-placeholder.png'})` }}
        ></div>

        <div className="p-6 flex flex-col md:flex-row items-center md:items-end relative">
          <img
            src={user?.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white absolute -top-12 left-6"
          />

          <div className="ml-0 md:ml-32 mt-4 md:mt-0 flex-1">
            <h1 className="text-2xl font-bold text-[#02182E]">{user.name}</h1>
            <p className="text-[#488DB4]">{user.bio}</p>
          </div>

          <button className="mt-4 md:mt-0 bg-[#022F56] text-white px-4 py-2 rounded-lg hover:bg-[#02182E]">
            Edit Profile
          </button>
        </div>

        <div className="border-t border-gray-200 p-4 flex justify-around text-center">
          <div>
            <p className="font-semibold text-[#02182E]">{user.posts}</p>
            <p className="text-sm text-[#488DB4]">Posts</p>
          </div>
          <div>
            <p className="font-semibold text-[#02182E]">{user.friends}</p>
            <p className="text-sm text-[#488DB4]">Friends</p>
          </div>
          <div>
            <p className="font-semibold text-[#02182E]">{user.photos}</p>
            <p className="text-sm text-[#488DB4]">Photos</p>
          </div>
        </div>
      </div>

    </>
  )
}

export default MyProfile