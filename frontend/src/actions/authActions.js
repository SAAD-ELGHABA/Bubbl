import { authLogin, authRegister } from "../api/apis";

// Login
export const login = (payload) => async (dispatch) => {
  try {
    console.log(payload)
    dispatch({ type: "LOGIN_REQUEST" });
    const res = await authLogin(payload)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: err.response?.data?.message || "Login failed",
    });
  }
};

// Register
export const register = (payload) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });

    const res = await authRegister(payload)

    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
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
