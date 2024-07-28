import React from "react";

export const useMediaQuery = (mediaWidth: string) => {
  const [screenWidth, setScreenWidth] = React.useState<boolean>(
    window.matchMedia(mediaWidth).matches
  );

  const matchMedia: MediaQueryList = window.matchMedia(mediaWidth);

  React.useEffect(() => {
    matchMedia.addEventListener("change", () => {
      setScreenWidth(matchMedia.matches);
    });

    return () => matchMedia.removeEventListener("change", () => {});
  }, []);

  return screenWidth;
};
