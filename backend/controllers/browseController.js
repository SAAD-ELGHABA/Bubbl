import User from "../models/User.js"; 
import mongoose from "mongoose";
export const browseUsers = async (req, res) => {
  try {
    const authUserId = new mongoose.Types.ObjectId(req.user.id);

    
    const users = await User.find(
      { _id: { $ne: authUserId } }, 
      { password: 0, __v: 0 }
    ).populate({
      path: "profile",
      match: { isProfileCompleted: true },
      select: "-_id -__v",
    });

    const filteredUsers = users.filter((user) => user.profile);

    if (!filteredUsers || filteredUsers.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }

    res.status(200).json({ success: true, users: filteredUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

