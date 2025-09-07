const initialState = {
  user: null,
  Profile: null,
  loading: false,
  error: null,
  success: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {...state,loading:true,error:null}
    case "REGISTER_REQUEST":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return {...state,loading:false,user:action.payload,success:true}
    case "SET_PROFILE":
      return {...state,loading:false,Profile:action.payload,success:true}
    case "REGISTER_SUCCESS":
      return { ...state, loading: false,success:true, user: action.payload };

    case "LOGIN_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "REGISTER_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "LOGOUT":
      return { ...state, user: null };
    case "SET_USER":
      return {...state, user:action.payload}
    default:
      return state;
  }
};
