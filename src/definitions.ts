// TypeScript definitions

export type GameMiniCard = {
  // developer?: string;
  // freetogame_profile_url: string;
  game_url: string;
  genre: string;
  id: number;
  gameId?: string;
  platform: string;
  publisher: string;
  // release_date?: string;
  short_description: string;
  thumbnail: string;
  title: string;
};

export type GamesList = {
  popular: GameMiniCard[];
  openWorld: GameMiniCard[];
  PC: GameMiniCard[];
  browser: GameMiniCard[];
  searchGames: GameMiniCard[];
};

// Specific game card
export type Game = {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  minimum_system_requirements: MinimumSystemRequirements;
  screenshots: Screenshot[];
};

export type MinimumSystemRequirements = {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
};

type Screenshot = {
  id: number;
  image: string;
};

// React hook form

export type FormValues = {
  email: string;
  password: string;
  username?: string;
};

export type UserInformations = {
  id: number;
  email: string;
  username: string;
  profileImg: string;
  token: string;
};

export type Inputfield = {
  label: "email" | "password" | "username";
  type: string;
  createAccount: boolean;
  required: boolean;
};

// Avatar
export type AvatarWithBackground = {
  withBackground: Avatar[];
};

type Avatar = { id: string; name: string; src: string };

// login / register response
export type UserResponse = {
  message: string;
  user: UserInformations;
};

// filter options
export type FilterOptions = "alphabetical" | "pc" | "browser" | "all";
