import express from "express";
import auth from "../../middleware/auth";
import {
  deleteGameDetails,
  savedGames,
  saveGameDetails,
} from "./games.controller";

const router = express.Router();

router.get("/allSavedGames/:userId", auth, savedGames);
router.post("/saveGameDetails/:gameId", auth, saveGameDetails);
router.delete("/removeGameDetails/:gameId", auth, deleteGameDetails);

export default router;
