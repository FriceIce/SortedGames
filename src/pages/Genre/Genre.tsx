import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FilterOptions, GameMiniCard } from "../../definitions";
import { fetchGames } from "../../modules/fetchGames";
import { optionsForGamesFetching } from "../../modules/fetchOptions";
import { RootState } from "../../redux/store";
import useScrollToTop from "../../hooks/useScrollToTop";
import useFetchGamesOnScroll from "../../hooks/useFetchGamesOnScroll";

// Components
const GameCard = lazy(() => import("../../Components/GameCard"));
const GameFilter = lazy(() => import("../../Components/GameFilter"));
const LoadingScreen = lazy(
  () => import("../../Components/LoadingScreen/LoadingScreen")
);

const Genre = ({ scrollPositionY }: { scrollPositionY: boolean }) => {
  const [data, setData] = React.useState<GameMiniCard[]>([]);
  const [isLoading, setIsloading] = React.useState<boolean>(true);
  const [filterOption, setFilterOption] = React.useState<FilterOptions>("all");
  const sidemenu = useSelector((state: RootState) => state.sidemenu.sidemenu);

  const fetchOnScroll = useFetchGamesOnScroll(scrollPositionY);

  // Get the param and put the value in the url
  const { genreTitle } = useParams();
  const query =
    genreTitle?.toLocaleLowerCase() === "popular" ? "sort-by" : "category";

  // url
  const allUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?${query}=${genreTitle}`;
  const alpahabeticalUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?${query}=${genreTitle}&sort-by=${filterOption}`;

  useScrollToTop([genreTitle]);

  React.useEffect(() => {
    if (filterOption === "all")
      fetchGames(allUrl, optionsForGamesFetching, setData);

    if (filterOption && filterOption === "alphabetical")
      fetchGames(alpahabeticalUrl, optionsForGamesFetching, setData);

    return () => {};
  }, [filterOption]);

  // This Useeffect is for genre changes only.
  React.useEffect(() => {
    fetchGames(allUrl, optionsForGamesFetching, setData);
  }, [genreTitle]);

  // for the game cards for lesser cod in the map section in JSX
  const gameCard = (game: GameMiniCard): JSX.Element => {
    return (
      <li key={game.id} className="bg-[#1e232d] rounded-xl">
        <GameCard card={game} />
      </li>
    );
  };

  return (
    <div className={`space-y-10 transition-all ${sidemenu && "lg:ml-[210px]"}`}>
      <GameFilter
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />

      <div className="text-xl space-y-2 mx-2">
        {data && (
          <h1 className="text-base text-center sm:text-lg sm:text-start uppercase">
            {genreTitle?.replace(/[-&]/, " ")}: {filterOption}
          </h1>
        )}
        {isLoading && (
          <div className="pt-10">
            <LoadingScreen loader="smallerLoaderAnimation" position="static" />
          </div>
        )}
        <ul className={`card-grid w-full`}>
          {data.map((game, index) => {
            const platform = game.platform
              ?.toLowerCase()
              .includes(filterOption);

            if (index === data.length - 1 && isLoading) setIsloading(false);
            if (index > fetchOnScroll) return null;
            if (filterOption === "all" || filterOption === "alphabetical")
              return gameCard(game);
            if (filterOption === "pc" && platform) return gameCard(game);
            if (filterOption === "browser" && platform) return gameCard(game);
          })}
        </ul>
      </div>
    </div>
  );
};

export default Genre;
