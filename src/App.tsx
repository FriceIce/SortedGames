import React, { lazy } from "react";

//React Router
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// components
const Api = lazy(() => import("./pages/Api/Api"));
const Home = lazy(() => import("./pages/Home/Home"));
const Genre = lazy(() => import("./pages/Genre/Genre"));
const Header = lazy(() => import("./Components/Header"));
const SignIn = lazy(() => import("./pages/Signin/SignIn"));
const Search = lazy(() => import("./pages/Search/Search"));
const PrivateRoutes = lazy(() => import("./PrivateRoutes"));
const SideMenu = lazy(() => import("./Components/SideMenu"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const CompleteGameInfo = lazy(() => import("./Components/CompleteGameInfo"));
const LoadingScreen = lazy(
  () => import("./Components/LoadingScreen/LoadingScreen")
);

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
      {user === null && (
        <LoadingScreen loader="fullScreenloader" position="fixed" />
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
          {/* <Route path="/SortedGames/Support" element={<Dashboard />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
