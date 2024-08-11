//React Router
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

//*
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CompleteGameInfo from "./Components/CompleteGameInfo";
import Header from "./Components/Header";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import SideMenu from "./Components/SideMenu";
import { UserInformations } from "./definitions";
import { useCheckUserState } from "./hooks/useCheckUserState";
import { useMediaQuery } from "./hooks/useMediaQuery";
import Api from "./pages/Api/Api";
import Dashboard from "./pages/Dashboard/Dashboard";
import Genre from "./pages/Genre/Genre";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import SignIn from "./pages/Signin/SignIn";
import PrivateRoutes from "./PrivateRoutes";
import { RootState } from "./redux/store";

function App() {
  const [scrollPosition, setScrollPosition] = React.useState<boolean | null>(
    null
  );
  const [scrollY, setScrollY] = React.useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  useCheckUserState();
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
    <div
      className={`relative z-[2] overflow-y-auto overflow-x-hidden h-screen w-screen hide-scrollbar`}
      id="sub_root"
      onScroll={getScrollPosition}
    >
      {user === null && <LoadingScreen loader="fullScreenloader" />}
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
          {/* <Route path="/SortedGames/Support" element={<Dashboard />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
