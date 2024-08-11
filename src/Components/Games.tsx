import React, { lazy } from "react";
// modules

// components
const GamesCardList = lazy(() => import("./GamesCardList"));

// Redux
import { returnGameTitles } from "../modules/gameFilterSystem";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { readGameCategories } from "../firebase/firebase";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { RootState } from "../redux/store";

const Games = () => {
  const { popular, MOBA, fighting, allGames } = useSelector(
    (state: RootState) => state.games
  );
  const dispatch = useDispatch();
  const [pending, setIsPending] = React.useState<boolean>(true);
  const desktop = useMediaQuery("(min-width: 1000px)");

  React.useEffect(() => {
    // If the states has content then we need to display it instead of re-featching the same content.
    if (popular.length !== 0 && allGames.length !== 0)
      return setIsPending(false);

    const fetch_popular = readGameCategories("Popular");
    const fetch_mixed_games = readGameCategories("MixedGames");
    const fetch_fighter_games = readGameCategories("Fighting");
    const fetch_MOBA_games = readGameCategories("MOBA");

    const allFetches = [
      fetch_popular,
      fetch_MOBA_games,
      fetch_fighter_games,
      fetch_mixed_games,
    ];

    Promise.all(allFetches).then((data) => {
      // The same order as the allFetches array.
      console.log(data);
      dispatch({ type: "games/cacheGames", payload: data });
      setIsPending(false);
      return;
    });

    return () => {};
  }, []);

  // List of game titles for not dysplaying dublicated games.
  const popularGameTitles = returnGameTitles(popular);
  const fightingGameTitles = returnGameTitles(fighting);
  const MOBAGameTitles = returnGameTitles(MOBA);
  return (
    <>
      {!pending && (
        <div className="text-white space-y-2">
          <div className="space-y-1">
            <h2 className="text-base mx-3 font-semibold">
              Popular Games{" "}
              <Link
                to={`/SortedGames/genre/popular`}
                className="text-[#A48EFF] text-xs sm:text-sm cursor-pointer hover:text-themePurple"
              >
                view more
              </Link>
            </h2>

            <GamesCardList
              classNameUL="flex overflow-scroll lg:overflow-hidden pb-2 no-scrollbar"
              classNameLI={`flex-none w-[350px] rounded-xl transition-all duration-200`}
              gamesList={popular.filter((game) => {
                if (!fightingGameTitles.includes(game.title)) return game;
                if (!MOBAGameTitles.includes(game.title)) return game;
              })}
              arrows={desktop}
              position={0}
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-base mx-3 font-semibold">
              Fighting Games{" "}
              <Link
                to={`/SortedGames/genre/fighting`}
                className="text-[#A48EFF] text-xs sm:text-sm cursor-pointer hover:text-themePurple"
              >
                view more
              </Link>
            </h2>

            <GamesCardList
              classNameUL="flex overflow-scroll lg:overflow-hidden pb-2 no-scrollbar"
              classNameLI={`flex-none w-[350px] rounded-xl transition-all duration-200`}
              gamesList={fighting.filter(
                (game) => !popularGameTitles.includes(game.title)
              )}
              arrows={desktop}
              position={1}
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-base mx-3 font-semibold">
              MOBA Games{" "}
              <Link
                to={`/SortedGames/genre/MOBA`}
                className="text-[#A48EFF] text-xs sm:text-sm cursor-pointer hover:text-themePurple"
              >
                view more
              </Link>
            </h2>

            <GamesCardList
              classNameUL="flex overflow-scroll lg:overflow-hidden pb-2 no-scrollbar"
              classNameLI={`flex-none w-[350px] rounded-xl transition-all duration-200`}
              gamesList={MOBA.filter(
                (game) => !fightingGameTitles.includes(game.title)
              )}
              arrows={desktop}
              position={2}
            />
          </div>
          <div className="space-y-1 mx-2">
            <h2 className="">Explore more games</h2>
            <GamesCardList
              classNameUL="card-grid overflow-auto no-scrollbar"
              classNameLI="flex-none"
              gamesList={allGames.filter((game) => {
                if (!popularGameTitles.includes(game.title)) return game;
                if (!fightingGameTitles.includes(game.title)) return game;
                if (!MOBAGameTitles.includes(game.title)) return game;
              })}
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
