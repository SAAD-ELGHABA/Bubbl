import React, { useState } from 'react';
import {
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  Phone,
  Video,
  Image,
  File,
  Mic,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROFILE } from '../../Router';

const MessagesPage = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample conversations data
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Hey, how are you doing?",
      time: "10:30 AM",
      unread: 2,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
      online: true
    },
    {
      id: 2,
      name: "Mike Thompson",
      lastMessage: "About tomorrow's meeting...",
      time: "9:15 AM",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
      online: true
    },
    {
      id: 3,
      name: "Lisa Anderson",
      lastMessage: "Did you see the new project specs?",
      time: "Yesterday",
      unread: 1,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
      online: false
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      lastMessage: "The files have been uploaded to the server",
      time: "Wednesday",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
      online: false
    },
    {
      id: 5,
      name: "Emma Wilson",
      lastMessage: "Let's catch up this weekend!",
      time: "Tuesday",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      online: true
    }
  ];

  // Sample messages data
  const messages = {
    1: [
      { id: 1, text: "Hey there! How are you doing?", sender: "them", time: "10:25 AM" },
      { id: 2, text: "I'm good! Just working on a new project. How about you?", sender: "me", time: "10:26 AM" },
      { id: 3, text: "Pretty good. Just finished my morning coffee ☕", sender: "them", time: "10:28 AM" },
      { id: 4, text: "Nice! What kind of project are you working on?", sender: "them", time: "10:29 AM" },
      { id: 5, text: "It's a chat application using React and Node.js. It's coming along nicely!", sender: "me", time: "10:30 AM" },
      { id: 6, text: "That sounds interesting! I'd love to see it when it's done.", sender: "them", time: "10:30 AM" },
    ],
    2: [
      { id: 1, text: "Hi, do you have the meeting agenda for tomorrow?", sender: "them", time: "9:10 AM" },
      { id: 2, text: "Yes, I'll send it over in a bit.", sender: "me", time: "9:12 AM" },
      { id: 3, text: "Great, thanks! Looking forward to our discussion.", sender: "them", time: "9:15 AM" },
    ],
    3: [
      { id: 1, text: "Did you get a chance to review the new project specs?", sender: "them", time: "Yesterday" },
      { id: 2, text: "Not yet, I'll take a look today.", sender: "me", time: "Yesterday" },
      { id: 3, text: "Let me know if you have any questions!", sender: "them", time: "Yesterday" },
    ]
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() === '') return;

    // In a real app, you would send the message to your backend
    console.log("Sending message:", messageInput);
    setMessageInput('');
  };

  const activeConvData = conversations.find(conv => conv.id === activeConversation);
  const activeMessages = messages[activeConversation] || [];

  return (
    <div className="flex h-screen bg-[#CCDEE4]">
      {/* Conversations sidebar */}
      <div className="w-full md:w-80 bg-white flex flex-col border-r border-[#85C4E4]">
        {/* Sidebar header */}
        <div className="p-4 bg-gradient-to-r from-[#02182E] to-[#022F56] text-white">
          <h1 className="text-xl font-bold">Messages</h1>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#85C4E4]" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#022F56] border border-[#488DB4] text-white placeholder-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#85C4E4]"
            />
          </div>
        </div>

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conversation => (
            <div
              key={conversation.id}
              className={`flex items-center p-4 border-b border-[#CCDEE4] cursor-pointer transition-all ${activeConversation === conversation.id ? 'bg-[#85C4E4] bg-opacity-20' : 'hover:bg-[#CCDEE4] hover:bg-opacity-30'}`}
              onClick={() => setActiveConversation(conversation.id)}
            >
              <div className="relative">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-[#02182E] truncate">{conversation.name}</h3>
                  <span className="text-xs text-[#488DB4]">{conversation.time}</span>
                </div>
                <p className="text-sm text-[#488DB4] truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unread > 0 && (
                <span className="ml-2 bg-[#488DB4] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {conversation.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col hidden md:flex">
        {/* Chat header */}
        {activeConvData ? (
          <div className="bg-white p-4 border-b border-[#85C4E4] flex items-center justify-between">
            <div className="flex items-center">
              <button className="md:hidden mr-2 text-[#488DB4]">
                <ChevronLeft />
              </button>
              <div className="relative">
                <img
                  src={activeConvData.avatar}
                  alt={activeConvData.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {activeConvData.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3">
                <h2 className="font-semibold text-[#02182E]">{activeConvData.name}</h2>
                <p className="text-xs text-[#488DB4]">
                  {activeConvData.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-[#488DB4] hover:text-[#022F56]">
                <Phone size={20} />
              </button>
              <button className="text-[#488DB4] hover:text-[#022F56]">
                <Video size={20} />
              </button>
              <button className="text-[#488DB4] hover:text-[#022F56]">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 border-b border-[#85C4E4]">
            <h2 className="font-semibold text-[#02182E]">Select a conversation</h2>
          </div>
        )}

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#CCDEE4] bg-opacity-30">
          {activeMessages.length > 0 ? (
            <div className="space-y-4">
              {activeMessages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${message.sender === 'me'
                      ? 'bg-[#488DB4] text-white rounded-br-none'
                      : 'bg-white text-[#02182E] rounded-bl-none'
                      }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-[#CCDEE4]' : 'text-[#488DB4]'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-[#488DB4]">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                  <p>Select a conversation or start a new one</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message input */}
        {activeConvData && (
          <div className="bg-white p-4 border-t border-[#85C4E4]">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <button type="button" className="text-[#488DB4] hover:text-[#022F56] p-2">
                <Paperclip size={20} />
              </button>
              <button type="button" className="text-[#488DB4] hover:text-[#022F56] p-2">
                <Image size={20} />
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 mx-2 px-4 py-2 rounded-full border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4]"
              />
              <button type="button" className="text-[#488DB4] hover:text-[#022F56] p-2">
                <Smile size={20} />
              </button>
              <button
                type="submit"
                disabled={messageInput.trim() === ''}
                className="bg-[#488DB4] text-white p-2 rounded-full ml-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#022F56] transition-colors"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile view - show conversation list or chat area */}
      <div className="md:hidden fixed inset-0 bg-white z-10 flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat header for mobile */}
            <div className="bg-white p-4 border-b border-[#85C4E4] flex items-center">
              <button
                className="mr-3 text-[#488DB4]"
                onClick={() => setActiveConversation(null)}
              >
                <ChevronLeft />
              </button>
              {activeConvData && (
                <>
                  <div className="relative">
                    <img
                      src={activeConvData.avatar}
                      alt={activeConvData.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {activeConvData.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <h2 className="font-semibold text-[#02182E]">{activeConvData.name}</h2>
                    <p className="text-xs text-[#488DB4]">
                      {activeConvData.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-[#488DB4] hover:text-[#022F56]">
                      <Phone size={20} />
                    </button>
                    <button className="text-[#488DB4] hover:text-[#022F56]">
                      <Video size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Messages area for mobile */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#CCDEE4] bg-opacity-30">
              {activeMessages.length > 0 ? (
                <div className="space-y-4">
                  {activeMessages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs rounded-lg p-3 ${message.sender === 'me'
                          ? 'bg-[#488DB4] text-white rounded-br-none'
                          : 'bg-white text-[#02182E] rounded-bl-none'
                          }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-[#CCDEE4]' : 'text-[#488DB4]'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-[#488DB4]">
                    <p>No messages in this conversation</p>
                  </div>
                </div>
              )}
            </div>

            {/* Message input for mobile */}
            <div className="bg-white p-4 border-t border-[#85C4E4]">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <button type="button" className="text-[#488DB4] hover:text-[#022F56] p-2">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 mx-2 px-4 py-2 rounded-full border border-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#488DB4]"
                />
                <button
                  type="submit"
                  disabled={messageInput.trim() === ''}
                  className="bg-[#488DB4] text-white p-2 rounded-full ml-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#022F56] transition-colors"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            {/* Mobile conversations list */}
            <div className="p-4 bg-gradient-to-r from-[#02182E] to-[#022F56] text-white">
              <div className='flex items-center mb-3 justify-between'>
                <Link to={PROFILE} className="text-sm text-[#85C4E4]  inline-block">
                  &larr; Back to Profile
                </Link>
                <h1 className="text-xl font-bold">Messages</h1>
              </div>

              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#85C4E4]" size={18} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#022F56] border border-[#488DB4] text-white placeholder-[#85C4E4] focus:outline-none focus:ring-2 focus:ring-[#85C4E4]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map(conversation => (
                <div
                  key={conversation.id}
                  className="flex items-center p-4 border-b border-[#CCDEE4] cursor-pointer hover:bg-[#CCDEE4] hover:bg-opacity-30 transition-all"
                  onClick={() => setActiveConversation(conversation.id)}
                >
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-[#02182E] truncate">{conversation.name}</h3>
                      <span className="text-xs text-[#488DB4]">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-[#488DB4] truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="ml-2 bg-[#488DB4] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;