import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import userRoute from "./routes/authenticateRoute.js";  
import conversationRoutes from "./routes/conversationRoutes.js";  
import { authMiddleware } from "./middleware/authMiddleware.js";
import browseRoute from "./routes/browseRoute.js";
import friendShipRouter from "./routes/friendShipRouter.js";
import { initSocket } from "./socket.js";
import connectDB from "./utils/mongodb.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
const app = express();

const envFile = process.env.NODE_ENV === "production"
  ? ".env.production"
  : ".env.development";

dotenv.config({ path: envFile });

const server = createServer(app);

const io = initSocket(server);

app.use(cors());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000","http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "DB connection failed" });
  }
});
app.get('/',(req,res)=>{
  res.send("welcome to bubbl backend !")
})

app.use("/api/user", userRoute);

app.use("/api/me", authMiddleware, (req,res) => {
  return res.json({user: req.user})
})

app.use("/api/browse",authMiddleware,browseRoute)

app.use("/api/friendship",authMiddleware,friendShipRouter)

app.use("/api/conversations", conversationRoutes);

app.use("/api/notifications",authMiddleware,notificationsRoutes)


const PORT = process.env.PORT || 5000;
server.listen(PORT,"0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));  
