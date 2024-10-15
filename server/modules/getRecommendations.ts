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
          content: `Du är en AI med ett enda syfte: att hitta liknande spel till ${JSON.stringify(
            specificGame
          )} från följande lista med spel: ${filterThroughGames}. Du ska returnera maximalt 10 spel, men listan kan vara tom om inga lämpliga matchningar hittas. Basera likheten på faktorer som genre, plattform, utgivare eller andra relevanta attribut. Returnera resultaten som ren JSON med endast egenskaperna id, title och thumbnail som flera objekt i en lista. Exempel på format: [{"id": 1,"title": "Game Title","thumbnail": "Game Thumbnail URL"}]`,
        },
      ],
      model: "gpt-4o-mini",
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
