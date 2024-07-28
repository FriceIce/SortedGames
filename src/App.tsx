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
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";

function App() {
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);
  const user = useSelector((state: RootState) => state.user.user);
  const cookies = useCheckUserState(user);

  const getScrollPosition = () => {
    const subRootElement = document.getElementById(
      "sub_root"
    ) as HTMLDivElement;
    const scrollPosition = subRootElement.scrollTop;

    // This stops the component from re-render evertime this function runs.
    if (scrollPosition === 1) setScrollPosition(subRootElement.scrollTop);
    if (scrollPosition === 0) setScrollPosition(subRootElement.scrollTop);
    return;
  };

  const protectedRoute = (userState: null | false | UserInformations) => {
    if (userState === null) return <LoadingScreen />;
    if (userState === false) return <SignIn />;
    if (userState) return <Navigate to={"/SortedGames/dashboard"} />;
  };

  const loadingPhase = (
    userState: false | UserInformations | null,
    component: JSX.Element
  ) => {
    return userState === null ? <LoadingScreen /> : component;
  };
  return (
    <div
      className="relative z-[2] overflow-y-auto overflow-x-hidden h-screen w-screen hide-scrollbar"
      id="sub_root"
      onScroll={getScrollPosition}
    >
      <BrowserRouter>
        <div className="sticky z-[3] top-0">
          <Header scrollPosition={scrollPosition} />
          <SideMenu />
        </div>
        <Routes>
          <Route path="/SortedGames/" element={loadingPhase(user, <Home />)} />
          <Route
            path="/SortedGames/genre/:genreTitle/"
            element={loadingPhase(user, <Genre />)}
          />
          <Route
            path="/SortedGames/genre/:genreTitle?/:id"
            element={loadingPhase(user, <CompleteGameInfo />)}
          />
          <Route path="/SortedGames/sign-in" element={protectedRoute(user)} />

          <Route element={<PrivateRoutes />}>
            <Route path="/SortedGames/dashboard" element={<Dashboard />} />
          </Route>

          <Route
            path="/SortedGames/search"
            element={loadingPhase(user, <Search />)}
          />
          {/* <Route path="/SortedGames/Support" element={<Dashboard />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
