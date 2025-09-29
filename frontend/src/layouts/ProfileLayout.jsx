import React, { useState } from "react";
import {
  Bell,
  LogOut,
  MessageCircleMore,
  Newspaper,
  Settings,
  Users,
  Menu,
  X,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { MESSAGES, NOTIFICATIONS, PROFILE, SETTINGS, FRIENDS } from "../Router";
import { useEffect } from "react";
import socket from "../utils/socket";
import { fetchNotifications } from "../actions/notificationActions";
// import { logout } from "../actions/authActions";

const ProfileLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { Profile } = useSelector((state) => state.auth);
  const { isConnected } = useSelector((state) => state.auth);
  const {unreadCount} = useSelector((state) =>state.notifications)
  // const { unreadCount } = useSelector(
  //   (state) => state.notifications || { unreadCount: 0 }
  // );

  const dispatch = useDispatch();
  const location = useLocation();

  const activeTab = (uri) => {
    return uri === location.pathname
      ? "bg-[#022F56] text-white"
      : "text-[#85C4E4] hover:bg-[#022F56]";
  };

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    // localStorage.removeItem("user_slug");
    toast.success("You are logged out successfully!");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() =>{
    console.log(unreadCount)
  },[unreadCount])

  useEffect(()=>{
    dispatch(fetchNotifications())
  },[])

  useEffect(() => {
    socket.emit("register", user?.id);

    socket.on("friendRequestReceived", (data) => {
      dispatch({
        type: "NOTIFICATIONS_ADD",
        payload: {
          type: "friend_request",
          from: data.from,
          fromName: data.fromName,
          fromEmail: data.fromEmail,
          purpose: data.purpose,
          message: data.message,
          timestamp: new Date().toISOString(),
        },
      });
      toast.success(`New friend request from ${data.fromName}`);
    });

    socket.on("messageNotification", (data) => {
      dispatch({
        type: "NOTIFICATIONS_ADD",
        payload: {
          type: "message",
          conversationId: data.conversationId,
          from: data.from,
          fromName: data.fromName,
          fromEmail: data.fromEmail,
          text: data.text,
          purpose: data.purpose,
          message: data.message,
          timestamp: data.timestamp,
        },
      });
      toast.info(`New message from ${data.fromName}`);
    });

    return () => {
      socket.off("friendRequestReceived");
      socket.off("messageNotification");
    };
  }, [user?.id, dispatch]);

  return (
    <div className="flex h-screen bg-[#CCDEE4]">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#02182E] text-white p-4 z-40 flex justify-between items-center">
        <button onClick={toggleSidebar} className="p-2 rounded-md">
          {sidebarOpen ? (
            <X size={24} className="text-white absolute z-50" />
          ) : (
            <Menu size={24} />
          )}
        </button>
        <h1 className="text-xl font-bold">ChatApp</h1>
        <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className="w-[200px]  bg-[#02182E] text-white p-4 fixed h-full top-0 bottom-0 overflow-y-auto z-40 transition-transform duration-300 ease-in-out
           
          md:translate-x-0 md:static"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex items-center justify-center mb-8 mt-4 md:mt-0">
          <img src="/bubble tech(1).svg" alt="Bubble Tech" />
        </div>

        <div className="mb-8 flex flex-col items-center ">
          <div className="relative">
            <img
              src={Profile?.avatar || "/picture-placeholder.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 object-cover border-[#488DB4] mb-2"
            />
            {isConnected && (
              <div className="h-3 w-3 rounded-full bg-green-600 animate-pulse absolute bottom-3 right-2"></div>
            )}
          </div>
          <h2 className="text-md font-semibold">{user?.name}</h2>
          <p className="text-xs text-[#85C4E4]">{user?.slug}</p>
        </div>

        <nav className="space-y-2">
          <button className="w-full text-xs text-left py-2 px-4 rounded-lg flex items-center ">
            <span className="mr-2">
              <Newspaper size={16} />
            </span>{" "}
            Feeds
          </button>

          <Link to={MESSAGES} onClick={() => setSidebarOpen(false)}>
            <button className="w-full text-xs text-left py-2 px-4 rounded-lg flex items-center ">
              <span className="mr-2">
                <MessageCircleMore size={16} />
              </span>{" "}
              Messages
            </button>
          </Link>

          <Link to={FRIENDS} onClick={() => setSidebarOpen(false)}>
            <button className="w-full text-xs text-left py-2 px-4 rounded-lg flex items-center ">
              <span className="mr-2">
                <Users size={16} />
              </span>{" "}
              Friends
            </button>
          </Link>

          <Link to={NOTIFICATIONS} onClick={() => setSidebarOpen(false)}>
            <button className="w-full text-xs text-left py-2 px-4 rounded-lg flex items-center justify-between ">
              <span className="flex items-center">
                <span className="mr-2">
                  <Bell size={16} />
                </span>{" "}
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="ml-2 text-[10px] bg-red-500 text-white rounded-full px-2 py-0.5">
                  {unreadCount}
                </span>
              )}
            </button>
          </Link>

          <Link to={SETTINGS} onClick={() => setSidebarOpen(false)}>
            <button className="w-full text-xs text-left py-2 px-4 rounded-lg flex items-center ">
              <span className="mr-2">
                <Settings size={16} />
              </span>{" "}
              Settings
            </button>
          </Link>

          <button
            onClick={handleLogOut}
            className="w-full text-xs text-left py-2 px-4 rounded-lg flex items-center text-red-300 hover:bg-[#022F56]"
          >
            <span className="mr-2">
              <LogOut size={16} />
            </span>{" "}
            Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 md: mt-14 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
