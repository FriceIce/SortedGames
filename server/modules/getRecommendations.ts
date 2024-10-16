import OpenAI from "openai";
import games from "../games.json";
import "dotenv/config";

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Game = {
  id: number;
  title: string;
  genre: string;
  game_url: string;
  platform: string;
  publisher: string;
  developer: string;
  description: string;
  release_date: string;
  short_description: string;
};

const getGameRecommendations = async (specificGame: Game) => {
  let errorMessage = "No response from OpenAI API";

  // Filter through all games to save tokens.
  const filterThroughGames = JSON.stringify(
    games.filter((game) => {
      if (
        game.genre === specificGame.genre ||
        game.developer === specificGame.developer
      )
        return game;
    })
  );

  try {
    const chatResponse = await openAI.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Find up to 10 similar games to ${JSON.stringify(
            specificGame
          )} from this list: ${filterThroughGames}. Base similarity on genre, platform, publisher, etc. Return results as JSON with properties id, title, and thumbnail, in this format: [{"id": 1, "title": "Game Title", "thumbnail": "URL"}]`,
        },
      ],
      model: "gpt-4o-mini",
      temperature: 0,
    });

    if (!chatResponse) throw new Error(errorMessage);

    return {
      response: chatResponse.choices[0].message.content
        ?.replace(/\\n/g, "") // Remove all \n
        .replace(/\\/g, "") // Revove all \
        .replace(/```/g, "")
        .replace(/\\n/g, "")
        .replace(/\\\"/g, '"')
        .replace(/\n/g, "")
        .split("json")[1],
      errorMessage: null,
    };
  } catch (error) {
    console.log(errorMessage);
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      response: null,
      errorMessage: errorMessage,
    };
  }
};

export { getGameRecommendations, Game };
