import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import MenuOptions from "./MenuOptions";
import SideMenuButton from "./SideMenuButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Header = ({ scrollPosition }: { scrollPosition: boolean | null }) => {
  const [profileList, setOpenProfileList] = React.useState<boolean>(false);

  const sidemenu = useSelector((state: RootState) => state.sidemenu.sidemenu);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { genreTitle } = useParams();
  //media query
  const desktop = useMediaQuery("(min-width: 1024px)");

  const appNavigation = () => {
    if (pathname.includes("/SortedGames/genre/")) return navigate(-1);
    if (!pathname.includes("/SortedGames/genre/"))
      return navigate("/SortedGames/");
  };

  const route = (): boolean | undefined => {
    if (pathname.includes("search")) return true;
    if (pathname.includes("dashboard") || pathname.includes("sign-in"))
      return true;
    if (pathname.includes("genre") && genreTitle) return true;
    if (pathname.includes("api")) return true;
    if (pathname === "/SortedGames/") return true;
  };

  return (
    <header
      className={`relative transition-all ${
        (scrollPosition || route()) && "bg-midnightBlue"
      } ${
        sidemenu && !desktop && "bg-midnightBlue delay-200"
      } w-full h-[90px] z-[2] `}
    >
      <div
        className={`flex items-center justify-between h-[90px] w-full px-4 `}
      >
        <div className="flex-1 cursor-pointer" onClick={appNavigation}>
          <img
            src="/SortedGames/icons/Sorted-Games.svg"
            alt="Applikation icon"
            className="relative z-0 w-[150px] sm:w-[200px]"
            title="Go to home page"
          />
          {/* )} */}
        </div>

        {desktop && (
          <MenuOptions
            desktop={desktop}
            profileList={profileList}
            user={user}
            scrollPosition={scrollPosition}
            dispatch={dispatch}
            navigate={navigate}
            setOpenProfileList={setOpenProfileList}
          />
        )}

        <div className="flex-1 flex justify-end items-center h-full ">
          <SideMenuButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
