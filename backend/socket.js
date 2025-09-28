import { Server } from "socket.io";

let io;
let onlineUsers = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        process.env.FRONTEND_URL,
        "https://bubbl-rho.vercel.app/",
        "http://localhost:3000",
        "http://localhost:5173"
      ],
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("⚡ A user connected:", socket.id);

    socket.on("register", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      console.log("User registered:", userId);
    });

    // Join a conversation room
    socket.on("joinConversation", (conversationId) => {
      socket.join(`conv:${conversationId}`);
    });

    // Leave a conversation room
    socket.on("leaveConversation", (conversationId) => {
      socket.leave(`conv:${conversationId}`);
    });

    // Send message event to route to room
    socket.on("sendMessage", ({ conversationId, message }) => {
      io.to(`conv:${conversationId}`).emit("newMessage", { conversationId, message });
    });

    socket.on("disconnect", () => {
      for (let [userId, sId] of onlineUsers.entries()) {
        if (sId === socket.id) onlineUsers.delete(userId);
      }
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};

export const getOnlineUsers = () => onlineUsers;
