import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthTabs from "./pages/AuthTabs";
import ProfileSteps from "./pages/user/ProfileSteps";
import ProfileLayout from "./layouts/ProfileLayout";
import MyProfile from "./pages/user/MyProfile";
import ResendEmail from "./pages/ResendEmail";
import EmailVerifying from "./pages/EmailVerifying";
import ProfileProtector from "./layouts/protectLayout/ProfileProtector";
import AuthWrapper from "./AuthWrapper";
import SettingsTab from "./componentns/tabs/SettingsTab";
import MessagesPage from "./pages/user/MessagesPage";

export const ROOT = "/";
export const RESEND_EMAIL = "/resend-email";
export const EMAIL_VERIFICATION = "/verify-email";
export const PROFILE = "/me/profile";
export const MESSAGES = "/me/profile/messages";
export const SETTINGS = "/me/profile/settings";
export const NOTIFICATIONS = "/me/profile/notifications";
export const COMPLETE_PROFILE = "/complete-profile";

export const Router = createBrowserRouter([
  {
    element: <AuthWrapper />,
    children: [
      {
        path: ROOT,
        element: <AuthTabs />,
      },
      {
        path: RESEND_EMAIL,
        element: <ResendEmail />,
      },
      {
        path: EMAIL_VERIFICATION,
        element: <EmailVerifying />,
      },
      {
        path: COMPLETE_PROFILE,
        element: <ProfileSteps />,
      },
      {
        element: (
          <ProfileProtector>
            <ProfileLayout />
          </ProfileProtector>
        ),
        children: [
          {
            path: PROFILE,
            element: <MyProfile />,
          },
          {
            path: SETTINGS,
            element: <SettingsTab />,
          },
          {
            path: MESSAGES,
            element: <MessagesPage />,
          },
          // you can add NOTIFICATIONS and MESSAGES here later
        ],
      },
    ],
  },
]);
