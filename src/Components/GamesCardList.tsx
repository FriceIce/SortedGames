import React from "react";
import GameCard from "./GameCard";
import ScrollArrows from "./ScrollArrows";
import { GameMiniCard } from "../definitions";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";

const GamesCardList = ({
  classNameUL,
  classNameLI,
  gamesList,
  arrows,
}: {
  classNameUL: string;
  classNameLI: string;
  gamesList: GameMiniCard[];
  arrows: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [currentDotIndex, setCurrentDotIndex] = React.useState<number>(0);
  const { pathname } = useLocation();

  // This is for media queries and also for calulating how many dots should be added under the slide.
  const screenWidthForMultiCards = useMediaQuery("(min-width: 1000px)"); // minimum three cards.
  const screenWidthForCards = useMediaQuery("(min-width: 1455px)");
  const screenWidthFiveCards = useMediaQuery("(min-width: 1784px)");

  const prevSlide = () => {
    console.log(screenWidthForMultiCards, currentIndex);
    if (currentIndex === 0) return;
    if (screenWidthForMultiCards) setCurrentIndex((currIndex) => currIndex - 2);
    setCurrentIndex((count) => count - 1);
    setCurrentDotIndex((index) => index - 1);
  };

  const nextSlide = () => {
    if (currentIndex === gamesList.length - 1) return;
    if (currentIndex === 9 && screenWidthForMultiCards) return; // This prevents the applicaton from crashing because of nonexistent jsx element.

    if (screenWidthForMultiCards) setCurrentIndex((currIndex) => currIndex + 2);
    setCurrentIndex((count) => count + 1);
    setCurrentDotIndex((index) => index + 1);
  };

  // When currentIndex changes this function will update the slide with the useEffect below this function.
  const slideToContainer = (gameIndex: number): void => {
    const game = document.getElementById(`game-${gameIndex}`) as HTMLLIElement;
    game.scrollIntoView({
      behavior:
        // This makes so that the carousel wont smoothly scroll through the element when clicking on a dot thats is more than 3 steps away from current index position
        (gameIndex - currentIndex > 2 && !screenWidthForMultiCards) ||
        (currentIndex - gameIndex > 2 && !screenWidthForMultiCards)
          ? "instant"
          : "smooth",
      block: "end",
      inline: screenWidthForMultiCards ? "start" : "center", //
    });

    setCurrentIndex(gameIndex);
    return;
  };

  React.useEffect(() => {
    slideToContainer(currentIndex);
  }, [currentIndex]);

  return (
    <ScrollArrows
      showArrows={arrows}
      prevSlide={prevSlide}
      nextSlide={nextSlide}
    >
      <ul className={classNameUL} id="gamesList">
        {gamesList.map((card, index: number) => {
          return (
            <li
              key={index}
              className={
                currentIndex !== index && arrows && !screenWidthForMultiCards
                  ? `${classNameLI} scale-[95%]`
                  : classNameLI
              }
              id={`game-${index}`}
            >
              <GameCard card={card} />
            </li>
          );
        })}
      </ul>

      {arrows && pathname === "/" && (
        <ul className="flex gap-3 w-max mt-3 mx-auto" id="games">
          {gamesList.map((dot, gameIndex) => {
            if (screenWidthFiveCards && gameIndex > 2) return null;
            if (screenWidthForCards && gameIndex > 2) return null;
            if (screenWidthForMultiCards && gameIndex > 3) return null;

            return (
              <div
                key={gameIndex}
                className={`size-[6px] flex-none rounded-full transition-all duration-200 ${
                  currentDotIndex === gameIndex
                    ? "bg-[#7C61EC] scale-125"
                    : "bg-white scale-75"
                }`}
              ></div>
            );
          })}
        </ul>
      )}
    </ScrollArrows>
  );
};

export default GamesCardList;

// breackpoints
// three cards --> 1100px
// four cards --> 1469px
// five cards --> 1832px
// six cards --> 2192px
// seven cards --> 2559px
