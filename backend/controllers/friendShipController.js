import Friendship from "../models/Friendship.js";
import User from "../models/User.js";
import { getIO, getOnlineUsers } from "../socket.js";

export const handleFriendshipRequest = async (req, res) => {
  const senderId = req.user.id;
  const recipientId = req.params.id;

  const friendship = await Friendship.create({
    requester: senderId,
    recipient: recipientId,
    status: "pending"
  });

  // Get sender details for notification
  const sender = await User.findById(senderId).select("name email");
  
  const io = getIO();
  const onlineUsers = getOnlineUsers();

  const recipientSocket = onlineUsers.get(recipientId);
  if (recipientSocket) {
    io.to(recipientSocket).emit("friendRequestReceived", { 
      from: senderId,
      fromName: sender.name,
      fromEmail: sender.email,
      purpose: "wants to connect with you",
      message: `${sender.name} sent you a friend request`
    });
  }

  res.json({ success: true, message: "Friend request sent!", friendship });
};
