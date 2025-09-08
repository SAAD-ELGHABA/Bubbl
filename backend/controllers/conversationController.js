import { Conversation } from "../models/Conversation.js";

// Get all conversations for a user
export const getConversations = async (userId) => {
  try {
    const conversations = await Conversation.find({
      participants: userId,
    }).populate("participants", "username email")
      .sort({ lastUpdated: -1 });

    return conversations;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a new conversation
export const createConversation = async (participants) => {
  try {
    const conversation = new Conversation({ participants });
    await conversation.save();
    return conversation;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Add a message to a conversation
export const addMessage = async (conversationId, senderId, text) => {
  try {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) throw new Error("Conversation not found");

    const message = { sender: senderId, text };
    conversation.messages.push(message);
    conversation.lastUpdated = new Date();
    await conversation.save();

    return message;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get messages of a conversation
export const getMessages = async (conversationId) => {
  try {
    const conversation = await Conversation.findById(conversationId)
      .populate("messages.sender", "username email");
    if (!conversation) throw new Error("Conversation not found");

    return conversation.messages;
  } catch (error) {
    throw new Error(error.message);
  }
};
