import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../redux/store";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { genres } from "../assets/genreImages";

const GenresList = ({ genresState }: { genresState: boolean }) => {
  const sidemenu = useSelector((state: RootState) => state.sidemenu.sidemenu);
  const dispatch = useDispatch();

  //media query
  const desktop = useMediaQuery("(min-width: 1024px)");

  const onNavLink = () => {
    document.body.style.overflow = "auto";
    if (!desktop)
      dispatch({ type: "sidemenu/setOpenSidemenu", payload: !sidemenu });
  };

  return (
    <div
      className={`grid ${
        genresState ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr]"
      } ml-2 transition-all duration-300 ease-out`}
    >
      <ul className="space-y-3 overflow-hidden min-h-0">
        {genres.map((genre) => {
          const param =
            genre.title.toLocaleLowerCase() === "open world" ||
            genre.title.toLocaleLowerCase() === "battle royale"
              ? genre.title.replace(" ", "-")
              : genre.title.replace(" ", "&");
          return (
            <li key={genre.title}>
              <NavLink
                to={`/SortedGames/genre/${param.toLowerCase()}`}
                className="flex items-center gap-4"
                onClick={onNavLink}
              >
                <img
                  src={genre.src}
                  alt="genre.genre"
                  className="size-[54px] rounded-xl object-cover object-center"
                />
                <p className="font-normal text-sm">{genre.title}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GenresList;
