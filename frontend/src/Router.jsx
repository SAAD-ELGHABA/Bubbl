import React from 'react'



import { createBrowserRouter } from 'react-router-dom'
import AuthTabs from './pages/AuthTabs'


export const Router = createBrowserRouter([
    {
        path:'/',
        element:<AuthTabs />
    }
])