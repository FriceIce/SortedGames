import { Request, response, Response } from "express";
import { Game, getGameRecommendations } from "../../modules/getRecommendations";
import axios, { AxiosError } from "axios";
import "dotenv/config";

/** 
  @description - Fetch recommendation using OpenAI
  @route - GET /api/getRecommendation/:id
*/

export const getRecommendations = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id)
    return res.status(400).json({ message: "Bad request. Id is missing." });

  try {
    const response = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );

    const game = response.data as Game;

    //Fetch recommended games based on the game
    const recommendedGames = await getGameRecommendations(game);

    if (recommendedGames?.errorMessage !== null) {
      return res.json({
        status: "unsuccesful",
        message: recommendedGames.errorMessage,
      });
    }

    return res
      .status(200)
      .json(JSON.parse(String(recommendedGames.response)) ?? []);
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return res.json({
        message: error.message,
      });
    }
  }
};
