import React from "react";

//React Router
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// components
import CompleteGameInfo from "./Components/CompleteGameInfo";
import Header from "./Components/Header";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import SideMenu from "./Components/SideMenu";
import Api from "./pages/Api/Api";
import Dashboard from "./pages/Dashboard/Dashboard";
import Genre from "./pages/Genre/Genre";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import SignIn from "./pages/Signin/SignIn";
import PrivateRoutes from "./PrivateRoutes";

//*
import { useDispatch, useSelector } from "react-redux";
import { UserInformations } from "./definitions";
import { useCheckUserState } from "./hooks/useCheckUserState";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { RootState } from "./redux/store";

function App() {
  const [scrollPosition, setScrollPosition] = React.useState<boolean | null>(
    null
  );
  const [scrollY, setScrollY] = React.useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.user);
  const contentIsLoaded = useSelector(
    (state: RootState) => state.games.contentIsLoaded
  );
  const dispatch = useDispatch();
  useCheckUserState();
  const isDesktop = useMediaQuery(
    //This opens the sidmenu on desktop screens on application reloads.
    "(min-width: 1024px)",
    dispatch,
    "sidemenu/setOpenSidemenu"
  );

  const getScrollPosition = () => {
    const subRootElement = document.getElementById(
      "sub_root"
    ) as HTMLDivElement;
    const scrollPositionY = subRootElement.scrollTop;
    setScrollY(
      window.innerHeight + subRootElement.scrollTop + 1 >=
        subRootElement.scrollHeight
    );
    // This stops the component from re-render evertime this function runs.
    if (scrollPositionY > 1 && !scrollPosition) setScrollPosition(true);
    if (scrollPositionY < 1 && scrollPosition === true)
      setScrollPosition(false);
    return;
  };

  const protectedRoute = (userState: null | false | UserInformations) => {
    if (userState === false) return <SignIn />;
    if (userState) return <Navigate to={"/SortedGames/dashboard"} />;
  };

  return (
    <>
      {/* <ReactQueryDevtools initialIsOpen={false} position="right" /> */}
      <div
        className={`relative z-[2] overflow-y-auto overflow-x-hidden h-dvh pb-2 w-screen ${
          !isDesktop && "hide-scrollbar"
        }`}
        id="sub_root"
        onScroll={getScrollPosition}
      >
        {(user === null || !contentIsLoaded) && (
          <LoadingScreen
            loader="fullScreenloader"
            position="fixed"
            text={true}
          />
        )}
        <BrowserRouter>
          <div className="sticky z-[3] top-0">
            <Header scrollPosition={scrollPosition} />
            <SideMenu />
          </div>
          <Routes>
            <Route path="/SortedGames/" element={<Home />} />
            <Route
              path="/SortedGames/genre/:genreTitle/"
              element={<Genre scrollPositionY={scrollY} />}
            />

            <Route
              path="/SortedGames/genre/:genreTitle?/:id"
              element={<CompleteGameInfo />}
            />

            <Route path="/SortedGames/sign-in" element={protectedRoute(user)} />

            <Route element={<PrivateRoutes />}>
              <Route path="/SortedGames/dashboard" element={<Dashboard />} />
            </Route>

            <Route
              path="/SortedGames/search"
              element={<Search scrollPositionY={scrollY} />}
            />

            <Route path="/SortedGames/api" element={<Api />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

export const similarGames = [
  {
    "id": 582,
    "title": "Tarisland",
    "thumbnail": "https://www.freetogame.com/g/582/thumbnail.jpg",
    "short_description": "A cross-platform MMORPG developed by Level Infinite and Published by Tencent.",
    "game_url": "https://www.freetogame.com/open/tarisland",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "Tencent",
    "developer": "Level Infinite",
    "release_date": "2024-06-22",
    "freetogame_profile_url": "https://www.freetogame.com/tarisland"
  },
  {
    "id": 540,
    "title": "Overwatch 2",
    "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
    "short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
    "game_url": "https://www.freetogame.com/open/overwatch-2",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Activision Blizzard",
    "developer": "Blizzard Entertainment",
    "release_date": "2022-10-04",
    "freetogame_profile_url": "https://www.freetogame.com/overwatch-2"
  },
  {
    "id": 516,
    "title": "PUBG: BATTLEGROUNDS",
    "thumbnail": "https://www.freetogame.com/g/516/thumbnail.jpg",
    "short_description": "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
    "game_url": "https://www.freetogame.com/open/pubg",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "KRAFTON, Inc.",
    "developer": "KRAFTON, Inc.",
    "release_date": "2022-01-12",
    "freetogame_profile_url": "https://www.freetogame.com/pubg"
  },
  {
    "id": 508,
    "title": "Enlisted",
    "thumbnail": "https://www.freetogame.com/g/508/thumbnail.jpg",
    "short_description": "Get ready to command your own World War II military squad in Gaijin and Darkflow Software’s MMO squad-based shooter Enlisted. ",
    "game_url": "https://www.freetogame.com/open/enlisted",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Gaijin Entertainment",
    "developer": "Darkflow Software",
    "release_date": "2021-04-08",
    "freetogame_profile_url": "https://www.freetogame.com/enlisted"
  },
  {
    "id": 345,
    "title": "Forge of Empires",
    "thumbnail": "https://www.freetogame.com/g/345/thumbnail.jpg",
    "short_description": "A free to play 2D browser-based online strategy game, become the leader and raise your city.",
    "game_url": "https://www.freetogame.com/open/forge-of-empires",
    "genre": "Strategy",
    "platform": "Web Browser",
    "publisher": "InnoGames",
    "developer": "InnoGames",
    "release_date": "2012-04-17",
    "freetogame_profile_url": "https://www.freetogame.com/forge-of-empires"
  },
  {
    "id": 590,
    "title": "Throne And Liberty",
    "thumbnail": "https://www.freetogame.com/g/590/thumbnail.jpg",
    "short_description": "A free-to-play multi-platorm MMORPG from NCSoft and Amazon Games.",
    "game_url": "https://www.freetogame.com/open/throne-and-liberty",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "Amazon Games",
    "developer": "NCSoft",
    "release_date": "2024-10-01",
    "freetogame_profile_url": "https://www.freetogame.com/throne-and-liberty"
  },
  {
    "id": 475,
    "title": "Genshin Impact",
    "thumbnail": "https://www.freetogame.com/g/475/thumbnail.jpg",
    "short_description": "If you’ve been looking for a game to scratch that open-world action RPG itch, one with perhaps a bit of Asian flair, then you’re going to want to check out miHoYo’s Genshin Impact.",
    "game_url": "https://www.freetogame.com/open/genshin-impact",
    "genre": "Action RPG",
    "platform": "PC (Windows)",
    "publisher": "miHoYo",
    "developer": "miHoYo",
    "release_date": "2020-09-28",
    "freetogame_profile_url": "https://www.freetogame.com/genshin-impact"
  },
] 