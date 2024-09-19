import React, { lazy } from "react";
// modules

// components
const GamesCardList = lazy(() => import("./GamesCardList"));

// Redux
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { readGameCategories } from "../firebase/firebase";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { returnGameTitles } from "../modules/gameFilterSystem";
import { RootState } from "../redux/store";
import LoadingScreen from "./LoadingScreen/LoadingScreen";

const Games = () => {
  const { popular, MOBA, fighting, mixedGames } = useSelector(
    (state: RootState) => state.games
  );
  const dispatch = useDispatch();
  const [pending, setIsPending] = React.useState<boolean>(true);
  const desktop = useMediaQuery("(min-width: 1000px)");

  React.useEffect(() => {
    // If the fetch is not pending, set the contentIsLoaded state to true for removal of the loading indicator.
    if (!pending) dispatch({ type: "games/setContentIsLoaded", payload: true });
  }, [pending]);

  React.useEffect(() => {
    // If the states has content then we need to display it instead of re-featching the same content.
    if (popular.length !== 0 && mixedGames.length !== 0)
      return setIsPending(false);

    const fetch_popular = readGameCategories("popular");
    const fetch_mixed_games = readGameCategories("mixed_games");
    const fetch_fighter_games = readGameCategories("fighting");
    const fetch_MOBA_games = readGameCategories("moba");

    const allFetches = [
      fetch_popular,
      fetch_MOBA_games,
      fetch_fighter_games,
      fetch_mixed_games,
    ];

    Promise.all(allFetches).then((data) => {
      setIsPending(false);
      dispatch({ type: "games/cacheGames", payload: data });
      return;
    });

    return () => {};
  }, []);

  // List of game titles.
  const popularGameTitles = returnGameTitles(popular);
  const fightingGameTitles = returnGameTitles(fighting);
  const MOBAGameTitles = returnGameTitles(MOBA);

  return (
    <>
      {pending && (
        <div className="pt-10">
          <LoadingScreen loader="smallerLoaderAnimation" position="static" />
        </div>
      )}
      {!pending && (
        <div className="text-white space-y-2">
          <div className="space-y-1">
            <h2 className="text-base mx-3 font-semibold">
              Popular Games{" "}
              <Link
                to={`/SortedGames/genre/popularity`}
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
              gamesList={mixedGames.filter((game) => {
                if (popularGameTitles.includes(game.title)) return null;
                if (fightingGameTitles.includes(game.title)) return null;
                if (MOBAGameTitles.includes(game.title)) return null;
                return game;
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