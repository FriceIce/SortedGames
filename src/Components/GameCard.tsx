import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GameMiniCard } from "../definitions";
import { useMediaQuery } from "../hooks/useMediaQuery";

const GameCard = ({ card }: { card: GameMiniCard }) => {
  const dispatch = useDispatch();
  const { genreTitle } = useParams();
  const navigate = useNavigate();

  const desktop = useMediaQuery("(min-width: 1024px)");
  const { genre, thumbnail, title, id } = card;

  return (
    <>
      <div
        className={`h-full w-full rounded-xl border-2 border-transparent transition-all cursor-pointer hover:border-[#7C61EC]`}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (!target.classList.contains("saveGame")) {
            dispatch({ type: "header/setBackButton", payload: true });
            dispatch({ type: "sidemenu/setOpenSidemenu", payload: false }); // Sidmenu closes when a game card is clicked.
            navigate(`/SortedGames/genre/${genre}/${id}`);
            return;
          }
        }}
      >
        <div
          className={`flex items-end justify-center w-full h-[200px] bg-center bg-no-repeat bg-cover  brightness-105 rounded-xl ${
            genreTitle && "savegame"
          }`}
          style={{
            backgroundImage: `url(${thumbnail})`,
          }}
        >
          <div
            className={`bg-[#0000008e] ${
              !desktop ? "opacity-100" : "opacity-0 h-full"
            } w-full h-10 grid place-items-center rounded-b-xl hover:opacity-100 hover:rounded-xl`}
          >
            <h2 className="text-white font-bold text-sm text-wrap text-center truncate">
              {title}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
