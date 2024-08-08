import React from "react";
import { AppDispatch } from "../redux/store";

export const useMediaQuery = (
  mediaWidth: string,
  dispatch?: AppDispatch,
  type?: string
) => {
  const [screenWidth, setScreenWidth] = React.useState<boolean>(
    window.matchMedia(mediaWidth).matches
  );

  const matchMedia: MediaQueryList = window.matchMedia(mediaWidth);

  React.useEffect(() => {
    matchMedia.addEventListener("change", () => {
      setScreenWidth(matchMedia.matches);
    });

    if (dispatch) dispatch({ type: `${type}`, payload: matchMedia.matches });

    return () => matchMedia.removeEventListener("change", () => {});
  }, []);

  return screenWidth;
};
