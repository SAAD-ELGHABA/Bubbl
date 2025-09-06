import express from 'express'
import  {googleAuth, login, register}  from '../controllers/userController.js';
const userRoute = express.Router()


userRoute.post("/register", register);
userRoute.post("/login", login)
userRoute.post("/google", googleAuth);
export default userRoute