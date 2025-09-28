import { authLogin, authRegister, getUserDecoded, setPassword, setProfileData, setUserData } from "../api/apis";
import { toast } from "sonner";

// Login
export const login = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const res = await authLogin(payload);
    if (!res?.data?.token) throw new Error("Token not found");
    localStorage.setItem("token", res?.data?.token);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data?.user });
    const resProfile = await getUserDecoded(res?.data?.token);
    dispatch({ type: "SET_PROFILE", payload: resProfile?.profile });
    
    // Navigate based on profile completion
    if (resProfile?.profile?.isProfileCompleted) {
      navigate("/me/profile");
    } else {
      navigate("/complete-profile");
    }
  } catch (err) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: err.response?.data?.message || "Login failed",
    });
    toast.error(err.response?.data?.message || "Login failed");
  }
};

// Register
export const register = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });

    const res = await authRegister(payload);
    localStorage?.setItem("user_slug", res?.data?.user_slug);
    if (res?.data?.success) {
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      navigate("/resend-email");
    }
  } catch (err) {
    dispatch({
      type: "REGISTER_FAIL",
      payload: err.response?.data?.message || "Register failed",
    });
    toast.error(err.response?.data?.message || "Register failed");
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("token");
  localStorage.removeItem("user_slug");
};

export const updateProfile = (profile) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PROFILE", payload: profile });
    const responseProfile = await setProfileData(profile);
    if (responseProfile?.data?.success) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Error updating profile!");
    }
  } catch (error) {
    toast.error("Error updating profile!");
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_USER", payload: user });
    const responseUser = await setUserData(user);
    if (responseUser?.data?.success) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Error updating profile!");
    }
  } catch (error) {
    toast.error("Error updating profile!");
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PASSWORD_REQUEST" });
    const response = await setPassword(passwords);
    return response?.data;
  } catch (error) {
    toast.error("Error updating password!");
  }
};
