// src/redux/conversation/initialState.js
export const initialState = {
  conversations: [],       // List of conversations
  currentConversation: null, // The selected conversation
  loading: false,
  error: null,
};


export const conversationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CONVERSATIONS_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_CONVERSATIONS_SUCCESS":
      return { ...state, loading: false, conversations: action.payload };

    case "FETCH_CONVERSATIONS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "SET_CURRENT_CONVERSATION":
      return { ...state, currentConversation: action.payload };

    case "ADD_MESSAGE":
      return {
        ...state,
        conversations: state.conversations.map((conv) =>
          conv._id === action.payload.conversationId
            ? { ...conv, messages: [...conv.messages, action.payload.message] }
            : conv
        ),
      };

    case "ADD_CONVERSATION":
      return { ...state, conversations: [...state.conversations, action.payload] };

    default:
      return state;
  }
};