import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, MessageCircle, UserPlus, MapPin, Briefcase, 
  Calendar, Mail, Phone, Award, Crown, Users, Camera,
  X, Edit3, Shield, Star, Heart
} from 'lucide-react';
import { FRIENDS } from '../Router';

const FriendProfileInfo = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isConnected, setIsConnected] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample data - in a real app this would come from props or API
  const user = {
    name: 'Emma Richardson',
    profession: 'Senior Architect',
    location: 'New York, NY',
    bio: 'Designing spaces that inspire and transform lives. Passionate about sustainable architecture and modern aesthetics.',
    avatar: '/emma-architect.jpg',
    coverImage: '/architect-cover.jpg',
    isPremium: true,
    isConnected: false,
    mutualFriends: 12,
    posts: 47,
    photos: 28,
    friends: 243,
    email: 'emma.richardson@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'March 2018',
    photosData: [
      { id: 1, url: '/arch-photo-1.jpg', likes: 42 },
      { id: 2, url: '/arch-photo-2.jpg', likes: 28 },
      { id: 3, url: '/arch-photo-3.jpg', likes: 56 },
      { id: 4, url: '/arch-photo-4.jpg', likes: 31 },
      { id: 5, url: '/arch-photo-5.jpg', likes: 19 },
      { id: 6, url: '/arch-photo-6.jpg', likes: 67 },
    ]
  };

  const connectWithUser = () => {
    setIsConnected(true);
    // In a real app, this would make an API call
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#CCDEE4] to-[#E6F2F7] pb-12">
      {/* Header */}
      <div className="bg-[#02182E] text-white p-4 md:p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to={FRIENDS} className="flex items-center text-[#85C4E4] hover:text-white transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Connections</span>
          </Link>
          <div className="flex items-center">
            <div className="bg-[#022F56] rounded-lg p-2 flex items-center mr-3">
              <Award className="text-[#85C4E4] mr-2" size={18} />
              <span className="text-sm">Premiu Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-2 ">
        {/* Cover Photo */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6 h-64 md:h-80">
          <img 
            src={user.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02182E] to-transparent"></div>
          
          {/* Profile Avatar */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white bg-white shadow-2xl overflow-hidden">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {user.isPremium && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-2 shadow-lg">
                  <Crown size={16} className="text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 mt-4 md:mt-8 border border-white/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-[#02182E] mb-2">{user.name}</h1>
              <div className="flex items-center text-[#022F56] mb-2">
                <Briefcase size={18} className="mr-2" />
                <span className="text-lg">{user.profession}</span>
              </div>
              <div className="flex items-center text-[#488DB4]">
                <MapPin size={16} className="mr-2" />
                <span>{user.location}</span>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
              {!isConnected ? (
                <button 
                  onClick={connectWithUser}
                  className="bg-gradient-to-r from-[#022F56] to-[#488DB4] text-white py-3 px-6 rounded-xl flex items-center transition-all duration-300 hover:from-[#02182E] hover:to-[#022F56] shadow-md hover:shadow-lg"
                >
                  <UserPlus size={18} className="mr-2" />
                  Connect
                </button>
              ) : (
                <div className="bg-[#CCDEE4] text-[#022F56] py-3 px-6 rounded-xl flex items-center">
                  <UserPlus size={18} className="mr-2" />
                  Connected
                </div>
              )}
              
              <button className="bg-gradient-to-r from-[#85C4E4] to-[#488DB4] text-white py-3 px-6 rounded-xl flex items-center transition-all duration-300 hover:from-[#488DB4] hover:to-[#022F56] shadow-md hover:shadow-lg">
                <MessageCircle size={18} className="mr-2" />
                Message
              </button>
            </div>
          </div>

          <p className="text-[#022F56] text-lg mb-8 leading-relaxed border-l-4 border-[#85C4E4] pl-4 py-2">
            {user.bio}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#CCDEE4]/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-semibold text-[#02182E]">{user.posts}</div>
              <div className="text-[#488DB4]">Posts</div>
            </div>
            <div className="bg-[#CCDEE4]/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-semibold text-[#02182E]">{user.photos}</div>
              <div className="text-[#488DB4]">Photos</div>
            </div>
            <div className="bg-[#CCDEE4]/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-semibold text-[#02182E]">{user.friends}</div>
              <div className="text-[#488DB4]">Friends</div>
            </div>
            <div className="bg-[#CCDEE4]/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-semibold text-[#02182E]">{user.mutualFriends}</div>
              <div className="text-[#488DB4]">Mutual</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center text-[#022F56]">
              <Mail size={18} className="mr-3 text-[#488DB4]" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center text-[#022F56]">
              <Phone size={18} className="mr-3 text-[#488DB4]" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center text-[#022F56]">
              <Calendar size={18} className="mr-3 text-[#488DB4]" />
              <span>Joined {user.joinDate}</span>
            </div>
            <div className="flex items-center text-[#022F56]">
              <Shield size={18} className="mr-3 text-[#488DB4]" />
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
              <h3 className="text-xl font-light text-[#02182E] mb-6 flex items-center">
                <Camera className="mr-2 text-[#488DB4]" size={22} />
                Photo Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {user.photosData.map(photo => (
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