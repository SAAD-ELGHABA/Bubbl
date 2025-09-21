import React, { useState } from "react";
import {
  Bell,
  Calendar,
  Camera,
  ChartArea,
  Gamepad,
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

const ProfileLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { Profile } = useSelector((state) => state.auth);
  const { isConnected } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const activeTab = (uri) => {
    return uri === location.pathname
      ? "bg-[#022F56] text-white"
      : "text-[#85C4E4] hover:bg-[#022F56]";
  };

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("You are logged out successfully!");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    socket.emit("register", user?.id);

    socket.on("friendRequestReceived", (data) => {
      console.log("New friend request from:", data.from);
    });

    return () => {
      socket.off("friendRequestReceived");
    };
  }, [user?.id]);
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
        className={`w-[200px]  bg-[#02182E] text-white p-4 fixed h-full top-0 bottom-0 overflow-y-auto z-40 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static`}
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex items-center justify-center mb-8 mt-4 md:mt-0">
          <img src="/bubble tech(1).svg" alt="Bubble Tech" />
          {/* <h1 className="text-xl font-bold hidden md:block">Bubbl-APP</h1> */}
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
          <button
            className={`w-full text-xs text-left py-2 px-4 rounded-lg flex items-center ${activeTab(
              PROFILE
            )}`}
          >
            <span className="mr-2">
              <Newspaper size={16} />
            </span>{" "}
            Feeds
          </button>

          <Link to={MESSAGES} onClick={() => setSidebarOpen(false)}>
            <button
              className={`w-full text-left text-xs py-2 px-4 rounded-lg flex items-center ${activeTab(
                MESSAGES
              )}`}
            >
              <span className="mr-2">
                <MessageCircleMore size={16} />
              </span>{" "}
              Messages
              <span className="ml-auto bg-[#488DB4] text-white text-[10px] rounded-full px-2 py-1">
                3
              </span>
            </button>
          </Link>

          <Link to={NOTIFICATIONS} onClick={() => setSidebarOpen(false)}>
            <button
              className={`w-full text-left text-xs py-2 px-4 rounded-lg flex items-center ${activeTab(
                NOTIFICATIONS
              )}`}
            >
              <span className="mr-2">
                <Bell size={16} />
              </span>{" "}
              Notifications
              <span className="ml-auto bg-[#488DB4] text-white text-[10px] rounded-full px-2 py-1 ">
                2
              </span>
            </button>
          </Link>

          <Link to={FRIENDS} onClick={() => setSidebarOpen(false)}>
            <button
              className={`w-full text-left text-xs py-2 px-4 rounded-lg flex items-center ${activeTab(
                FRIENDS
              )}`}
            >
              <span className="mr-2">
                <Users size={16} />
              </span>{" "}
              Friends
            </button>
          </Link>

          <Link to={"#"} onClick={() => setSidebarOpen(false)}>
            <button
              className={`w-full text-left text-xs py-2 px-4 rounded-lg flex items-center`}
            >
              <span className="mr-2">
                <Camera size={16} />
              </span>{" "}
              Photos
            </button>
          </Link>

          <Link to={SETTINGS} onClick={() => setSidebarOpen(false)}>
            <button
              className={`w-full text-left text-xs py-2 px-4 rounded-lg flex items-center ${activeTab(
                SETTINGS
              )}`}
            >
              <span className="mr-2">
                <Settings size={16} />
              </span>{" "}
              Settings
            </button>
          </Link>
        </nav>

        <div className="mt-8">
          <h3 className="text-sm uppercase text-[#85C4E4] mb-2">Suggested</h3>
          <Link to={"#"} onClick={() => setSidebarOpen(false)}>
            <button className="w-full text-left text-xs py-2 px-4 rounded-lg text-[#85C4E4] hover:bg-[#022F56] flex items-center">
              <span className="mr-2">
                <Gamepad size={16} />
              </span>{" "}
              Games
            </button>
          </Link>
          <Link to={"#"} onClick={() => setSidebarOpen(false)}>
            <button className="w-full text-left text-xs py-2 px-4 rounded-lg text-[#85C4E4] hover:bg-[#022F56] flex items-center">
              <span className="mr-2">
                <Calendar size={16} />
              </span>{" "}
              Events
            </button>
          </Link>
          <Link to={"#"} onClick={() => setSidebarOpen(false)}>
            <button className="w-full text-left text-xs py-2 px-4 rounded-lg text-[#85C4E4] hover:bg-[#022F56] flex items-center">
              <span className="mr-2">
                <ChartArea size={16} />
              </span>{" "}
              Analytics
            </button>
          </Link>
        </div>
        <button
          className="mt-10 py-2 w-full bg-slate-950 font-semibold border border-slate-950 shadow-md shadow-black/50 rounded-md flex items-center gap-2 justify-center"
          onClick={handleLogOut}
        >
          Logout{" "}
          <span>
            <LogOut size={16} />
          </span>
        </button>
        <div className="mt-4 text-center border-t-1 border-white py-2">
          <p className="text-xs italic text-gray-400">
            Bubbl-Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-0 flex-1 overflow-scroll  mt-16 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
