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
      console.log("User registered:", userId);
    });

    socket.on("disconnect", () => {
      for (let [userId, sId] of onlineUsers.entries()) {
        if (sId === socket.id) onlineUsers.delete(userId);
      }
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
