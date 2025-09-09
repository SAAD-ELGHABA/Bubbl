import express from 'express'
import  {getUserInfo, googleAuth, login, register, resendEmail, setProfile, updatePassword, updateUser}  from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const userRoute = express.Router()


userRoute.post("/register", register);
userRoute.post("/login", login)
userRoute.post("/google", googleAuth);
userRoute.post(`/resend-email/:user_slug`,resendEmail)
userRoute.get(`/user/:userId`,getUserInfo)
userRoute.post('/set-profile',authMiddleware,setProfile)
userRoute.post('/update-user',authMiddleware, updateUser)
userRoute.post('/update-password',authMiddleware, updatePassword)
export default userRoute