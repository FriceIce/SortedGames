// TypeScript definitions

export type GameMiniCard = {
  id: number;
  thumbnail: string;
  title: string;
  publisher?: string;
  platform?: string;
  genre?: string;
};

export type GamesList = {
  popular: GameMiniCard[];
  mixedGames: GameMiniCard[];
  fighting: GameMiniCard[];
  MOBA: GameMiniCard[];
  searchGames: GameMiniCard[];
  contentIsLoaded: boolean;
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
  userId: string;
  email: string;
  username: string;
  profileImg: string;
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

// Firebase user snapshot.
export type UserSnapshot = {
  userId: string;
  email: string;
  username: string;
  profileImg: string;
  SavedGames: GameMiniCard[];
};
