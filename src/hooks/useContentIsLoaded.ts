import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useContentIsLoaded = () => {
  const contentIsLoaded = useSelector(
    (state: RootState) => state.games.contentIsLoaded
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (contentIsLoaded) return;

    const id = setTimeout(
      () => dispatch({ type: "games/setContentIsLoaded", payload: true }),
      500
    );

    return () => clearTimeout(id);
  }, []);
};

export default useContentIsLoaded;
