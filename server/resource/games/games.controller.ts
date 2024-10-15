import { Request, response, Response } from "express";
import { Game, getGameRecommendations } from "../../modules/getRecommendations";

/** 
  @description - Fetch recommendation using OpenAI
  @route - GET /api/getRecommendation/
*/

export const getRecommendations = async (req: Request, res: Response) => {
  const game: Game = req.body.game;

  try {
    const recommendedGames = await getGameRecommendations(game);

    if (recommendedGames?.errorMessage !== null) {
      return res.json({
        status: "unsuccesful",
        message: recommendedGames.errorMessage,
      });
    }

    // console.log(JSON.parse(String(recommendedGames.response)));

    return res.status(200).json({
      status: 200,
      data: {
        response: JSON.parse(String(recommendedGames.response)),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};
