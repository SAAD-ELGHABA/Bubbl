// models/Friendship.js
import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { 
    type: String, 
    enum: ["pending", "accepted", "blocked"], 
    default: "pending" 
  }
}, { timestamps: true });

export default mongoose.model("Friendship", friendshipSchema);
