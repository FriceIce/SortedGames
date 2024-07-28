import express from "express";
import dotenv from "dotenv";
import { login, profileImage, register } from "./users.controller";
import auth from "../../middleware/auth";

dotenv.config();
const router = express.Router();

router.post("/register", register, login);
router.post("/login", login);
router.put("/profileImage", auth, profileImage);

export default router;
