import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  sidemenu: boolean | null;
  inputfield: boolean;
} = {
  sidemenu: null,
  inputfield: false,
};

const sidemenuSlice = createSlice({
  name: "sidemenu",
  initialState,
  reducers: {
    setOpenSidemenu: (state, action: PayloadAction<boolean>) => {
      state.sidemenu = action.payload;
    },

    setShowInputfield: (state, action: PayloadAction<boolean>) => {
      state.inputfield = action.payload;
    },
  },
});

export default sidemenuSlice.reducer;
