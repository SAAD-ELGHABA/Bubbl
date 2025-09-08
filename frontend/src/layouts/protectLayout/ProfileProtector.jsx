import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProfileProtector({ children }) {
  const { user, loading, Profile } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // Not logged in
      if (!user) {
        navigate("/");
        return;
      }

      // Logged in but profile not completed
      // if (!Profile?.isProfileCompleted) {
      //   navigate("/complete-profile"); // Make sure this is your constant/route
      // }
    }
  }, [loading, user, Profile, navigate]);

  // Optionally, show a loader while loading
  if (loading || !user) return <div>Loading...</div>;

  return <>{children}</>;
}

export default ProfileProtector;
