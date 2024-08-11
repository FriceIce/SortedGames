import React, { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { UserInformations } from "../definitions";
import { AppDispatch } from "../redux/store";
import { signOut } from "../firebase/firebase";

const MenuOptions = ({
  desktop,
  profileList,
  user,
  scrollPosition,
  dispatch,
  navigate,
  setOpenProfileList,
}: {
  desktop: boolean; // true if desktop screen min-width 1024px
  profileList: boolean;
  user: null | false | UserInformations; // Checkfor user status
  scrollPosition?: boolean | null; //Check if the user is scrolling.
  dispatch: AppDispatch;
  navigate: NavigateFunction;
  setOpenProfileList: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const wait = (path: string, desktop: boolean) => {
    //If the user uses an ipad or mobile, the sidmenu should close after options is clicked.
    if (!desktop)
      dispatch({ type: "sidemenu/setOpenSidemenu", payload: false });

    return setTimeout(() => navigate(path), 150);
  };

  return (
    <div
      className={`flex-1  ${
        desktop
          ? `flex flex-row-reverse items-center justify-center gap-4`
          : "space-y-6"
      } text-white`}
    >
      <div className={`flex flex-col cursor-pointer`}>
        <div
          className={`flex ${
            desktop && `flex-row-reverse justify-end`
          } gap-2 items-center`}
          onClick={() => {
            if (!user) {
              wait("/SortedGames/sign-in", false); //Send user to sign in if not signed in.
            }
            if (user) setOpenProfileList((prev) => !prev);
          }}
        >
          {((desktop && user) || !desktop) && (
            <img
              src={user ? user.profileImg : "/SortedGames/icons/user_light.svg"}
              alt="sign in icon"
              className={`size-6 sm:size-[30px] ${
                user && "bg-white rounded-full"
              }`}
            />
          )}

          <p className="text-sm lg:text-base xl:text-lg">
            {user ? `${"Dashboard"}` : "Sign in"}
          </p>
          {user && !desktop && (
            <img
              src="/SortedGames/icons/polygon.svg"
              alt="Polygon icon"
              className={`size-2 transition-all duration-300 ${
                !profileList && "rotate-[-180deg]"
              }`}
            />
          )}
        </div>
        <div
          className={`${desktop && "absolute bottom-[-35px]"} grid ${
            profileList ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          } transition-all duration-300`}
        >
          <ul
            className={`${
              scrollPosition && profileList && "bg-midnightBlue pb-2 rounded-lg"
            } min-h-0 overflow-hidden text-xs sm:text-sm space-y-4 ml-4 w-[120px] list-disc list-inside transition-all`}
            onClick={() => {
              setOpenProfileList((prev) => !prev);
              wait("/SortedGames/dashboard", desktop);
            }}
          >
            <li className="mt-2 ml-2">Dashboard</li>
            <li
              className="ml-2"
              onClick={async () => {
                const signedOut = await signOut();
                if (signedOut)
                  dispatch({ type: "user/setUserState", payload: false });
              }}
            >
              Sign out
            </li>
          </ul>
        </div>
      </div>

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => wait("/SortedGames/search", desktop)}
      >
        {!desktop && (
          <img
            src="/SortedGames/icons/search-icon-cont.svg"
            alt="search icon"
            className="size-6 sm:size-[28px] mt-[1px] mb-[4px]"
          />
        )}
        <p className="text-sm lg:text-base xl:text-lg">Search</p>
      </div>

      <div
        className={`flex items-center gap-2 w-max cursor-pointer`}
        onClick={() => wait("/SortedGames/", desktop)}
      >
        {!desktop && (
          <img
            src="/SortedGames/icons/home.svg"
            alt="Home icon"
            className="size-6 sm:size-[28px]"
          />
        )}
        <p className="text-sm lg:text-base xl:text-lg">Home</p>
      </div>

      {/* API section */}
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => wait("/SortedGames/api", desktop)}
      >
        {!desktop && (
          <img
            src="/SortedGames/icons/api-icon.svg"
            alt="API icon"
            className="size-6 sm:size-[28px]"
          />
        )}
        <p className="text-sm lg:text-base xl:text-lg">API</p>
      </div>
    </div>
  );
};

export default MenuOptions;
