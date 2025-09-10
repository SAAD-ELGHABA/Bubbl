import React, { useState } from 'react';
import { Search, Filter, Plus, MessageCircle, Crown, Sparkles, Award, Briefcase, UserCheck, ChevronDown, X } from 'lucide-react';

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: 'Emma Richardson',
      profession: 'Architect',
      mutualFriends: 12,
      avatar: '/emma-architect.jpg',
      isConnected: false,
      isPremium: true,
      location: 'New York, NY'
    },
    {
      id: 2,
      name: 'James Wilson',
      profession: 'Software Engineer',
      mutualFriends: 8,
      avatar: '/james-engineer.jpg',
      isConnected: true,
      isPremium: true,
      location: 'San Francisco, CA'
    },
    {
      id: 3,
      name: 'Sophia Martinez',
      profession: 'Interior Designer',
      mutualFriends: 5,
      avatar: '/sophia-designer.jpg',
      isConnected: false,
      isPremium: false,
      location: 'Miami, FL'
    },
    {
      id: 4,
      name: 'Michael Chen',
      profession: 'Financial Analyst',
      mutualFriends: 3,
      avatar: '/michael-analyst.jpg',
      isConnected: false,
      isPremium: true,
      location: 'Chicago, IL'
    },
    {
      id: 5,
      name: 'Olivia Johnson',
      profession: 'Marketing Director',
      mutualFriends: 7,
      avatar: '/olivia-marketing.jpg',
      isConnected: true,
      isPremium: false,
      location: 'Los Angeles, CA'
    },
    {
      id: 6,
      name: 'William Taylor',
      profession: 'Surgeon',
      mutualFriends: 2,
      avatar: '/william-surgeon.jpg',
      isConnected: false,
      isPremium: true,
      location: 'Boston, MA'
    },
    {
      id: 7,
      name: 'Charlotte Brown',
      profession: 'Art Director',
      mutualFriends: 4,
      avatar: '/charlotte-art.jpg',
      isConnected: false,
      isPremium: true,
      location: 'Paris, France'
    },
    {
      id: 8,
      name: 'Benjamin Clark',
      profession: 'Lawyer',
      mutualFriends: 6,
      avatar: '/benjamin-lawyer.jpg',
      isConnected: true,
      isPremium: false,
      location: 'Washington, DC'
    }
  ]);

  const professions = ['all', 'Architect', 'Software Engineer', 'Interior Designer', 'Financial Analyst', 'Marketing Director', 'Surgeon', 'Art Director', 'Lawyer'];

  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          friend.profession.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProfession = selectedProfession === 'all' || friend.profession === selectedProfession;
    return matchesSearch && matchesProfession;
  });

  const addFriend = (id) => {
    setFriends(friends.map(friend => 
      friend.id === id ? { ...friend, isConnected: true } : friend
    ));
  };

  const startChat = (id) => {
    // In a real app, this would open a chat with the user
    console.log(`Starting chat with user ${id}`);
  };

  return (
    <div className="min-h-screen bg-[#CCDEE4] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#02182E] mb-2">Elite Connections</h1>
            <p className="text-[#022F56]">Discover and connect with exceptional professionals</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="bg-white rounded-xl p-3 flex items-center shadow-sm border border-[#85C4E4]">
              <Award className="text-[#488DB4] mr-2" size={20} />
              <span className="text-sm font-medium text-[#022F56]">Premium Network</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#85C4E4]/30">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="relative w-full lg:w-2/5 mb-4 lg:mb-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-[#488DB4]" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search professionals..."
                className="w-full pl-10 pr-4 py-3 border border-[#85C4E4] rounded-xl focus:ring-2 focus:ring-[#488DB4] focus:border-transparent bg-[#CCDEE4]/20 text-[#022F56] placeholder-[#488DB4]/70"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full lg:w-2/5">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between w-full bg-[#CCDEE4]/20 border border-[#85C4E4] rounded-xl px-4 py-3 text-[#022F56]"
              >
                <div className="flex items-center">
                  <Filter className="text-[#488DB4] mr-2" size={20} />
                  <span>{selectedProfession === 'all' ? 'All Professions' : selectedProfession}</span>
                </div>
                <ChevronDown size={20} className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isFilterOpen && (
                <div className="absolute mt-2 w-full lg:w-2/5 bg-white rounded-xl shadow-lg border border-[#85C4E4] z-10 p-3">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-[#022F56]">Filter by Profession</h3>
                    <button onClick={() => setIsFilterOpen(false)}>
                      <X size={18} className="text-[#488DB4]" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {professions.map(profession => (
                      <button
                        key={profession}
                        className={`py-2 px-3 rounded-lg text-sm ${selectedProfession === profession ? 'bg-[#022F56] text-white' : 'bg-[#CCDEE4]/30 text-[#022F56] hover:bg-[#85C4E4]'}`}
                        onClick={() => {
                          setSelectedProfession(profession);
                          setIsFilterOpen(false);
                        }}
                      >
                        {profession === 'all' ? 'All' : profession}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Friends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFriends.map(friend => (
            <div key={friend.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[#85C4E4]/20">
              {/* Profile Header */}
              <div className="relative">
                <div className="h-28 bg-gradient-to-r from-[#022F56] to-[#488DB4]"></div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                      <img 
                        src={friend.avatar} 
                        alt={friend.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {friend.isPremium && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full p-1 shadow-md">
                        <Crown size={16} className="text-white" />
                      </div>
                    )}
                    {friend.isConnected && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-md border-2 border-white">
                        <UserCheck size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Profile Content */}
              <div className="pt-14 pb-6 px-5">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg text-[#02182E]">{friend.name}</h3>
                  <div className="flex items-center justify-center mt-1">
                    <Briefcase size={14} className="text-[#488DB4] mr-1" />
                    <span className="text-[#022F56] text-sm">{friend.profession}</span>
                  </div>
                  <div className="text-xs text-[#488DB4] mt-1">{friend.location}</div>
                </div>
                
                <div className="text-center text-sm text-[#488DB4] mb-5">
                  {friend.mutualFriends} mutual connections
                </div>
                
                <div className="flex space-x-2">
                  {!friend.isConnected ? (
                    <button 
                      onClick={() => addFriend(friend.id)}
                      className="flex-1 bg-gradient-to-r from-[#022F56] to-[#488DB4] text-white py-2.5 px-4 rounded-xl flex items-center justify-center transition-all duration-300 hover:from-[#02182E] hover:to-[#022F56] shadow-md hover:shadow-lg"
                    >
                      <Plus size={18} className="mr-1.5" />
                      Connect
                    </button>
                  ) : (
                    <div className="flex-1 bg-[#CCDEE4] text-[#022F56] py-2.5 px-4 rounded-xl text-center text-sm flex items-center justify-center">
                      <UserCheck size={16} className="mr-1.5" />
                      Connected
                    </div>
                  )}
                  
                  <button 
                    onClick={() => startChat(friend.id)}
                    className={`py-2.5 px-4 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg ${
                      friend.isConnected 
                        ? 'bg-gradient-to-r from-[#85C4E4] to-[#488DB4] text-white hover:from-[#488DB4] hover:to-[#022F56]'
                        : 'bg-[#CCDEE4] text-[#022F56] hover:bg-[#85C4E4]'
                    }`}
                  >
                    <MessageCircle size={18} className="mr-1.5" />
                    Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFriends.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg mt-6 border border-[#85C4E4]/30">
            <Sparkles className="mx-auto text-[#85C4E4] mb-4" size={48} />
            <h3 className="text-xl font-medium text-[#022F56]">No professionals found</h3>
            <p className="text-[#488DB4] mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;