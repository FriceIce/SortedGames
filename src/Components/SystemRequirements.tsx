import React from "react";
import { Game } from "../definitions";
import PC_browser_requirements from "./PC_browser_requirements";

const SystemRequirements = ({ game }: { game: Game }) => {
  const system_requirements = (info: string | undefined) => {
    if (info === "Windows") {
      return game.minimum_system_requirements;
    }

    const firstParagraph = `${game.title} is a browser based game and should run smoothly on practically any PC with a updated web-browser.`;

    const seccondParagraph =
      "If you have old hardware or software, you may still be able to play Naruto Online, but your game experience may suffer. For the best gameplay experience, we recommend the latest versions of Firefox, Chrome, or Internet Explorer.";

    return [firstParagraph, seccondParagraph];
  };

  // For some reason this componet re-renders on scroll position 0-1, so this is an temporary solution.
  const requirements = React.useMemo(() => {
    return system_requirements(game.platform);
  }, [game]);
  return (
    <>
      {requirements && (
        <div className="space-y-4">
          <div className="text-center md:text-start md:flex md:items-center md:gap-1">
            <h2 className="text-xl">Minimum System Requirements</h2>
            <h3 className="text-center text-blue-300 pt-1 text-base">
              ({game.platform})
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            <PC_browser_requirements data={requirements} />
          </div>
        </div>
      )}
    </>
  );
};

export default SystemRequirements;
