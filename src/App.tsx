//React Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//
import React from "react";
import Header from "./Components/Header";
import Home from "./pages/Home/Home";
import Genre from "./pages/Genre/Genre";
import SideMenu from "./Components/SideMenu";
import CompleteGameInfo from "./Components/CompleteGameInfo";
import SignIn from "./pages/Signin/SignIn";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "./pages/Dashboard/Dashboard";
import Search from "./pages/Search/Search";
import { useCheckUserState } from "./hooks/useCheckUserState";
import { UserInformations } from "./definitions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import { useMediaQuery } from "./hooks/useMediaQuery";
import Api from "./pages/Api/Api";

function App() {
  const [scrollPosition, setScrollPosition] = React.useState<boolean | null>(
    null
  );
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  useCheckUserState(user);
  useMediaQuery(
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
    <div
      className={`relative z-[2] overflow-y-auto overflow-x-hidden h-screen w-screen hide-scrollbar`}
      id="sub_root"
      onScroll={getScrollPosition}
    >
      {user === null && <LoadingScreen />}
      <BrowserRouter>
        <div className="sticky z-[3] top-0">
          <Header scrollPosition={scrollPosition} />
          <SideMenu />
        </div>
        <Routes>
          <Route path="/SortedGames/" element={<Home />} />
          <Route path="/SortedGames/genre/:genreTitle/" element={<Genre />} />
          <Route
            path="/SortedGames/genre/:genreTitle?/:id"
            element={<CompleteGameInfo />}
          />
          <Route path="/SortedGames/sign-in" element={protectedRoute(user)} />

          <Route element={<PrivateRoutes />}>
            <Route path="/SortedGames/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/SortedGames/search" element={<Search />} />
          <Route path="/SortedGames/api" element={<Api />} />
          {/* <Route path="/SortedGames/Support" element={<Dashboard />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
