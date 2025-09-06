import { authLogin, authRegister } from "../api/apis";

// Login
export const login = (payload) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const res = await authLogin(payload)
    console.log(res);
    localStorage.setItem('token',res?.data?.token)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data?.user });
    dispatch({ type: "SET_PROFILE", payload: res.data?.profile });
  } catch (err) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: err.response?.data?.message || "Login failed",
    });
  }
};

// Register
export const register = (payload,nav) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });

    const res = await authRegister(payload)
    localStorage?.setItem("user_slug",res?.data?.user_slug)
    if(res?.data?.success) {nav('/resend-email')}
    // dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({
      type: "REGISTER_FAIL",
      payload: err.response?.data?.message || "Register failed",
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
