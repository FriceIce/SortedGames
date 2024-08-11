import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameMiniCard, GamesList } from "../../definitions";

// Define the initial state using that type
const initialState: GamesList = {
  popular: [],
  allGames: [],
  fighting: [],
  MOBA: [],
  searchGames: [],
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    cacheGames: (state, action: PayloadAction<Prop>) => {
      const payload = action.payload;

      // Prevents the states from storing all 300+ games that comes with the fetched data.
      state.popular =
        payload[0].games.length > 10
          ? payload[0].games.slice(0, 11)
          : payload[0].games.slice(0, payload[0].games.length);

      state.MOBA =
        payload[1].games.length > 10
          ? payload[1].games.slice(0, 11)
          : payload[1].games.slice(0, payload[1].games.length);

      state.fighting =
        payload[2].games.length > 10
          ? payload[2].games.slice(0, 11)
          : payload[2].games.slice(0, payload[2].games.length);

      state.allGames = payload[3].games.slice(0, 100);
    },

    cacheSearchResults: (state, action: PayloadAction<GameMiniCard[]>) => {
      state.searchGames = action.payload;
    },
  },
});

export default gamesSlice.reducer;

type Prop = { games: GameMiniCard[] }[];
