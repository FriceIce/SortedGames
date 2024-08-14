import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GameCard from "../../Components/GameCard";
import GameFilter from "../../Components/GameFilter";
import { FilterOptions, GameMiniCard } from "../../definitions";
import { fetchGames } from "../../modules/fetchGames";
import { optionsForGamesFetching } from "../../modules/fetchOptions";
import { RootState } from "../../redux/store";
import useScrollToTop from "../../hooks/useScrollToTop";

const Genre = () => {
  const [data, setData] = React.useState<GameMiniCard[]>([]);
  const [filterOption, setFilterOption] = React.useState<FilterOptions>("all");
  const sidemenu = useSelector((state: RootState) => state.sidemenu.sidemenu);

  // Get the param and put the value in the url
  const { genreTitle } = useParams();

  // url
  const allUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${genreTitle}`;
  const alpahabeticalUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${genreTitle}&sort-by=${filterOption}`;

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
      {/* <GameFilter /> */}
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
        <ul className={`card-grid w-full`}>
          {data.map((data) => {
            const platform = data.platform.toLowerCase().includes(filterOption);
            if (filterOption === "all" || filterOption === "alphabetical")
              return gameCard(data);
            if (filterOption === "pc" && platform) return gameCard(data);
            if (filterOption === "browser" && platform) return gameCard(data);
          })}
        </ul>
      </div>
    </div>
  );
};

export default Genre;
