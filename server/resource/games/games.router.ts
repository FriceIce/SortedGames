import express from "express";
import { getRecommendations } from "./games.controller";

const router = express.Router();

router.get("/getRecommendations/:id", getRecommendations);

export default router;
