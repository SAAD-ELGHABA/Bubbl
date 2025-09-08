import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
function ConversationCor() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey, how are you doing?",
      sender: "other",
      time: "10:30 AM",
    },
    {
      id: 2,
      text: "I'm good! Just working on a new project.",
      sender: "me",
      time: "10:32 AM",
    },
  ]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const { user, Profile } = useSelector(
    (state) => state.auth
  );

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: input,
      sender: user?._id,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-full md:col-span-2">
      {/* Header */}
      <div className="flex items-center p-3 border-b border-gray-200">
        <img
          src="/BUBB.png"
          alt="User"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-semibold text-[#02182E]">Sarah Johnson</p>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg p-3 max-w-xs ${
                msg.sender === "me"
                  ? "bg-[#022F56] text-white"
                  : "bg-[#85C4E4] bg-opacity-30 text-black"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs text-gray-500 mt-1 text-right">
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex p-3 border-t border-gray-200">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#85C4E4]"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-[#022F56] text-white px-4 py-2 rounded-lg hover:bg-[#02182E]"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ConversationCor;
