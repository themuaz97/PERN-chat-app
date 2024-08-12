import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessages, getUserForSidebar, sendMessage } from "../controllers/messageController.js";
const router = express.Router();
router.use(protectRoute);
router.get("/conversations", getUserForSidebar);
router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);
export default router;
