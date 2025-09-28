import React, { useEffect, useState } from "react";
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
  ChevronLeft,
  MessagesSquare,
  CornerUpLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PROFILE } from "../../Router";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../utils/socket";

const MessagesPage = () => {
  const { currentConversation, conversations } = useSelector(
    (state) => state.conversation
  );
  const { user } = useSelector((state) => state.auth);
  const [activeConversation, setActiveConversation] = useState(currentConversation?._id);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState(currentConversation?.messages || []);
  const [onlineUserIds, setOnlineUserIds] = useState([]);

  useEffect(() => {
    if (currentConversation?._id) {
      setActiveConversation(currentConversation._id);
      setMessages(currentConversation.messages || []);
      socket.emit("joinConversation", currentConversation._id);
    }

    socket.on("newMessage", ({ conversationId, message }) => {
      if (conversationId === currentConversation?._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socket.on("onlineUsers", (ids) => setOnlineUserIds(ids));

    return () => {
      if (currentConversation?._id) {
        socket.emit("leaveConversation", currentConversation._id);
      }
      socket.off("newMessage");
      socket.off("onlineUsers");
    };
  }, [currentConversation?._id]);

  const handleSend = async () => {
    if (!messageInput.trim() || !currentConversation?._id || !user?._id) return;
    const message = { sender: user._id, text: messageInput, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, message]);
    socket.emit("sendMessage", { conversationId: currentConversation._id, message });
    setMessageInput("");

    try {
      await fetch(`/api/conversations/${currentConversation._id}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId: user._id, text: message.text })
      });
    } catch (e) {
      // Optionally handle error or rollback UI
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Link to={PROFILE} className="text-[#02182E] flex items-center">
          <ChevronLeft className="mr-2" /> Back
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[80vh]">
        <aside className="border rounded-lg p-3 overflow-y-auto">
          <div className="flex items-center mb-3">
            <Search className="mr-2 text-[#02182E]" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
              placeholder="Search conversations"
            />
          </div>
          <div>
            {(conversations || []).map((c) => (
              <button
                key={c._id}
                onClick={() => setActiveConversation(c._id)}
                className={`w-full text-left p-2 rounded mb-2 ${activeConversation === c._id ? "bg-[#85C4E4] text-[#02182E]" : "bg-white"}`}
              >
                <div className="flex justify-between items-center">
                  <span>{(c.participants || []).filter(p => p._id !== user?._id)[0]?.username || "Conversation"}</span>
                  <span className={`h-2 w-2 rounded-full ${onlineUserIds.includes(((c.participants||[]).find(p=>p._id!==user?._id)||{})._id) ? "bg-green-500" : "bg-gray-300"}`}></span>
                </div>
                <div className="text-xs text-gray-500 truncate">{c.messages?.[c.messages.length-1]?.text || "No messages yet"}</div>
              </button>
            ))}
          </div>
        </aside>

        <section className="md:col-span-2 border rounded-lg flex flex-col">
          <header className="p-3 border-b flex items-center justify-between">
            <div className="flex items-center">
              <MessagesSquare className="mr-2" />
              <div>
                <div className="font-medium">Conversation</div>
                <div className="text-xs text-gray-500">{messages.length} messages</div>
              </div>
            </div>
            <div className="flex items-center text-gray-500">
              <Phone className="mr-3" />
              <Video />
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === user?._id ? "justify-end" : "justify-start"}`}>
                <div className={`${m.sender === user?._id ? "bg-[#022F56] text-white" : "bg-white"} px-3 py-2 rounded-lg shadow`}>{m.text}</div>
              </div>
            ))}
          </div>

          <footer className="p-3 border-t flex items-center">
            <input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 border rounded px-3 py-2"
            />
            <button onClick={handleSend} className="ml-2 bg-[#022F56] text-white px-4 py-2 rounded">
              <Send className="inline mr-1" size={16} /> Send
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default MessagesPage;
