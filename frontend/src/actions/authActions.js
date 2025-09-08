import { authLogin, authRegister, getUserDecoded, setProfileData } from "../api/apis";

// Login
export const login = (payload) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const res = await authLogin(payload)
    if(!res?.data?.token) throw new Error("Token not found");
    localStorage.setItem('token',res?.data?.token)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data?.user });
    const resProfile = await getUserDecoded(res?.data?.token);
    dispatch({ type: "SET_PROFILE", payload: resProfile.data?.profile });
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

export const updateProfile = (profile) => async (dispatch) => {
  dispatch({ type: "UPDATE_PROFILE", payload: profile });
    const responseProfile = await setProfileData(profile);
    if(responseProfile?.data?.success){
      toast.success("Profile updated successfully!")
    }else{
      toast.error("Error updating profile!")
    }
  // dispatch({ type: "UPDATE_USER", payload: user });
}

