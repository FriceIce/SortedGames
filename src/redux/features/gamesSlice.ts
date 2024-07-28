import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameMiniCard, GamesList } from "../../definitions";

// Define the initial state using that type
const initialState: GamesList = {
  popular: [],
  openWorld: [],
  PC: [],
  browser: [],
  searchGames: [],
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    cacheGames: (state, action: PayloadAction<GameMiniCard[][]>) => {
      const payload = action.payload;

      // Prevents the states from storing all 300+ games that comes with the fetched data.
      state.popular = payload[0].slice(0, 11);
      state.openWorld = payload[1].slice(0, 100);
      // state.PC = payload[2].slice(0, 21).reverse();
      // state.browser = payload[3].slice(0, 21).reverse();
    },

    cacheSearchResults: (state, action: PayloadAction<GameMiniCard[]>) => {
      state.searchGames = action.payload;
    },
  },
});

export default gamesSlice.reducer;
