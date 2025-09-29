import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MessageCircle, UserPlus, MapPin, Briefcase, 
  Calendar, Mail, Phone, Award, Crown, Users, Camera,
  X, Edit3, Shield, Star, Heart, Loader2, AlertCircle
} from 'lucide-react';
import { FRIENDS, MESSAGES } from '../Router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBySlug, fetchUsers } from '../actions/usersActions';
import { sendFriendRequest } from '../api/apis';
import { createNotificationAction } from '../actions/notificationActions';
import userId from '../api/getUserId';

const FriendProfileInfo = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isConnected, setIsConnected] = useState(false);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFullBio, setShowFullBio] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, allUsers } = useSelector(state => state.users);
  const { userSlug } = useParams();

  // Fetch all users if not already loaded
  useEffect(() => {
    if (allUsers && allUsers.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, allUsers]);

  // Fetch specific user by slug
  useEffect(() => {
    if (userSlug) {
      dispatch(fetchUserBySlug(userSlug));
    }
  }, [dispatch, userSlug, allUsers]);

  // Handle error state
  useEffect(() => {
    if (error) {
      console.error('Error loading user:', error);
    }
  }, [error]);

  // Map user data to component structure
  const currentUser = user ? {
    name: user.name || 'No Name',
    profession: user.profile?.profession || 'No Profession',
    location: user.profile?.address || 'No Location',
    bio: user.profile?.bio || 'No bio available',
    avatar: user.profile?.avatar || '/default-avatar.png',
    coverImage: user.profile?.coverImage || '/default-cover.jpg',
    isPremium: user.isPremium || true,
    isConnected: user.isConnected || false,
    mutualFriends: user.mutualFriends || 0,
    posts: user.posts || 0,
    photos: user.photos || 0,
    friends: user.friends || 0,
    email: user.email || 'No email',
    phone: user.profile?.phone || 'No phone',
    joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown',
    photosData: [] // You might want to populate this from user's photos if available
  } : {
    name: 'Loading...',
    profession: 'Loading...',
    location: 'Loading...',
    bio: 'Loading...',
    avatar: '/default-avatar.png',
    coverImage: '/default-cover.jpg',
    isPremium: false,
    isConnected: false,
    mutualFriends: 0,
    posts: 0,
    photos: 0,
    friends: 0,
    email: 'Loading...',
    phone: 'Loading...',
    joinDate: 'Loading...',
    photosData: []
  };

  // Use the actual user or default data


  const connectWithUser = async () => {
    if (!user?._id) return;
    dispatch(createNotificationAction({
      message: "Friendship request!",
      sendTo: user._id,
      sendFrom: userId
    })) 
    try {
      setRequestError(null);
      setIsSendingRequest(true);
      
      const response = await sendFriendRequest(user._id);
      
      if (response.data.success) {
        setIsConnected(true);
      } else {
        setRequestError(response.data.message || 'Failed to send friend request');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      setRequestError(error.response?.data?.message || 'An error occurred while sending friend request');
    } finally {
      setIsSendingRequest(false);
    }
  };

  const goToMessages = () => {
    navigate(MESSAGES);
  };

  // Show loading state
  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#CCDEE4] to-[#E6F2F7]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#02182E] mx-auto mb-4" />
          <p className="text-lg text-[#02182E]">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#CCDEE4] to-[#E6F2F7] p-4">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-6">We couldn't load the profile. The user may not exist or there was an error.</p>
          <button
            onClick={() => navigate(FRIENDS)}
            className="bg-[#02182E] text-white px-6 py-2 rounded-lg hover:bg-[#03315c] transition-colors"
          >
            Back to Connections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#CCDEE4] to-[#E6F2F7] pb-12">
      {/* Header */}
      <div className="bg-[#02182E] text-white px-4 md:px-6 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to={FRIENDS} className="flex items-center text-[#85C4E4] hover:text-white transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            <span className="text-xs">Back</span>
          </Link>
          <div className="flex items-center">
            {currentUser.isPremium && (
              <div className="bg-[#022F56] rounded-lg p-2 flex items-center mr-3">
                <Award className="text-[#f4e006] mr-2" size={14} /> 
                <span className="text-xs">Premium</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-2 ">
        {/* Cover Photo */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6 h-42 md:h-58">
          <img 
            src={currentUser.coverImage || '/default-cover.jpg'} 
            alt="Cover" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-cover.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02182E] to-transparent"></div>
          
          {/* Profile Avatar */}
          <div className="absolute bottom-0  left-0">
            <div className="relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-4 border-white bg-white shadow-2xl overflow-hidden">
                <img 
                  src={currentUser.avatar || '/default-avatar.png'} 
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-avatar.png';
                  }}
                />
              </div>
              {currentUser.isPremium && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-2 shadow-lg">
                  <Crown size={16} className="text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-2  mt-4 md:mt-8 border border-white/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-light text-[#02182E] mb-1">{currentUser?.name}</h1>
              <div className="flex items-center text-[#022F56] mb-1">
                <Briefcase size={16} className="mr-2" />
                <span className="text-sm">{currentUser?.profession}</span>
              </div>
              <div className="flex items-center text-[#488DB4]">
                <MapPin size={16} className="mr-2" />
                <span className="text-xs">{currentUser?.location.toLowerCase()}</span>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
              {!isConnected ? (
                <button 
                  onClick={connectWithUser}
                  disabled={isSendingRequest}
                  className={`bg-gradient-to-r from-[#022F56] to-[#488DB4] text-white py-1 px-6 rounded-md flex items-center transition-all duration-300 hover:from-[#02182E] text-sm hover:to-[#022F56] shadow-md hover:shadow-lg ${isSendingRequest ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSendingRequest ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} className="mr-2" />
                      Connect
                    </>
                  )}
                </button>
              ) : (
                <div className="flex flex-col">
                  <button className="bg-gradient-to-r from-green-600 to-green-500 text-white py-1 px-6 rounded-md flex items-center text-sm shadow-md">
                    <UserPlus size={16} className="mr-2" />
                    Request Sent
                  </button>
                  {requestError && (
                    <p className="text-red-500 text-xs mt-1">{requestError}</p>
                  )}
                </div>
              )}
              
              <button onClick={goToMessages} className="bg-gradient-to-r from-[#85C4E4] to-[#488DB4] text-white py-1 px-6 rounded-md flex items-center transition-all duration-300 hover:from-[#488DB4] hover:to-[#022F56] shadow-md hover:shadow-lg">
                <MessageCircle size={14} className="mr-2" />
                Message
              </button>
            </div>
          </div>

          <div className="mb-8">
            <p className={`text-[#022F56] text-sm leading-relaxed border-l-4 border-[#85C4E4] pl-4 ${!showFullBio ? 'line-clamp-4' : ''}`} style={{ whiteSpace: 'pre-wrap' , lineHeight: '1'}}>
              {currentUser?.bio || 'No bio available'}
            </p>
            {currentUser?.bio && currentUser.bio.split('\n').length > 3 && (
              <button 
                onClick={() => setShowFullBio(!showFullBio)}
                className="text-[#488DB4] text-sm font-medium mt-1 hover:underline focus:outline-none"
              >
                {showFullBio ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-[#CCDEE4]/30 rounded-xl  text-center pb-1">
              <div className="text-lg font-semibold text-[#02182E]">{currentUser?.posts}</div>
              <div className="text-[#488DB4] text-xs">Posts</div>
            </div>
            <div className="bg-[#CCDEE4]/30 rounded-xl  text-center pb-1">
              <div className="text-lg font-semibold text-[#02182E]">{currentUser?.photos}</div>
              <div className="text-[#488DB4] text-xs">Photos</div>
            </div>
            <div className="bg-[#CCDEE4]/30 rounded-xl  text-center pb-1">
              <div className="text-lg font-semibold text-[#02182E]">{currentUser?.friends}</div>
              <div className="text-[#488DB4] text-xs">Friends</div>
            </div>
            <div className="bg-[#CCDEE4]/30 rounded-xl  text-center pb-1">
              <div className="text-lg font-semibold text-[#02182E]">{currentUser?.mutualFriends}</div>
              <div className="text-[#488DB4] text-xs">Mutual</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center text-xs text-[#022F56]">
              <Mail size={16} className="mr-3 text-[#488DB4]" />
              <span>{currentUser?.email}</span>
            </div>
            <div className="flex items-center text-xs text-[#022F56]">
              <Phone size={16} className="mr-3 text-[#488DB4]" />
              <span>{currentUser?.phone}</span>
            </div>
            <div className="flex items-center text-xs text-[#022F56]">
              <Calendar size={16} className="mr-3 text-[#488DB4]" />
              <span>Joined {currentUser?.joinDate}</span>
            </div>
            <div className="flex items-center text-xs text-[#022F56]">
              <Shield size={16} className="mr-3 text-[#488DB4]" />
              <span>Identity verified</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-[#85C4E4]/30 mb-6">
            <div className="flex space-x-6">
              {['posts', 'photos', 'friends', 'about'].map(tab => (
                <button
                  key={tab}
                  className={`pb-3 px-1 font-medium capitalize tracking-wide transition-all duration-300 ${activeTab === tab ? 'text-[#02182E] border-b-2 border-[#02182E]' : 'text-[#488DB4] hover:text-[#022F56]'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'photos' && (
            <div>
              <h3 className="text-md font-light text-[#02182E] mb-6 flex items-center">
                <Camera className="mr-2 text-[#488DB4]" size={16} />
                Photo Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentUser.photosData.map(photo => (
                  <div 
                    key={photo.id} 
                    className="relative rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => setSelectedImage(photo.url)}
                  >
                    <img 
                      src={photo.url} 
                      alt={`Gallery ${photo.id}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#02182E] to-transparent p-3">
                      <div className="flex items-center text-white">
                        <Heart size={14} className="mr-1" fill="currentColor" />
                        <span className="text-sm">{photo.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              <h3 className="text-xl font-light text-[#02182E] mb-6">About</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#CCDEE4]/20 rounded-xl p-5">
                  <h4 className="font-medium text-[#022F56] mb-3">Education</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold text-[#02182E]">Master of Architecture</div>
                      <div className="text-[#488DB4]">Harvard University</div>
                      <div className="text-sm text-[#488DB4]">2010-2013</div>
                    </div>
                    <div>
                      <div className="font-semibold text-[#02182E]">Bachelor of Design</div>
                      <div className="text-[#488DB4]">Rhode Island School of Design</div>
                      <div className="text-sm text-[#488DB4]">2006-2010</div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#CCDEE4]/20 rounded-xl p-5">
                  <h4 className="font-medium text-[#022F56] mb-3">Experience</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold text-[#02182E]">Senior Architect</div>
                      <div className="text-[#488DB4]">Foster + Partners</div>
                      <div className="text-sm text-[#488DB4]">2018-Present</div>
                    </div>
                    <div>
                      <div className="font-semibold text-[#02182E]">Architect</div>
                      <div className="text-[#488DB4]">SOM Architects</div>
                      <div className="text-sm text-[#488DB4]">2013-2018</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendProfileInfo;