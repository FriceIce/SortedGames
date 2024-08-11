import React from "react";

const useFetchGamesOnScroll = (scrollPositionY: boolean) => {
  const [amountOfGames, setAmountOfGames] = React.useState<number>(50);

  React.useEffect(() => {
    if (scrollPositionY === true)
      setAmountOfGames((prevCount) => prevCount + 50);
    return () => {};
  }, [scrollPositionY]);

  return amountOfGames;
};

export default useFetchGamesOnScroll;
