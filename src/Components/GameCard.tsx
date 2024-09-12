import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GameMiniCard } from "../definitions";
import { useMediaQuery } from "../hooks/useMediaQuery";

const GameCard = ({
  card,
  position,
}: {
  card: GameMiniCard;
  position?: number;
}) => {
  const dispatch = useDispatch();
  const { genreTitle } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const desktop = useMediaQuery("(min-width: 1024px)");
  const { genre, thumbnail, title, id } = card;

  return (
    <>
      <div
        className={`h-full w-full rounded-md border-2 border-transparent transition-all cursor-pointer hover:lg:border-[#7C61EC]`}
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
          className={`flex items-end justify-center w-full h-[200px] ${
            (position === 3 ||
              pathname === "/SortedGames/search" ||
              pathname.includes("/SortedGames/genre") ||
              pathname === "/SortedGames/dashboard") &&
            "xs:h-[140px]"
          } bg-center bg-no-repeat bg-cover brightness-105 rounded-md ${
            genreTitle && "savegame"
          }`}
          style={{
            backgroundImage: `url(${thumbnail})`,
          }}
        >
          <div
            className={`bg-[#0000008e] ${
              !desktop ? "opacity-100" : "opacity-0 h-full"
            } w-full h-10 grid place-items-center rounded-b-xl hover:opacity-100 hover:rounded-md`}
          >
            <h2
              className={`text-white font-bold text-xs sm:text-sm text-wrap text-center truncate ${
                (position === 3 || pathname === "/SortedGames/search") &&
                "xs:text-xs"
              }`}
            >
              {title}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
