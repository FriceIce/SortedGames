import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "../../Components/GameCard";
import { GameMiniCard } from "../../definitions";
import { useDebounce } from "../../hooks/useDebounce";
import { useFetch } from "../../hooks/useFetch";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { gameUrl, optionsForGamesFetching } from "../../modules/fetchOptions";
import { RootState } from "../../redux/store";
import useFetchGamesOnScroll from "../../hooks/useFetchGamesOnScroll";

const Search = ({ scrollPositionY }: { scrollPositionY: boolean }) => {
  // Use a state to display content for user Search results.
  const [input, setInput] = React.useState<string>("");
  const games = useSelector((state: RootState) => state.games.searchGames);
  const sidemenu = useSelector((state: RootState) => state.sidemenu.sidemenu);
  const dispatch = useDispatch();

  const debounce = useDebounce(input.trim(), 500); //500ms delay before fetching games
  const amountOfGames = useFetchGamesOnScroll(scrollPositionY); //scroll position 1 --> 50 more games will be displayed.
  const desktop = useMediaQuery("(min-width: 1024px)"); // Tailwind lg screen size

  const { data } = useFetch(
    gameUrl(false, "games"),
    optionsForGamesFetching,
    [],
    dispatch,
    "games/cacheSearchResults",
    games.length > 0 ? true : false
  );

  const gamesList = games.length > 0 ? games : data;
  const onSearch = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  const searchValues = (submittedValue: string, data: GameMiniCard) => {
    const inputValue = submittedValue.toLowerCase();
    const allCardMatches: GameMiniCard[] = [];
    if (inputValue.length < 2) return "";
    if (
      data.title.toLocaleLowerCase().includes(inputValue) &&
      !allCardMatches.includes(data)
    )
      return data;
    if (
      data.genre?.toLocaleLowerCase().includes(inputValue) &&
      !allCardMatches.includes(data)
    )
      return data;
    if (
      data.platform?.toLocaleLowerCase().includes(inputValue) &&
      !allCardMatches.includes(data)
    )
      return data;
    if (
      data.publisher?.toLocaleLowerCase().includes(inputValue) &&
      !allCardMatches.includes(data)
    )
      return data;
    return null; // Everything except null is truthy in this case only.
  };
  return (
    <section
      className={`space-y-6 transition-all duration-200 ${
        desktop && sidemenu && "ml-[210px]"
      }`}
    >
      <form
        className="flex gap-2 items-center border h-[42px] rounded-xl pr-2 w-5/6 mx-auto"
        onSubmit={onSearch}
      >
        <input
          type="text"
          value={input}
          placeholder="Search for free games"
          className="flex-1 bg-midnightBlue h-full rounded-l-xl px-2 text-xs placeholder:text-sm placeholder:text-gray-200"
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="flex-grow-0">
          <img
            src="/SortedGames/icons/search-icon-without-circle.svg"
            alt="search icon"
            className="size-6"
          />
        </button>
      </form>

      <div className="text-xl space-y-2">
        {debounce && (
          <h1 className="text-base text-center sm:text-lg sm:text-start px-4">
            Your search: {debounce}
          </h1>
        )}
        {data && (
          <ul className="card-grid px-4">
            {gamesList.map((data: GameMiniCard, index) => {
              // Filter out games that does not include input values.
              if (searchValues(debounce, data) === null) return null;
              if (index > amountOfGames && input === "") return null;
              return (
                <li key={index} className="">
                  <GameCard card={data} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Search;
