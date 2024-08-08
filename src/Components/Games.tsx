import React from "react";
// modules
import { fetchGames } from "../modules/fetchGames";

// components
import GamesCardList from "./GamesCardList";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { gameUrl, optionsForGamesFetching } from "../modules/fetchOptions";
import { RootState } from "../redux/store";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Games = () => {
  const { popular, MOBA, fighting, allGames } = useSelector(
    (state: RootState) => state.games
  );
  const dispatch = useDispatch();
  const [pending, setIsPending] = React.useState<boolean>(true);
  const desktop = useMediaQuery("(min-width: 1000px)");

  // URL for API requests to FREE GAMES API - currently fetching games fron /database/category
  const url_popular = gameUrl(true, "popularity");
  const url_fighter = gameUrl(true, "fighting");
  const url_mixed_games = gameUrl(true, "allGames");
  const url_MOBA_games = gameUrl(true, "MOBA");

  React.useEffect(() => {
    // If the states has content then we need to display it instead of re-featch the same content.
    if (popular.length !== 0 && allGames.length !== 0)
      return setIsPending(false);

    const fetch_popular = fetchGames(
      url_popular,
      optionsForGamesFetching /* dispatch */
    );
    const fetch_mixed_games = fetchGames(url_mixed_games);
    const fetch_fighter_games = fetchGames(url_fighter);
    const fetch_MOBA_games = fetchGames(url_MOBA_games);

    const allFetches = [
      fetch_popular,
      fetch_MOBA_games,
      fetch_fighter_games,
      fetch_mixed_games,
    ];

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
        <div className="text-white mt-8 space-y-2">
          <div className="space-y-1">
            <h2 className="text-base mx-3 font-semibold">
              Popular Games{" "}
              <span className="text-[#A48EFF] text-xs sm:text-sm cursor-pointer hover:text-themePurple">
                view more
              </span>
            </h2>

            <GamesCardList
              classNameUL="flex overflow-scroll lg:overflow-hidden pb-2 no-scrollbar"
              classNameLI={`flex-none w-[350px] rounded-xl transition-all duration-200`}
              gamesList={popular}
              arrows={desktop}
              position={0}
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-base mx-3 font-semibold">
              Fighting Games{" "}
              <span className="text-[#A48EFF] text-xs sm:text-sm cursor-pointer hover:text-themePurple">
                view more
              </span>
            </h2>

            <GamesCardList
              classNameUL="flex overflow-scroll lg:overflow-hidden pb-2 no-scrollbar"
              classNameLI={`flex-none w-[350px] rounded-xl transition-all duration-200`}
              gamesList={fighting}
              arrows={desktop}
              position={1}
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-base mx-3 font-semibold">
              MOBA Games{" "}
              <span className="text-[#A48EFF] text-xs sm:text-sm cursor-pointer hover:text-themePurple">
                view more
              </span>
            </h2>

            <GamesCardList
              classNameUL="flex overflow-scroll lg:overflow-hidden pb-2 no-scrollbar"
              classNameLI={`flex-none w-[350px] rounded-xl transition-all duration-200`}
              gamesList={MOBA}
              arrows={desktop}
              position={2}
            />
          </div>
          <div className="space-y-1 mx-2">
            <h2 className="">Explore more games</h2>
            <GamesCardList
              classNameUL="card-grid overflow-auto no-scrollbar"
              classNameLI="flex-none"
              gamesList={allGames.filter(
                (game) => !popularGameTitles.includes(game.title)
              )}
              arrows={false}
              position={3}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Games;
