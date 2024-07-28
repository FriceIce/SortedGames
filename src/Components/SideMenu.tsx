import React from "react";
import { useNavigate } from "react-router-dom";
import GenresList from "./GenresList";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useMediaQuery } from "../hooks/useMediaQuery";

const SideMenu = () => {
  const [genresList, setOpenGenresList] = React.useState<boolean>(true);
  const [profile, setOpenProfileList] = React.useState<boolean>(false);

  // redux
  const sidemenu = useSelector((state: RootState) => state.sidemenu.sidemenu);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // Navigation hook
  const navigate = useNavigate();

  // Get current url-pathname
  const pathname = window.location.pathname;

  //media query
  const desktop = useMediaQuery("(min-width: 1024px)");

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

  const wait = (path: string) => {
    dispatch({ type: "sidemenu/setOpenSidemenu", payload: !sidemenu });
    return setTimeout(() => navigate(path), 150);
  };
  return (
    <aside
      className={`fixed inset-0 z-[1] h-full bg-[#101720f6] text-white rounded-tr-md pt-[90px] ${
        desktop ? "w-max" : "w-full"
      } left-[-100%] transition-all duration-200 overflow-y-auto pb-2 hide-scrollbar ${
        sidemenu && "left-[0]"
      }`}
    >
      <div className="space-y-6 text-white p-4">
        {/* Sign in */}

        <div className="flex flex-col">
          <div
            className="flex gap-2 items-center"
            onClick={() => {
              if (!user) {
                setOpenGenresList((prevState) => !prevState);
                wait("/sign-in"); //Send user to sign in if not signed in.
              }
              if (user) setOpenProfileList((prev) => !prev);
            }}
          >
            <img
              src={user ? user.profileImg : "/icons/user_light.svg"}
              alt="sign in icon"
              className="size-6"
            />
            <p>{user ? "Profile" : "Sign in"}</p>
            {user && (
              <img
                src="/icons/polygon.svg"
                alt="Polygon icon"
                className={`size-2 transition-all duration-300 ${
                  !profile && "rotate-[-180deg]"
                }`}
              />
            )}
          </div>
          <div
            className={`grid ${
              profile ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            } transition-all duration-300`}
          >
            <ul
              className="min-h-0 overflow-hidden text-xs space-y-2 ml-4 w-max list-disc list-inside"
              onClick={() => {
                setOpenProfileList((prev) => !prev);
                wait("/dashboard");
              }}
            >
              <li className="mt-2">Go to profile.</li>
              <li
                className=""
                onClick={() =>
                  dispatch({ type: "user/setUserState", payload: false })
                }
              >
                Sign out
              </li>
            </ul>
          </div>
        </div>
        {/* Search-inputfield */}
        <div className="flex gap-2" onClick={() => wait("/search")}>
          <img
            src="/icons/search-icon-cont.svg"
            alt="search icon"
            className="size-6 mt-[1px] mb-[4px]"
          />
          <p className="">Search</p>
        </div>

        {/* Home option */}
        <div
          className={`flex items-center gap-2 w-max pr-2 pb-1 ${
            pathname === "/" && "border-b-2 border-white"
          }`}
          onClick={() => wait("/")}
        >
          <img src="/icons/home.svg" alt="Home icon" className="size-6" />
          <p>Home</p>
        </div>

        {/* Genres option */}
        <div
          className={`flex flex-col gap-3 w-max pr-2 ${
            pathname === "/genre/" && "border-b-2 border-white"
          }`}
        >
          <div
            className="flex items-center gap-2"
            onClick={() => setOpenGenresList((prevState) => !prevState)}
          >
            <img
              src="/icons/genres-icon.svg"
              alt="Genre Icon as an Atom"
              className="size-6"
            />
            <p>Genres</p>
            <img
              src="/icons/polygon.svg"
              alt="Polygon icon"
              className={`size-2 transition-all duration-300 ${
                !genresList && "rotate-[-180deg]"
              }`}
            />
          </div>
          <GenresList genresState={genresList} />
        </div>

        {/* API section */}
        <div className="flex gap-2">
          <img src="/icons/api-icon.svg" alt="API icon" className="size-6" />
          <p className="">API</p>
        </div>
      </div>
    </aside>
  );
};

export default SideMenu;
