// src/redux/conversation/actions.js

// Fetch conversations
export const fetchConversationsRequest = () => ({ type: "FETCH_CONVERSATIONS_REQUEST" });


export const fetchConversationsSuccess = (conversations) => ({
  type: "FETCH_CONVERSATIONS_SUCCESS",
  payload: conversations,
});


export const fetchConversationsFailure = (error) => ({
  type: "FETCH_CONVERSATIONS_FAILURE",
  payload: error,
});

// Set current conversation
export const setCurrentConversation = (conversation) => ({
  type: "SET_CURRENT_CONVERSATION",
  payload: conversation,
});

// Add a new message
export const addMessage = (conversationId, message) => ({
  type: "ADD_MESSAGE",
  payload: { conversationId, message },
});

// Add a new conversation
export const addConversation = (conversation) => ({
  type: "ADD_CONVERSATION",
  payload: conversation,
});
