import React from "react";
import { GameMiniCard } from "../definitions";
import { useMediaQuery } from "../hooks/useMediaQuery";
import GameCard from "./GameCard";
import ScrollArrows from "./ScrollArrows";

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

  // This is for media queries and also for calulating how many dots should be added under the slide.
  const screenWidthForMultiCards = useMediaQuery("(min-width: 1000px)"); // minimum three cards.

  const prevSlide = () => {
    if (currentIndex === 0) return;
    if (screenWidthForMultiCards) setCurrentIndex((currIndex) => currIndex - 2);
    // setCurrentIndex((count) => count - 1);
    slideToContainer(currentIndex - 3);
  };

  const nextSlide = () => {
    if (currentIndex === gamesList.length - 1) return;
    if (currentIndex === 9 && screenWidthForMultiCards) return; // This prevents the applicaton from crashing because of nonexistent jsx element.

    if (screenWidthForMultiCards) setCurrentIndex((currIndex) => currIndex + 2);
    // setCurrentIndex((count) => count + 1);
    slideToContainer(currentIndex + 3);
  };

  // When currentIndex changes this function will update the slide with the useEffect below this function.
  const slideToContainer = (gameIndex: number): void => {
    let correctIndex = gameIndex; //IF the game index so happens to overflow the if statements below will handle it.
    if (gameIndex < 0) correctIndex = 0;
    if (gameIndex > 9 && position === 1) correctIndex = 9;
    if (gameIndex >= 11) correctIndex = 11;

    const game = document.getElementById(
      `game-${correctIndex}-${position}`
    ) as HTMLLIElement;
    game.scrollIntoView({
      behavior: "smooth",
      block: screenWidthForMultiCards ? "nearest" : "nearest",
      inline: screenWidthForMultiCards ? "start" : "center", //
    });

    return setCurrentIndex(correctIndex);
  };

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
