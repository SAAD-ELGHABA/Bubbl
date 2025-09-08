// routes/conversationRoutes.js
import express from "express";
import { getConversations, createConversation, addMessage, getMessages } from "../controllers/conversationController.js";

const router = express.Router();

// Get all conversations of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversations = await getConversations(req.params.userId);
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new conversation
router.post("/", async (req, res) => {
  try {
    const { participants } = req.body;
    const conversation = await createConversation(participants);
    res.json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add message
router.post("/:conversationId/message", async (req, res) => {
  try {
    const { senderId, text } = req.body;
    const message = await addMessage(req.params.conversationId, senderId, text);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get messages
router.get("/:conversationId/messages", async (req, res) => {
  try {
    const messages = await getMessages(req.params.conversationId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
