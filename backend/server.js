import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import userRoute from "./routes/authenticateRoute.js";  
import conversationRoutes from "./routes/conversationRoutes.js";  
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();

app.use((req, res, next) => {
  const allowedOrigins = [
    "https://bubbl-rho.vercel.app/",
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:3000"
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); 
  }

  next();
});

const envFile = process.env.NODE_ENV === "production"
  ? ".env.production"
  : ".env.development";
dotenv.config({ path: envFile });

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: [process.env.FRONTEND_URL, "http://localhost:3000","http://localhost:5173"], methods: ["GET", "POST"] },
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000","http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

io.on("connection", (socket) => {
  console.log("⚡ A user connected:", socket.id);


  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

app.get('/',(req,res)=>{
  res.send("welcome to bubbl backend !")
})

app.get("/debug/env", (req, res) => {
  res.json({
    mongoUri: process.env.MONGO_URI ? "✅ set" : "❌ missing",
    frontendUrl: process.env.FRONTEND_URL || "❌ missing",
    nodeEnv: process.env.NODE_ENV,
  });
});


app.use("/api/user", userRoute);

app.use("/api/me", authMiddleware, (req,res) => {
  return res.json({user: req.user})
})

app.use("/api/conversations", conversationRoutes);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
