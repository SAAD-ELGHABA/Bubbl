import express from "express";
import { handleFriendshipRequest } from "../controllers/friendShipController.js";


const friendShipRouter = express.Router();

friendShipRouter.post("/request/:id",handleFriendshipRequest)

export default friendShipRouter;