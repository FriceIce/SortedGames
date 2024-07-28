import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../redux/store";
import { useMediaQuery } from "../hooks/useMediaQuery";

const GenresList = ({ genresState }: { genresState: boolean }) => {
  const sidemenu = useSelector((state: RootState) => state.sidemenu.sidemenu);
  const dispatch = useDispatch();

  //media query
  const desktop = useMediaQuery("(min-width: 1024px)");

  // Image paths for the genres
  const corePath = "/images/thumbnails/thumbnail-";
  const genres = [
    { src: `${corePath}open_world.jpg`, title: "Open world" },
    { src: `${corePath}battle-royale.jpg`, title: "Battle Royale" },
    { src: `${corePath}MMORPG.jpg`, title: "MMORPG" },
    { src: `${corePath}shooter.jpg`, title: "Shooter" },
    { src: `${corePath}sports.jpg`, title: "Sports" },
    { src: `${corePath}MOBA.jpg`, title: "MOBA" },
    { src: `${corePath}anime.jpg`, title: "Anime" },
    { src: `${corePath}zombie.jpg`, title: "Zombie" },
    { src: `${corePath}horror.jpg`, title: "Horror" },
    { src: `${corePath}fighting.jpg`, title: "Fighting" },
    { src: `${corePath}card-games.jpg`, title: "Card Games" },
    { src: `${corePath}fantasy.jpg`, title: "Fantasy" },
    { src: `${corePath}sci-fi.jpg`, title: "Sci-Fi" },
  ];

  const onNavLink = () => {
    document.body.style.overflow = "auto";
    if (!desktop)
      dispatch({ type: "sidemenu/setOpenSidemenu", payload: !sidemenu });
  };

  return (
    <div
      className={`grid ${
        genresState ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      } mt-2 ml-2 transition-all duration-500 ease-out`}
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
                to={`/genre/${param.toLowerCase()}`}
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
