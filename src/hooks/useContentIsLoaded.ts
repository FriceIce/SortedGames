import React from "react";
import { useDispatch } from "react-redux";

const useContentIsLoaded = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const id = setTimeout(
      () => dispatch({ type: "games/setContentIsLoaded", payload: true }),
      500
    );

    return () => clearTimeout(id);
  }, []);
};

export default useContentIsLoaded;
