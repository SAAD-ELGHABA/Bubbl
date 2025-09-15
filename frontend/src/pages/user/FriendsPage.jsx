import React, { useEffect, useState } from "react";
import { getUsers, sendFriendRequest } from "../../api/apis";
import { Link } from "react-router-dom";
import {
  Search,
  UserCheck,
  MessageCircle,
  Crown,
  Sparkles,
  Award,
  Briefcase,
  Filter,
  X,
  MapPin,
  Users,
  Star,
  ChevronDown,
  Plus,
} from "lucide-react";

function FriendsPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [professions, setProfessions] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState("all");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const getUsersPromise = async () => {
    setIsLoading(true);
    try {
      const res = await getUsers();
      const fetchedUsers = res?.data?.users || [];
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);

      const profs = Array.from(
        new Set(
          fetchedUsers.map((user) => user.profile?.profession).filter(Boolean)
        )
      );
      setProfessions(profs);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersPromise();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.profile?.profession || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (selectedProfession !== "all") {
      filtered = filtered.filter(
        (user) => user.profile?.profession === selectedProfession
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, users, selectedProfession]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CCDEE4] to-[#E6F2F7] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-2">
              <div className="h-0.5 w-12 bg-gradient-to-r from-[#488DB4] to-[#85C4E4] mr-4"></div>
              <h1 className="text-4xl font-light text-[#02182E] tracking-wide">
                Elite Network
              </h1>
            </div>
            <p className="text-[#022F56] font-light mt-3 ml-16">
              Connect with distinguished professionals
            </p>
          </div>
          <div className="flex items-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 flex items-center shadow-lg border border-white/30">
              <Award className="text-[#488DB4] mr-2" size={20} />
              <span className="text-sm font-medium text-[#022F56] tracking-wide">
                PREMIUM NETWORK
              </span>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-10 border border-white/30">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="relative w-full lg:w-2/5">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-[#488DB4]" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search distinguished professionals..."
                className="w-full pl-12 pr-4 py-3.5 border border-[#85C4E4]/30 rounded-xl focus:ring-2 focus:ring-[#488DB4]/40 focus:border-transparent bg-white/50 text-[#022F56] placeholder-[#488DB4]/60 font-light tracking-wide transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />

              {searchTerm && isSearchFocused && filteredUsers.length > 0 && (
                <div className="absolute z-20 w-full bg-white/95 backdrop-blur-md border border-[#85C4E4]/30 rounded-xl mt-2 max-h-60 overflow-y-auto shadow-xl">
                  {filteredUsers.slice(0, 5).map((user) => (
                    <div
                      key={user._id}
                      className="px-4 py-3 hover:bg-[#CCDEE4]/20 cursor-pointer flex items-center gap-3 border-b border-[#85C4E4]/10 last:border-0 transition-colors duration-200"
                      onClick={() => {
                        setSearchTerm(user.name);
                        setIsSearchFocused(false);
                      }}
                    >
                      <div className="relative">
                        <img
                          src={
                            user?.profile?.avatar || "/picture-placeholder.png"
                          }
                          className="h-10 w-10 rounded-full object-cover shadow-sm"
                          alt={user.name}
                        />
                        {user.isPremium && (
                          <div className="absolute -top-1 -right-1 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-0.5 shadow-sm">
                            <Crown size={10} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-[#02182E] font-medium text-sm">
                          {user.name}
                        </p>
                        <p className="text-[#488DB4] text-xs font-light">
                          {user.profile?.profession || "No profession"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full lg:w-2/5 relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between w-full bg-white/50 backdrop-blur-sm border border-[#85C4E4]/30 rounded-xl px-4 py-3.5 text-[#022F56] font-light tracking-wide transition-all duration-300 hover:bg-white/70"
              >
                <div className="flex items-center">
                  <Filter className="text-[#488DB4] mr-2" size={20} />
                  <span>
                    {selectedProfession === "all"
                      ? "All Professions"
                      : selectedProfession}
                  </span>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-[#488DB4] transition-transform duration-300 ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isFilterOpen && (
                <div className="absolute mt-2 w-full bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-[#85C4E4]/30 z-10 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-[#022F56] text-sm tracking-wide">
                      FILTER BY PROFESSION
                    </h3>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="text-[#488DB4] hover:text-[#022F56] transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={`py-2.5 px-3 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 ${
                        selectedProfession === "all"
                          ? "bg-gradient-to-r from-[#022F56] to-[#488DB4] text-white shadow-md"
                          : "bg-[#CCDEE4]/30 text-[#022F56] hover:bg-[#85C4E4]"
                      }`}
                      onClick={() => {
                        setSelectedProfession("all");
                        setIsFilterOpen(false);
                      }}
                    >
                      All Professions
                    </button>
                    {professions.map((profession) => (
                      <button
                        key={profession}
                        className={`py-2.5 px-3 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 ${
                          selectedProfession === profession
                            ? "bg-gradient-to-r from-[#022F56] to-[#488DB4] text-white shadow-md"
                            : "bg-[#CCDEE4]/30 text-[#022F56] hover:bg-[#85C4E4]"
                        }`}
                        onClick={() => {
                          setSelectedProfession(profession);
                          setIsFilterOpen(false);
                        }}
                      >
                        {profession}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden h-96 border border-white/30"
              >
                <div className="h-36 bg-gradient-to-r from-[#85C4E4] to-[#CCDEE4]"></div>
                <div className="p-5">
                  <div className="h-6 bg-[#CCDEE4] rounded-full mb-4"></div>
                  <div className="h-4 bg-[#CCDEE4] rounded-full w-3/4 mb-6"></div>
                  <div className="h-10 bg-[#CCDEE4] rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredUsers?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 border border-white/30"
              >
                {/* Profile Header */}
                <div className="relative">
                  <div className="h-36 overflow-hidden">
                    <img
                      src={
                        user?.profile?.coverImage || "/cover-placeholder.png"
                      }
                      alt="coverImg"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                  </div>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:scale-105">
                        <img
                          src={
                            user?.profile?.avatar || "/picture-placeholder.png"
                          }
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {user.isPremium && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-1.5 shadow-lg">
                          <Crown size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="pt-14 pb-6 px-5 text-center">
                  <h3 className="font-semibold text-lg text-[#02182E] tracking-wide mb-1">
                    {user.name}
                  </h3>
                  <div className="flex items-center justify-center mb-3">
                    <Briefcase size={12} className="text-[#488DB4] mr-1.5" />
                    <span className="text-[#022F56] text-sm font-light">
                      {user.profile?.profession || "No profession"}
                    </span>
                  </div>

                  <div className="flex items-center justify-center text-xs text-[#488DB4] font-light mb-5">
                    <MapPin size={10} className="mr-1" />
                    {user.profile?.location || "Location not specified"}
                  </div>

                  <Link
                    to={`/me/profile/profile-info/${user?.slug}`}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-[#022F56] to-[#488DB4] text-white py-3 px-5 rounded-xl tracking-wide font-light transition-all duration-300 hover:from-[#02182E] hover:to-[#022F56] hover:shadow-lg group-hover:shadow-md w-full"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    Start Conversation
                  </Link>

                  <button
                    className="mt-3 w-full flex items-center justify-center text-[#488DB4] text-xs font-light hover:text-[#022F56] transition-colors duration-200"
                    onClick={async () => {
                      sendFriendRequest(user?._id);
                    }}
                  >
                    <Plus size={12} className="mr-1" />
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl mt-6 border border-white/30">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-[#85C4E4] to-[#488DB4] rounded-full mb-5 shadow-lg">
              <Sparkles size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-light text-[#022F56] tracking-wide mb-2">
              No professionals found
            </h3>
            <p className="text-[#488DB4] font-light max-w-md mx-auto">
              Try adjusting your search criteria or explore all professionals in
              our network
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FriendsPage;
