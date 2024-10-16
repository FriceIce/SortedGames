import { Dispatch } from "react";
import { GameMiniCard } from "../definitions";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import GameCard from "./GameCard";

const SimilarGames = ({
  setShowMore,
  games,
}: {
  setShowMore: Dispatch<React.SetStateAction<boolean>>;
  games: GameMiniCard[];
}) => {
  const sidemenu = useSelector((state: RootState) => state.sidemenu.sidemenu);

  return (
    <div
      className={`transition-all duration-200 space-y-6 mx-2 ${
        sidemenu && "lg:ml-[210px]"
      }`}
    >
      <div className="flex lg:gap-2 items-center w-fit mx-auto">
        <button
          className="size-7 lg:size-10 grid place-items-center bg-[#00000062] rounded-full mx-4 border transition-all hover:scale-105 lg:hover:bg-themePurple"
          onClick={() => setShowMore(false)}
        >
          <img
            src="/SortedGames/icons/chevron-left.svg"
            className="lg:size-6 size-5"
          />
        </button>
        <h1 className="text-lg lg:text-4xl font-bold">
          Similar to Call of Duty: Warzone
        </h1>
      </div>

      <ul className="card-grid">
        {games.map((game) => {
          return (
            <li key={game.id} onClick={() => setShowMore(false)}>
              <GameCard card={game} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SimilarGames;
