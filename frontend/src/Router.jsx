import React from 'react'



import { createBrowserRouter } from 'react-router-dom'
import AuthTabs from './pages/AuthTabs'
import EmailVerifying from './pages/EmailVerifying'
import ProfileSteps from './pages/user/ProfileSteps'
import ProfileLayout from './layouts/ProfileLayout'
import MyProfile from './pages/user/MyProfile'


export const ROOT = '/'
export const EMAIL_VERIFICATION = '/email-verifying'
export const PROFILE = '/me/profile'





export const Router = createBrowserRouter([
    {
        path:ROOT,
        element:<AuthTabs />
    },
    {
        path:EMAIL_VERIFICATION,
        element:<EmailVerifying/>
    },
    {
        element: <ProfileLayout />,
        children: [
            {
                path: PROFILE,
                element: <MyProfile />
            }
        ]
    }
])