// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useMediaQuery } from "../hooks/useMediaQuery";
import MenuOptions from "./MenuOptions";
import React from "react";
import { useNavigate } from "react-router-dom";
import GenresList from "./GenresList";

const SideMenu = () => {
  const [genresList, setOpenGenresList] = React.useState<boolean>(true);
  const [profileList, setOpenProfileList] = React.useState<boolean>(false);

  // redux
  const sidemenu = useSelector((state: RootState) => state.sidemenu.sidemenu);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // Navigation hook
  const navigate = useNavigate();

  //media query
  const desktop = useMediaQuery("(min-width: 1024px)");

  // Get current url-pathname
  const pathname = window.location.pathname;

  // This UseEffect is only for mobile devices.
  React.useEffect(() => {
    const subRoot = document.getElementById("sub_root") as HTMLDivElement;
    const body = document.body;

    if (sidemenu && !desktop) {
      body.style.overflow = "hidden";
      subRoot.style.overflowY = "hidden";
    }
    if (!sidemenu) {
      // dispatch({ type: "sidemenu/setOpenSidemenu", payload: !sidemenu });
      body.style.overflow = "auto";
      subRoot.style.overflowY = "auto";
    }
  }, [sidemenu]);

  return (
    <aside
      className={`fixed inset-0 z-[1] h-full bg-[#101720f6] text-white rounded-tr-md pt-[90px] ${
        desktop ? "w-max" : "w-full"
      } left-[-100%] transition-all duration-200 overflow-y-auto pb-2 hide-scrollbar ${
        sidemenu && "left-[0]"
      }`}
    >
      <div className="p-4 space-y-6">
        {!desktop && (
          <MenuOptions
            desktop={desktop}
            profileList={profileList}
            user={user}
            dispatch={dispatch}
            navigate={navigate}
            setOpenProfileList={setOpenProfileList}
          />
        )}
        {/* Genres option */}
        <div
          className={`w-max pr-2 ${
            pathname === "/genre/" && "border-b-2 border-white"
          }`}
        >
          <div className={`${desktop && "mt-4"}`}>
            <div
              className="flex items-center gap-2"
              onClick={() => setOpenGenresList((prevState) => !prevState)}
            >
              <img
                src="/SortedGames/icons/genres-icon.svg"
                alt="Genre Icon as an Atom"
                className="size-6 sm:size-[28px]"
              />
              <p>Genres</p>
              {!desktop && (
                <img
                  src="/SortedGames/icons/polygon.svg"
                  alt="Polygon icon"
                  className={`size-2 transition-all duration-300 ${
                    !genresList && "rotate-[-180deg]"
                  }`}
                />
              )}
            </div>
            <GenresList genresState={genresList} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideMenu;
