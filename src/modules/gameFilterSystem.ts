import { GameMiniCard } from "../definitions";
export const returnGameTitles = (array: GameMiniCard[]) =>
  array.map((game) => game.title);
