import { prisma } from "../../db/connect";
import { Request, Response } from "express";

/**
 * @description Get all saved games
 * @route GET /allSavedGames/:userId
 */

export const savedGames = async (req: Request, res: Response) => {
  console.log("Running the savedGames route...");

  const userId = Number(req.params.userId);

  try {
    const savedGames = await prisma.gameCard.findMany({
      where: {
        userId: userId,
      },
    });

    if (!savedGames) {
      return res
        .status(404)
        .json({ data: savedGames, message: "Your games list is empty." });
    }

    // If there are any saved games
    res
      .status(200)
      .json({ data: savedGames, message: "Games successfully retrieved." });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ data: [], message: "Database query failed!" });
  }
};

/**
 * @description Save game details
 * @route POST /saveGameDetails/:gameId
 */

type GameMiniCard = {
  id: string;
  thumbnail: string;
  title: string;
};

export const saveGameDetails = async (req: Request, res: Response) => {
  console.log("Running the saveGame route...");

  const { id, ...gameDetails }: GameMiniCard = req.body;
  const gameId = req.params.gameId;
  const userId = Number(gameId.split("-")[0]);

  try {
    const saveGameDetails = await prisma.gameCard.create({
      data: {
        userId: userId,
        gameId,
        ...gameDetails,
      },
    });

    res.status(201).json({ message: "Job saved successfully!" });
    console.log("Finished running the saveGame route with success...");
  } catch (error) {
    console.error("Error details:", error);
    console.log("Finished running the saveGame route with failure...");
    res.status(500).json({ error: "Database insertion failed!" });
  }
};

/**
 * @description Delete game details
 * @route DELETE /deleteGameDetails/:gameId
 */

export const deleteGameDetails = async (req: Request, res: Response) => {
  console.log("Deleting Game Details");

  const gameId = req.params.gameId;

  try {
    const game = await prisma.gameCard.delete({
      where: {
        gameId: gameId,
      },
    });

    res
      .status(200)
      .json({ message: "Game details deleted successfully.", data: game });
  } catch (error) {
    res.json({ error: "Internal server error!" }).status(500);
  }
};
