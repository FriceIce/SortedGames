import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { GameMiniCard } from "../definitions";
import { fetchGames } from "../modules/fetchGames";
import {
  optionsWithBody,
  optionsWithoutBody,
  userUrl,
} from "../modules/fetchOptions";
import { useCookies } from "react-cookie";

const SaveGameComponent = ({ gameCard }: { gameCard: GameMiniCard }) => {
  const [likeBtn, setLikeBtn] = React.useState<boolean | null>(null);
  const { latestLikedId, latestRemovedLikeId } = useSelector(
    (state: RootState) => state.user
  );

  const user = useSelector((state: RootState) => state.user.user);
  const { savedGames } = useSelector((state: RootState) => state.user);
  const [cookies] = useCookies(["user"]);
  const dispatch = useDispatch();

  // Checks if this game card i already liked.
  React.useEffect(() => {
    if (!user) return setLikeBtn(false);

    if (
      !likeBtn ||
      latestLikedId === gameCard.id ||
      latestRemovedLikeId === gameCard.id
    ) {
      for (let i = 0; i < savedGames.length; i++) {
        if (savedGames[i].id === gameCard.id) {
          setLikeBtn(true);
          return;
        }

        if (savedGames[i].id === latestRemovedLikeId) {
          setLikeBtn(false);
          return;
        }
      }

      setLikeBtn(false);
    }
  }, [latestLikedId, latestRemovedLikeId, user]);

  const saveOrRemoveGame = () => {
    if (!user) return; //If user is not online then leave this function.

    // The server only requrie id, thumbnail and title
    const { id, thumbnail, title } = gameCard;
    const { userId, token } = cookies.user;
    const param = `${userId}-${gameCard.id}`;

    if (likeBtn === false) {
      console.log("Saving the game card...");
      fetchGames(
        userUrl(`saveGameDetails`, param),
        optionsWithBody("POST", { id, thumbnail, title }, token)
      );
      dispatch({ type: "user/setSaveGame", payload: gameCard });
    }

    if (likeBtn === true) {
      console.log("Removing the game card...");
      fetchGames(
        userUrl(`removeGameDetails`, param),
        optionsWithoutBody("DELETE", token)
      );
      dispatch({ type: "user/setRemoveGame", payload: gameCard });
    }
    setLikeBtn((prev) => !prev);
  };

  return (
    <>
      {likeBtn !== null && (
        <div
          title="Save game"
          className="grid place-items-center bg-gray-600 h-6 w-[27px] rounded-md cursor-pointer saveGame"
          onClick={saveOrRemoveGame}
        >
          <img
            src={`/SortedGames/icons/${
              likeBtn ? "liked-heart-icon" : "heart-icon"
            }.svg`}
            alt="heart icon to save a specific game"
            className="size-4 saveGame "
          />
        </div>
      )}
    </>
  );
};

export default SaveGameComponent;
