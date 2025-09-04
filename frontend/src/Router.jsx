import React from 'react'



import { createBrowserRouter } from 'react-router-dom'
import AuthTabs from './pages/AuthTabs'
import EmailVerifying from './pages/EmailVerifying'


export const Router = createBrowserRouter([
    {
        path:'/',
        element:<AuthTabs />
    },
    {
        path:"/email-verifying",
        element:<EmailVerifying/>
    }
])