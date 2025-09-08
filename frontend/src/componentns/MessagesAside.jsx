import React from "react";

function MessagesAside({messages}) {
  return (
    <div className="md:col-span-1 border-r border-gray-200 p-4">
      <input
        type="text"
        placeholder="Search messages..."
        className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#85C4E4]"
      />

      <div className="space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg cursor-pointer ${
              message.unread > 0
                ? "bg-[#85C4E4] bg-opacity-20"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center">
              <img
                src="/BUBB.png"
                alt="User"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-semibold text-[#02182E]">{message.name}</p>
                  <p className="text-xs text-gray-500">{message.time}</p>
                </div>
                <p className="text-sm text-gray-600 truncate">{message.text}</p>
              </div>
              {message.unread > 0 && (
                <span className="bg-[#488DB4] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                  {message.unread}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessagesAside;
