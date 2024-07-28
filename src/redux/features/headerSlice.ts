import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Prop = {
  backButton: boolean;
};

const initialState: Prop = {
  backButton: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setBackButton: (state, action: PayloadAction<boolean>) => {
      state.backButton = action.payload;
    },
  },
});

export default headerSlice.reducer;
