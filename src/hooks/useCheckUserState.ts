import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { GameMiniCard, UserInformations } from "../definitions";
import { fetchGames } from "../modules/fetchGames";
import { optionsWithoutBody, userUrl } from "../modules/fetchOptions";

export const useCheckUserState = (user: false | UserInformations | null) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user === null && cookies.user === undefined) {
      const googleQueryString = window.location.search;
      const value = new URLSearchParams(googleQueryString);
      // extract values from google query string
      const id = value.get("userId");
      const token = value.get("token");
      const username = value.get("username");
      const profileImg = value.get("profileImg");

      if (googleQueryString) {
        console.log("googleQueryString");

        dispatch({
          type: "user/setUserState",
          payload: { userId: id, token, username, profileImg },
        });

        return;
      }

      console.log("The user was never signed in. Setting user state to false");
      setTimeout(
        () => dispatch({ type: "user/setUserState", payload: false }),
        1000
      );
      return;
    }

    if (user && cookies.user === undefined) {
      console.log(
        "The user is logged in, but the token is not set. Creating a cookie with user information"
      );
      setCookie("user", JSON.stringify({ ...user }), {
        path: "/SortedGames/",
        httpOnly: false,
        secure: true,
      });
      console.log("The cookie is set.");
    }

    if (user === null && cookies.user) {
      // console.log(
      //   "User is logged in, and recently refreshed the site. The cookie values will transfer to the user state.  "
      // );
      setTimeout(
        () => dispatch({ type: "user/setUserState", payload: cookies.user }),
        1000
      );
      return;
    }

    if (user === false && cookies.user) {
      console.log(user);
      const domain = window.location.hostname;
      // console.log("User signed out and the cookie session is now invalid.");
      removeCookie("user", {
        path: "/SortedGames/",
        domain: domain,
      });
      return;
    }
  }, [user]);

  React.useEffect(() => {
    // console.log("Inside the cookie useEffect");

    const fetchSavedGames = async () => {
      if (user) return;
      const savedGames: { data: GameMiniCard[]; message: string } | null =
        await fetchGames(
          userUrl("allSavedGames", cookies.user.userId),
          optionsWithoutBody("GET", cookies.user.token)
        );

      console.log("Saved games fetched: ", savedGames);

      if (savedGames) {
        // The id is an auto incremented value from the database and does not correspond to the game id. Therefore we need to manually change it do the correct value.
        const changedIdInSavedGames = savedGames.data.map((game) => {
          game.id = Number(game.gameId?.split("-")[1]);
          return game;
        });
        dispatch({
          type: "user/setSavedGames",
          payload: changedIdInSavedGames,
        });
      }
    };

    if (cookies.user) {
      // fetch user route savedGames
      fetchSavedGames();
    }

    return () => {};
  }, [cookies.user]);

  return;
};

// setCookie(
//   "user",
//   JSON.stringify({ userId: id, token, username, profileImg }),
//   {
//     path: "/SortedGames/",
//     httpOnly: false,
//     secure: true,
//   }
// );
