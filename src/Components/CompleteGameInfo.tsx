import React from "react";
import { fetchGames } from "../modules/fetchGames";
import { optionsForGamesFetching } from "../modules/fetchOptions";
import { Game } from "../definitions";
import { useParams } from "react-router-dom";
import AdditionalInformation from "./AdditionalInformation";
import SystemRequirements from "./SystemRequirements";
import SaveGameComponent from "./SaveGameComponent";

const CompleteGameInfo = () => {
  const [game, setFetchGame] = React.useState<Game>();
  const [readMore, setReadMore] = React.useState<boolean>(false);
  const [height, setHeight] = React.useState<number | undefined>(undefined);
  const { id } = useParams();

  React.useEffect(() => {
    const url =
      "https://free-to-play-games-database.p.rapidapi.com/api/game?id=" + id;

    fetchGames(url, optionsForGamesFetching, setFetchGame);
  }, []);

  React.useEffect(() => {
    const calcHeight = () => {
      const element = document.getElementById(
        "description"
      ) as HTMLParagraphElement;
      const height = element.offsetHeight;
      console.log(height);
      setHeight(height);
      return;
    };

    if (game !== undefined) calcHeight();
    return () => {};
  }, [game]);

  return (
    <>
      {game && (
        <>
          <img
            id="heroImage"
            height={600}
            width={600}
            src={game.thumbnail}
            alt="game thumbnail"
            className="absolute z-[-1] inset-0 opacity-[20%] w-full h-[600px] object-cover object-center"
          />

          <div className="md:flex md:gap-6 md:space-y-0 max-w-[550px] mx-auto 2xl:mx-auto py-4 px-5 space-y-10  md:max-w-[1538px]">
            <div className="flex-[2] max-w-[600px]">
              <div className="space-y-4 w-full">
                <div className="w-full rounded-md shadow">
                  <img
                    src={game.thumbnail}
                    alt={`${game.title} thumbnail`}
                    className="w-full object-contain object-center rounded-md"
                  />
                </div>
                <div className="flex justify-between text-center">
                  <p className="inline-block bg-[#32383e] w-[20%] py-2 rounded-md">
                    FREE
                  </p>
                  <a
                    href={game.game_url}
                    title={`Go to ${game.title} page.`}
                    className="bg-[#4799eb] flex justify-center gap-1 w-[70%] py-2 rounded-md cursor-pointer list-none text-white"
                  >
                    <p className="">PLAY NOW</p>
                    <img
                      src="/icons/play-now.svg"
                      alt="arrow icon"
                      className="size-6"
                    />
                  </a>
                  {/* <SaveGameComponent gameCard={}/> */}
                </div>
              </div>
            </div>
            <div className="flex-[3] space-y-10">
              <div className="space-y-3">
                <h1 className="text-xl md:text-2xl font-semibold">
                  {game.title}
                </h1>
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
                    {game.description.split("\r").map((paragraph, index) => {
                      const id = index === 0 ? "description" : "";
                      return (
                        <p
                          key={index}
                          id={id}
                          className="text-xs leading-[1.8] text-balance"
                        >
                          {paragraph}
                        </p>
                      );
                    })}
                  </article>
                </div>
                {!readMore ? (
                  <p
                    className="text-sm"
                    onClick={() => setReadMore((prev) => !prev)}
                  >
                    &#x2b; Read More
                  </p>
                ) : (
                  <p
                    className="text-sm"
                    onClick={() => setReadMore((prev) => !prev)}
                  >
                    &#x2212; Read Less
                  </p>
                )}
              </div>
              <AdditionalInformation game={game} />
              <SystemRequirements game={game} />
              <div className="space-y-4">
                <h2 className="text-xl">{game.title} screenshots</h2>
                <div className="flex gap-5 flex-wrap">
                  {game.screenshots.map((src) => (
                    <img
                      key={src.id}
                      src={src.image}
                      className="w-[45%] max-w-[400px] rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CompleteGameInfo;
