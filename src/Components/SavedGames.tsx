import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import GameCard from "./GameCard";

const SavedGames = () => {
  const { savedGames } = useSelector((state: RootState) => state.user);
  return (
    <>
      <h1 className="text-center text-2xl font-bold">Your saved Games list</h1>
      <div className="flex justify-center">
        <ul className="card-grid w-full mx-4 no-scrollbar">
          {savedGames &&
            savedGames
              .map((game) => {
                return (
                  <li key={game.id} className="rounded-xl">
                    <GameCard card={game} />
                  </li>
                );
              })
              .reverse()}
        </ul>
      </div>
    </>
  );
};

export default SavedGames;
