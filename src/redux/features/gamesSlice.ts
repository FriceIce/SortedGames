import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameMiniCard, GamesList } from "../../definitions";

// Define the initial state using that type
const initialState: GamesList = {
  popular: [],
  mixedGames: [],
  fighting: [],
  MOBA: [],
  searchGames: [],
  contentIsLoaded: false,
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    cacheGames: (state, action: PayloadAction<GameMiniCard[][]>) => {
      const payload = action.payload;

      // Prevents the states from storing all 300+ games that comes with the fetched data.
      state.popular =
        payload[0].length > 10
          ? payload[0].slice(0, 11)
          : payload[0].slice(0, payload[0].length);

      state.MOBA =
        payload[1].length > 10
          ? payload[1].slice(0, 11)
          : payload[1].slice(0, payload[1].length);

      state.fighting =
        payload[2].length > 10
          ? payload[2].slice(0, 11)
          : payload[2].slice(0, payload[2].length);

      state.mixedGames = payload[3].slice(0, 71);
    },

    cacheSearchResults: (state, action: PayloadAction<GameMiniCard[]>) => {
      state.searchGames = action.payload;
    },

    setContentIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.contentIsLoaded = action.payload;
    },
  },
});

export default gamesSlice.reducer;
