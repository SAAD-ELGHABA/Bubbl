import { authLogin, authRegister } from "../api/apis";

// Login
export const login = (payload) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const res = await authLogin(payload)
    window.localStorage.setItem('auth-user',JSON.stringify(res.data.user))
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
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
    console.log(res);
    if(res?.data?.success) {nav('/email-verifying')}
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
