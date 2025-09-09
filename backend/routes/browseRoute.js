import express from "express";
import { browseUsers } from "../controllers/browseController.js";

const browseRoute = express.Router()

browseRoute.get('/users',browseUsers)


export default browseRoute;