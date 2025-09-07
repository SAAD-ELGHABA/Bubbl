import express from 'express'
import  {getUserInfo, googleAuth, login, register, resendEmail, setProfile}  from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const userRoute = express.Router()


userRoute.post("/register", register);
userRoute.post("/login", login)
userRoute.post("/google", googleAuth);
userRoute.post(`/resend-email/:user_slug`,resendEmail)
userRoute.get(`/user/:userId`,getUserInfo)
userRoute.post('/set-profile',authMiddleware,setProfile)
export default userRoute