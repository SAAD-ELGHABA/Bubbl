import React from 'react'



import { createBrowserRouter, useNavigate } from 'react-router-dom'
import AuthTabs from './pages/AuthTabs'
import EmailVerifying from './pages/EmailVerifying'
import ProfileSteps from './pages/user/ProfileSteps'
import ProfileLayout from './layouts/ProfileLayout'
import MyProfile from './pages/user/MyProfile'
import SettingsPage from './pages/user/SettingsPage'
import SettingsTab from './pages/user/SettingsTab'


export const ROOT = '/'
export const EMAIL_VERIFICATION = '/email-verifying'
export const PROFILE = '/me/profile'
export const SETTINGS = '/me/profile/settings'
export const FEEDS = '/me/profile/feeds'
export const MESSAGES = '/me/profile/messages'
export const NOTIFICATIONS = '/me/profile/notifications'
// export const FEEDS = '/me/profile/feeds'


const protectedRoute = () => {
    const navigate = useNavigate()
    let user = JSON.parse(window.localStorage.getItem('auth-user'))
    if (!user || user === null) {
        navigate(ROOT)
    }
}

export const Router = createBrowserRouter([
    {
        path: ROOT,
        element: <AuthTabs />
    },
    {
        path: EMAIL_VERIFICATION,
        element: <EmailVerifying />
    },
    {
        element: <ProfileLayout />,
        children: [
            {
                path: PROFILE,
                element: <MyProfile />
            },
            {
                path: SETTINGS,
                element: <SettingsTab />
            }
        ]
    },

])