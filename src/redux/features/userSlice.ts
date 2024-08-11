import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameMiniCard, UserInformations } from "../../definitions";

type InitialState = {
  user: UserInformations | false | null;
  savedGames: GameMiniCard[];
  googleAuth: boolean;
};

const initialState: InitialState = {
  user: null, // Initial state is null, this means the user recently refreshed the app. If the user is logged in, output user information (truthy value) and if the user is not signed in it will output false.
  savedGames: [],
  googleAuth: false, // Initial state is false, this means the user is not authenticated with google.
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
    setUpdateSavedGamesList: (state, action: PayloadAction<GameMiniCard[]>) => {
      state.savedGames = action.payload;
    },
    setGoogleAuthText: (state, action: PayloadAction<boolean>) => {
      state.googleAuth = action.payload;
    },
  },
});

export default userSlice.reducer;
