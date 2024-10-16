import React from "react";
import { useParams } from "react-router-dom";
import FetchSpecificGame from "../hooks/fetchSpecificGame.ts";
import useContentIsLoaded from "../hooks/useContentIsLoaded";
import { useMediaQuery } from "../hooks/useMediaQuery";
import useScrollToTop from "../hooks/useScrollToTop";
import AdditionalInformation from "./AdditionalInformation";
import CompleteGameInfoSkeletonLoader from "./CompleteGameInfoSkeletonLoader";
import GameCard from "./GameCard";
import SaveGameComponent from "./SaveGameComponent";
import SimilarGames from "./SimilarGames";
import SystemRequirements from "./SystemRequirements";
import fetchRecommendations from "../hooks/fetchRecommendations.ts";

const CompleteGameInfo = () => {
  // const [data, setFetchGame] = React.useState<Game | null>(null);
  const [readMore, setReadMore] = React.useState<boolean>(false);
  const [height, setHeight] = React.useState<number | undefined>(undefined);
  const [showMore, setShowMore] = React.useState<boolean>(false);

  //Hooks
  const { id } = useParams();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  useScrollToTop([]);
  useContentIsLoaded();
  const { gameRecommendations, loading } = fetchRecommendations(String(id));
  const { specificGame, screenshots, isLoading } = FetchSpecificGame(
    String(id)
  );

  React.useEffect(() => {
    if (showMore) return;

    const calcHeight = () => {
      const element = document.getElementById(
        "description"
      ) as HTMLParagraphElement;
      const height = element.offsetHeight;
      setHeight(height);
      return;
    };

    if (!isLoading && specificGame) calcHeight();
    return () => {};
  }, [specificGame]);

  const ShowMoreButton = (display: boolean) => {
    return (
      <button
        onClick={() => setShowMore((prev) => !prev)}
        className={`${
          !display && "hidden"
        } px-3 py-2 rounded border border-themePurple w-max mx-auto my-3 lg:m-0  lg:hover:bg-themePurple transition-all`}
      >
        Show more
      </button>
    );
  };

  if (showMore)
    return (
      <SimilarGames setShowMore={setShowMore} games={gameRecommendations} />
    );

  return (
    <>
      {isLoading && <CompleteGameInfoSkeletonLoader />}

      {!isLoading && specificGame && (
        <>
          <img
            id="heroImage"
            height={600}
            width={600}
            src={specificGame.thumbnail}
            alt="game thumbnail"
            className="absolute z-[-1] inset-0 opacity-[20%] w-full h-[600px] object-cover object-center"
          />

          <div
            className="mt-10 md:flex md:gap-6 md:space-y-0 max-w-[550px] mx-auto 2xl:mx-auto py-4 px-5 space-y-10  md:max-w-[1538px]"
            id={specificGame.title}
          >
            <div className="flex-[2] max-w-[600px]">
              <div className="space-y-4 w-full">
                <div className="w-full rounded-md shadow">
                  <img
                    src={specificGame.thumbnail}
                    alt={`${specificGame.title} thumbnail`}
                    className="w-full object-contain object-center rounded-md"
                  />
                </div>
                <div className="flex justify-between text-center">
                  <p className="inline-block bg-[#32383e] w-[20%] py-2 rounded-md">
                    FREE
                  </p>
                  <a
                    href={specificGame.game_url}
                    rel="noreferrer"
                    title={`Go to ${specificGame.title} page.`}
                    className="bg-[#4799eb] flex justify-center gap-1 w-[77%] py-2 rounded-md cursor-pointer list-none text-white"
                  >
                    <p className="">PLAY NOW</p>
                    <img
                      src="/SortedGames/icons/play-now.svg"
                      alt="arrow icon"
                      className="size-6"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex-[3] space-y-10">
              <div className="space-y-3">
                <div className="flex items gap-4">
                  <h1 className="text-xl md:text-2xl font-semibold">
                    {specificGame.title}
                  </h1>
                  <SaveGameComponent gameCard={specificGame} />
                </div>
                <div
                  className={`grid ${
                    readMore ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  } transition-all duration-300 ease-linear`}
                >
                  <article
                    style={{
                      minHeight: `${height}px`,
                    }}
                    className={`space-y-2 overflow-hidden`}
                  >
                    {specificGame.description
                      .split("\r")
                      .map((paragraph, index) => {
                        const id = index === 0 ? "description" : "";
                        return (
                          <p
                            key={index}
                            id={id}
                            className="text text-xs lg:text-sm leading-7 text-balance"
                          >
                            {paragraph}
                          </p>
                        );
                      })}
                  </article>
                </div>
                {!readMore ? (
                  <p
                    className="text-sm cursor-pointer"
                    onClick={() => setReadMore((prev) => !prev)}
                  >
                    &#x2b; Read More
                  </p>
                ) : (
                  <p
                    className="text-sm cursor-pointer"
                    onClick={() => setReadMore((prev) => !prev)}
                  >
                    &#x2212; Read Less
                  </p>
                )}
              </div>
              <AdditionalInformation game={specificGame} />
              <SystemRequirements game={specificGame} />
              <section
                className={`space-y-4 ${
                  specificGame.screenshots.length === 0 && "hidden"
                }`}
              >
                <h2 className="text-xl">{specificGame.title} screenshots</h2>
                <div className="flex gap-2 flex-wrap">
                  {screenshots.map((src, id) => (
                    <img
                      key={id}
                      src={src}
                      className="rounded flex-1 w-[40%]"
                    />
                  ))}
                </div>
              </section>

              <section
                className={`space-y-4 ${
                  gameRecommendations.length === 0 && "hidden"
                }`}
              >
                <div className="flex justify-between ">
                  <h2 className="text-base lg:text-xl">
                    Similar to Call of Duty: Warzone
                  </h2>

                  {ShowMoreButton(isDesktop)}
                </div>
                <ul
                  className={`${
                    isDesktop
                      ? "game-recommendation-grid"
                      : "flex flex-col gap-1"
                  }`}
                >
                  {gameRecommendations.slice(0, 4).map((game, index) => {
                    return (
                      <li key={String(game.id + index)} className="flex-none">
                        <GameCard card={game} />
                      </li>
                    );
                  })}

                  {ShowMoreButton(!isDesktop)}
                </ul>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CompleteGameInfo;
