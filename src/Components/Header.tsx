import SideMenuButton from "./SideMenuButton";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ scrollPosition }: { scrollPosition: number }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const appNavigation = () => {
    if (pathname.includes("/SortedGames/genre/")) return navigate(-1);
    if (!pathname.includes("/SortedGames/genre/"))
      return navigate("/SortedGames/");
  };

  return (
    <header
      className={`relative ${
        scrollPosition > 0 && "bg-midnightBlue transition-all duration-200"
      } w-full h-[90px] z-[2]`}
    >
      <div
        className={`flex items-center justify-between h-[90px] w-full px-5 `}
      >
        <div
          className="text-white text-s w-[51px] cursor-pointer"
          onClick={appNavigation}
        >
          {pathname.includes("/genre/") ? (
            <img
              src="/SortedGames/icons/go-back-icon.svg"
              alt="Applikation icon"
              aria-label="button"
              tabIndex={0}
              className="size-8"
            />
          ) : (
            <img
              src="/SortedGames/icons/helmet.svg"
              alt="Applikation icon"
              className="relative z-0 size-12"
              title="Go to home page"
            />
          )}
        </div>

        <SideMenuButton />
      </div>
    </header>
  );
};

export default Header;
