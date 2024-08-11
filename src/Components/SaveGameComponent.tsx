import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { GameMiniCard } from "../definitions";
import { updateSavedGamesList } from "../firebase/firebase";

const SaveGameComponent = ({ gameCard }: { gameCard: GameMiniCard }) => {
  const [likeBtn, setLikeBtn] = React.useState<boolean | null>(null);

  const user = useSelector((state: RootState) => state.user.user);
  const { savedGames } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  //This useEffect checks if the game card i already liked.
  React.useEffect(() => {
    if (!user || !savedGames) return setLikeBtn(false);

    if (!likeBtn) {
      for (let i = 0; i < savedGames.length; i++) {
        if (savedGames[i].id === gameCard.id) {
          setLikeBtn(true);
          return;
        }
      }

      setLikeBtn(false);
    }
  }, [user]);

  const saveOrRemoveGame = () => {
    if (!user) return alert("Please log in to save this content");
    const gameList = savedGames ? [...savedGames] : [];
    const { id, title, thumbnail } = gameCard;

    if (likeBtn === false) {
      gameList.push({ id, title, thumbnail });
      dispatch({ type: "user/setUpdateSavedGamesList", payload: gameList });
      updateSavedGamesList(user.userId, dispatch, gameList);
    }

    if (likeBtn === true) {
      console.log("Removing the game card...");
      const removingGame = gameList.filter((game) => gameCard.id !== game.id);
      updateSavedGamesList(user.userId, dispatch, removingGame);
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
