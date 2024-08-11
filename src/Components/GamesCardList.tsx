import React from "react";
import GameCard from "./GameCard";
import ScrollArrows from "./ScrollArrows";
import { GameMiniCard } from "../definitions";
// import { useLocation } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";

const GamesCardList = ({
  classNameUL,
  classNameLI,
  gamesList,
  arrows,
  position,
}: {
  classNameUL: string;
  classNameLI: string;
  gamesList: GameMiniCard[];
  arrows: boolean;
  position: number;
}) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [, /* currentDotIndex */ setCurrentDotIndex] =
    React.useState<number>(0);
  // const { pathname } = useLocation();

  // This is for media queries and also for calulating how many dots should be added under the slide.
  const screenWidthForMultiCards = useMediaQuery("(min-width: 1000px)"); // minimum three cards.

  const prevSlide = () => {
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
    const game = document.getElementById(
      `game-${gameIndex}-${position}`
    ) as HTMLLIElement;
    game.scrollIntoView({
      behavior: "smooth",
      block: screenWidthForMultiCards ? "nearest" : "nearest",
      inline: screenWidthForMultiCards ? "start" : "center", //
    });

    setCurrentIndex(gameIndex);
    return;
  };

  React.useEffect(() => {
    if (screenWidthForMultiCards) slideToContainer(currentIndex);
  }, [currentIndex]);

  return (
    <ScrollArrows
      showArrows={arrows}
      prevSlide={prevSlide}
      nextSlide={nextSlide}
    >
      <ul
        className={`${classNameUL} snap-x snap-mandatory`}
        id={`gamesList-${position}`}
      >
        {gamesList.map((card, index: number) => {
          return (
            <li
              key={index}
              className={`${classNameLI} ${
                index === 0 && position !== 3 && `ml-2`
              } snap-center`}
              id={`game-${index}-${position}`}
            >
              <GameCard card={card} position={position} />
            </li>
          );
        })}
      </ul>
    </ScrollArrows>
  );
};

export default GamesCardList;

// break points
// three cards --> 1100px
// four cards --> 1469px
// five cards --> 1832px
// six cards --> 2192px
// seven cards --> 2559px
