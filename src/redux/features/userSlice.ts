import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameMiniCard, UserInformations } from "../../definitions";

type InitialState = {
  user: UserInformations | false | null;
  latestLikedId: number | null;
  latestRemovedLikeId: number | null;
  savedGames: GameMiniCard[];
};

const initialState: InitialState = {
  user: null, // Initial state is null, this means the user is not logged in.  If the user is logged in, it will be the user's form values.
  latestLikedId: null,
  latestRemovedLikeId: null,
  savedGames: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (
      state,
      action: PayloadAction<UserInformations | false | null>
    ) => {
      const payload = action.payload;
      if (payload === false) {
        state.user = payload;
        state.savedGames = [];
        return;
      }
      state.user = action.payload;
    },
    setSavedGames: (state, action: PayloadAction<GameMiniCard[]>) => {
      state.savedGames = action.payload;
    },
    setSaveGame: (state, action: PayloadAction<GameMiniCard>) => {
      state.latestLikedId = action.payload.id; // This will be used in SaveGameComponent to update all the cards with the same id and re-run the for loop for -> savedGames list so every card with the same id gets a read heart.
      state.savedGames.push(action.payload);
    },
    setRemoveGame: (state, action: PayloadAction<GameMiniCard>) => {
      const id = action.payload.id;
      const newList = state.savedGames.filter((game) => game.id !== id);
      state.savedGames = newList;
      state.latestRemovedLikeId = id;
    },
  },
});

export default userSlice.reducer;
