import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Game } from "../definitions";
import { fetchGames } from "../modules/fetchGames";
import { optionsForGamesFetching } from "../modules/fetchOptions";
import React from "react";

const useFetchSpecificGame = (id: string) => {
  const [screenshots, setScreenshots] = React.useState<string[]>([]);
  const queryClient = useQueryClient();

  //check for cached items for faster upload time.
  const completeGame = queryClient.getQueryData<Game>([id]);

  const { data, isLoading } = useQuery<Game>({
    enabled: !completeGame, // enabeld is for checking in cache
    initialData: completeGame,
    queryKey: [id],
    queryFn: () =>
      fetchGames(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
        optionsForGamesFetching
      ),
  });

  React.useEffect(() => {
    if (isLoading && !data) return;

    const preloadImages = (url: string) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject("Image load rejected.");
      });
    };

    Promise.all(
      data?.screenshots.map((url) => preloadImages(url.image)) ?? []
    ).then((data) => setScreenshots(data.map((img) => img.src)));
  }, [data, isLoading]);

  return {
    specificGame: data as Game,
    screenshots,
    isLoading: isLoading,
  };
};

export default useFetchSpecificGame;
