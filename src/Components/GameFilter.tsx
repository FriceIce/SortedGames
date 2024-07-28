import { Dispatch } from "react";
import { FilterOptions } from "../definitions";

const GameFilter = ({
  filterOption,
  setFilterOption,
}: {
  filterOption: FilterOptions;
  setFilterOption: Dispatch<React.SetStateAction<FilterOptions>>;
}) => {
  return (
    <div className="text-white flex gap-2 justify-center mt-4">
      <button
        className={` text-white px-2 rounded-md ${
          filterOption === "all" ? "bg-[#7c61ec]" : "bg-gray-700"
        } `}
        onClick={() => setFilterOption("all")}
      >
        ALL
      </button>
      <button
        title="Alphabeticl order"
        className={` text-white px-2 rounded-md ${
          filterOption === "alphabetical" ? "bg-[#7c61ec]" : "bg-gray-700"
        } `}
        onClick={() => setFilterOption("alphabetical")}
      >
        A-Z
      </button>
      <button
        className={`text-white px-2 rounded-md ${
          filterOption === "pc" ? "bg-[#7c61ec]" : "bg-gray-700"
        }`}
        onClick={() => setFilterOption("pc")}
      >
        PC
      </button>
      <button
        className={`text-white px-2 rounded-md ${
          filterOption === "browser" ? "bg-[#7c61ec]" : "bg-gray-700"
        }`}
        onClick={() => setFilterOption("browser")}
      >
        Browser
      </button>
    </div>
  );
};

export default GameFilter;
