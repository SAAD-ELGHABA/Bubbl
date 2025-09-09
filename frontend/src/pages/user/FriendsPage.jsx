import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/apis";
import ProfessionFilterDropDown from "../../componentns/drop_downs/ProfessionFilterDropDown";
import { Link } from "react-router-dom";
// import { professions } from "../../assets/fields";
function FriendsPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [professions, setProfessions] = useState([]);

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
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.profile?.profession || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  return (
    <div className="min-h-screen">
      <div className="mx-8 my-4">
        <div>
          <h1 className="font-bold text-2xl">Friends</h1>
          <h3 className="text-[#022F56]">Browse friends and start chatting!</h3>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 my-4">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search friends by name or profession..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {searchTerm && filteredUsers.length > 0 && (
              <ul className="absolute z-10 w-full bg-[#CCDEE4] border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                {filteredUsers.slice(0, 5).map((user) => (
                  <li
                    key={user._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(user.name);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={user?.profile?.avatar}
                        className="h-12 w-12 rounded-full"
                      />
                      <p>
                        {user.name} -{" "}
                        {user.profile?.profession || "No profession"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <ProfessionFilterDropDown options={professions} />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full h-full">
          <div className="grid md:grid-cols-3 gap-4 animate-pulse mx-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-400"></div>
            ))}
          </div>
        </div>
      ) : (
        filteredUsers?.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4 mx-4">
            {filteredUsers.map((user, index) => (
              <Link
                key={index}
                to={`/me/profile/profile-info/${user?.slug}`}
                className="h-80 overflow-hidden rounded-t border-gray-300 border"
              >
                <div className="relative">
                  <img
                    src={user?.profile?.coverImage || "/cover-placeholder.png"}
                    alt="coverImg"
                    className="w-full h-50 object-cover rounded-t"
                  />
                  <img
                    src={user?.profile?.avatar || "/picture-placeholder.png"}
                    alt="avatar"
                    className="w-20 h-20 object-cover rounded-full absolute bottom-2 left-2"
                  />
                </div>
                <div className="flex flex-col gap-2 p-2">
                  <h2 className="font-bold">{user?.name}</h2>
                  <div className="flex items-center justify-between text-sm">
                    <span className="bg-[#85C4E4] text-[#022F56] font-semibold px-4 py-2 rounded-xl">
                      {user?.profile?.profession || "N/A"}
                    </span>
                    <button className="bg-[#02182E] text-white px-4 py-2 rounded">
                      Start Chatting
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default FriendsPage;
