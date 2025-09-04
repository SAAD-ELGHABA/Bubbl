const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return { ...state, loading: false, user: action.payload };

    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};
