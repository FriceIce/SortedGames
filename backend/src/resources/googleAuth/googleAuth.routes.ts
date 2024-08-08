import express from "express";
import { googleCallback, googleURL } from "./googleAuth.controller";
import { login } from "../users/users.controller";

const router = express.Router();

// Initiates the Google Login flow
router.get("/auth/google", googleURL);

// Callback URL for handling the Google Login response
router.get("/auth/google/callback", googleCallback, login);

export default router;
