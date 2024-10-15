import express from "express";
import { getRecommendations } from "./games.controller";

const router = express.Router();

router.get("/getRecommendations", getRecommendations);

export default router;
