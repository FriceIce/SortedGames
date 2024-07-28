import { Game } from "../definitions";

const AdditionalInformation = ({ game }: { game: Game }) => {
  return (
    <div className="w-full text-xs max-w-[568px]">
      <h2 className="text-xl mb-1">Additional Information</h2>
      <div className="flex justify-between flex-wrap">
        <div className="flex-1 my-1 space-y-1">
          <h3 className="text-blue-300 text-sm">Title</h3>
          <p className="">{game.title}</p>
        </div>
        <div className="flex-1 my-1 space-y-1">
          <h3 className="text-blue-300 text-sm">Developer</h3>
          <p className="">{game.developer}</p>
        </div>
      </div>
      <div className="flex justify-between flex-wrap">
        <div className="flex-1 my-1 space-y-1">
          <h3 className="text-blue-300 text-sm">Publisher</h3>
          <p className="">{game.publisher}</p>
        </div>
        <div className="flex-1 my-1 space-y-1">
          <h3 className="text-blue-300 text-sm">Release Date</h3>
          <p className="">{game.release_date}</p>
        </div>
      </div>
      <div className="flex justify-between flex-wrap">
        <div className="flex-1 my-1 space-y-1">
          <h3 className="text-blue-300 text-sm">Genre</h3>
          <p className="">{game.genre}</p>
        </div>
        <div className="flex-1 my-1 space-y-1">
          <h3 className="text-blue-300 text-sm">Platform</h3>
          <div className="flex items-center gap-1">
            <img
              src={
                game.platform.toLocaleLowerCase() === "windows"
                  ? "/SortedGames/icons/pc-icon.svg"
                  : "/SortedGames/icons/browser-icon.svg"
              }
              alt={`${game.platform} icon.`}
              className="size-4"
            />
            <p className="">{game.platform}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation;
