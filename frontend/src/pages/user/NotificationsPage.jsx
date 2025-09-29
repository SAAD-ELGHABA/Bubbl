import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Bell,
  MessageSquare,
  UserPlus,
  CheckCheck,
  Clock,
  Mail,
} from "lucide-react";
import { fetchUsers } from "../../actions/usersActions";

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const { items, unreadCount } = useSelector(
    (s) => s.notifications || { items: [], unreadCount: 0 }
  );
  const { allUsers } = useSelector((s) => s.users);

  const markAllRead = () => dispatch({ type: "NOTIFICATIONS_MARK_ALL_READ" });

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days}d ago`;
    }
  };

  // Helper function to find user by ID
  const findUserById = (userId) => {
    return allUsers.find(user => user._id === userId);
  };

  useEffect(() => {
    dispatch({ type: "NOTIFICATIONS_MARK_ALL_READ" });
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    console.log(allUsers);
  }, [allUsers]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center text-[#02182E]">
          <Bell className="mr-2" size={24} />
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="ml-3 text-sm bg-red-500 text-white rounded-full px-3 py-1">
              {unreadCount} new
            </span>
          )}
        </div>
        <button
          onClick={markAllRead}
          className="text-sm text-white bg-[#022F56] px-4 py-2 rounded-lg flex items-center hover:bg-[#02182E] transition-colors"
        >
          <CheckCheck size={16} className="mr-2" /> Mark all read
        </button>
      </div>

      <div className="space-y-3">
        {items.length === 0 && (
          <div className="text-center py-12">
            <Bell className="mx-auto text-gray-400 mb-4" size={48} />
            <div className="text-lg text-gray-500 mb-2">
              No notifications yet
            </div>
            <div className="text-sm text-gray-400">
              You'll see friend requests and messages here
            </div>
          </div>
        )}

        {items.map((notification, idx) => {
          const sender = findUserById(notification.sendFrom);
          
          return (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  {notification.type === "friend_request" ? (
                    <div className="bg-blue-100 p-2 rounded-full">
                      <UserPlus className="text-blue-600" size={20} />
                    </div>
                  ) : (
                    <div className="">
                      <img src={sender ? sender.profile?.avatar : '/picture-placeholder.png'} alt={sender?.name} className="w-14 h-14 object-cover rounded-full shadow-md" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <h3 className="font-semibold text-[#02182E] text-lg">
                        {sender ? sender.name : "Unknown User"}
                      </h3>
                      <span className="ml-2 text-sm text-gray-500">
                        {sender ? sender.email : ""}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      {formatTime(notification.createdAt)}
                    </div>
                  </div>

                  <div className="mb-2">
                    <p className="text-[#022F56] font-medium capitalize">
                      {notification.purpose ||
                        (notification.type === "friend_request"
                          ? "wants to connect with you"
                          : "sent you a message")}
                    </p>
                  </div>

                  {notification.text && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-2">
                      <p className="text-gray-700 text-sm">
                        "{notification.text}"
                      </p>
                    </div>
                  )}

                  {notification.message && (
                    <p className="text-gray-600 text-sm">
                      {notification.message}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500">
                      <Mail size={12} className="mr-1" />
                      {new Date(notification.createdAt).toLocaleString()}
                    </div>
                    <div className="flex space-x-2">
                      {notification.type === "friend_request" && (
                        <button className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                          View Request
                        </button>
                      )}
                      {notification.type === "message" && (
                        <button className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                          Reply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPage;