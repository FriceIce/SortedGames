import React from "react";
import { useParams } from "react-router-dom";
import { Game } from "../definitions";
import { fetchGames } from "../modules/fetchGames";
import { optionsForGamesFetching } from "../modules/fetchOptions";
import AdditionalInformation from "./AdditionalInformation";
import SystemRequirements from "./SystemRequirements";
import SaveGameComponent from "./SaveGameComponent";
import CompleteGameInfoSkeletonLoader from "./CompleteGameInfoSkeletonLoader";
import useScrollToTop from "../hooks/useScrollToTop";
import { useQuery } from "@tanstack/react-query";
import useContentIsLoaded from "../hooks/useContentIsLoaded";

const CompleteGameInfo = () => {
  // const [data, setFetchGame] = React.useState<Game | null>(null);
  const [readMore, setReadMore] = React.useState<boolean>(false);
  const [height, setHeight] = React.useState<number | undefined>(undefined);

  //Hooks
  const { id } = useParams();
  useScrollToTop([]);
  useContentIsLoaded();

  const { isLoading, data } = useQuery<Game>({
    queryKey: [id],
    queryFn: () =>
      fetchGames(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
        optionsForGamesFetching
      ),
  });

  React.useEffect(() => {
    const calcHeight = () => {
      const element = document.getElementById(
        "description"
      ) as HTMLParagraphElement;
      const height = element.offsetHeight;
      setHeight(height);
      return;
    };

    if (isLoading === false && data) calcHeight();
    return () => {};
  }, [data]);

  return (
    <>
      {isLoading && <CompleteGameInfoSkeletonLoader />}

      {!isLoading && data && (
        <>
          <img
            id="heroImage"
            height={600}
            width={600}
            src={data.thumbnail}
            alt="game thumbnail"
            className="absolute z-[-1] inset-0 opacity-[20%] w-full h-[600px] object-cover object-center"
          />

          <div
            className="mt-10 md:flex md:gap-6 md:space-y-0 max-w-[550px] mx-auto 2xl:mx-auto py-4 px-5 space-y-10  md:max-w-[1538px]"
            id={data.title}
          >
            <div className="flex-[2] max-w-[600px]">
              <div className="space-y-4 w-full">
                <div className="w-full rounded-md shadow">
                  <img
                    src={data.thumbnail}
                    alt={`${data.title} thumbnail`}
                    className="w-full object-contain object-center rounded-md"
                  />
                </div>
                <div className="flex justify-between text-center">
                  <p className="inline-block bg-[#32383e] w-[20%] py-2 rounded-md">
                    FREE
                  </p>
                  <a
                    href={data.game_url}
                    rel="noreferrer"
                    title={`Go to ${data.title} page.`}
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
                    {data.title}
                  </h1>
                  <SaveGameComponent gameCard={data} />
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
                    {data.description.split("\r").map((paragraph, index) => {
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
              <AdditionalInformation game={data} />
              <SystemRequirements game={data} />
              <div className="space-y-4">
                <h2 className="text-xl">{data.title} screenshots</h2>
                <div className="flex gap-5 flex-wrap">
                  {data.screenshots.map((src) => (
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
