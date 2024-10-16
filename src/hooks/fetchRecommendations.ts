import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GameMiniCard } from "../definitions";
import { fetchGames } from "../modules/fetchGames";

const fetchRecommendations = (id: string) => {
  const queryClient = useQueryClient();
  const recommendations = queryClient.getQueryData<GameMiniCard[]>([
    `Game recommendation for: ${id}`,
  ]);

  const { data, isLoading } = useQuery<GameMiniCard[]>({
    enabled: !recommendations,
    initialData: recommendations,
    queryKey: [`Game recommendations for: ${id}`],
    queryFn: () =>
      fetchGames(`http://localhost:3001/api/getRecommendations/${id}`),
  });

  if (isLoading) {
    return {
      gameRecommendations: [],
      loading: isLoading,
    };
  }

  return {
    gameRecommendations: (data as GameMiniCard[]) ?? [],
    loading: isLoading,
  };
};

export default fetchRecommendations;
