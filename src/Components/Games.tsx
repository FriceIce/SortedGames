import React from "react";
// modules
import { fetchGames } from "../modules/fetchGames";

// components
import GameCard from "./GameCard";
import GameCardSkeletonLoader from "./GameCardSkeletonLoader";
import GamesCardList from "./GamesCardList";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { optionsForGamesFetching, gameUrl } from "../modules/fetchOptions";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Games = () => {
  const { popular, openWorld } = useSelector((state: RootState) => state.games);
  const dispatch = useDispatch();
  const [pending, setIsPending] = React.useState<boolean>(true);
  const desktop = useMediaQuery("(min-width: 1050px)");

  // URL for API requests to FREE GAMES API - currently fetching games fron /database/category
  const url_popular = gameUrl(true, "popularity");
  const allGames = gameUrl(true, "allGames");

  React.useEffect(() => {
    // If the states has content then we need to display it instead of re-featch the same content.
    if (popular.length !== 0 && openWorld.length !== 0)
      return setIsPending(false);

    const fetch_popular = fetchGames(
      url_popular,
      optionsForGamesFetching /* dispatch */
    );
    const fetch_all_games = fetchGames(allGames);
    const allFetches = [fetch_popular, fetch_all_games];

    Promise.all(allFetches).then((data) => {
      // The same order as the allFetches array.
      dispatch({ type: "games/cacheGames", payload: data });
      setIsPending(false);
      return;
    });

    return () => {};
  }, []);

  // const skeletonLoaders = [
  //   <GameCardSkeletonLoader key={0} />,
  //   <GameCardSkeletonLoader key={1} />,
  //   <GameCardSkeletonLoader key={2} />,
  //   <GameCardSkeletonLoader key={3} />,
  //   <GameCardSkeletonLoader key={4} />,
  //   <GameCardSkeletonLoader key={5} />,
  //   <GameCardSkeletonLoader key={6} />,
  //   <GameCardSkeletonLoader key={7} />,
  //   <GameCardSkeletonLoader key={8} />,
  //   <GameCardSkeletonLoader key={9} />,
  // ];
  const popularGameTitles = popular.map((game) => game.title);
  return (
    <>
      {!pending && (
        <div className="text-white mt-8 space-y-20">
          <div className="space-y-1">
            {/* <h2 className="text-base mx-2">Popular Games</h2> */}

            <GamesCardList
              classNameUL="flex overflow-hidden pb-2 no-scrollbar"
              classNameLI={`flex-none w-[350px] rounded-xl transition-all duration-200`}
              gamesList={popular}
              arrows={true}
            />
          </div>
          <div className="space-y-1 mx-2">
            {/* <h2 className="">Mixed Games</h2> */}
            <GamesCardList
              classNameUL="card-grid overflow-auto no-scrollbar-s"
              classNameLI="flex-none"
              gamesList={openWorld.filter(
                (game) => !popularGameTitles.includes(game.title)
              )}
              arrows={false}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Games;
