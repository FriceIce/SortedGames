import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../redux/features/gamesSlice";
import sidemenuReducer from "./features/sidemenuSlice";
import userReducer from "./features/userSlice";
import headerReducer from "./features/headerSlice";
// ...

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    sidemenu: sidemenuReducer,
    user: userReducer,
    header: headerReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
