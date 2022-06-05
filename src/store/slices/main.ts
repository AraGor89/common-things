import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    toggleLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleLoading } = mainSlice.actions;

export default mainSlice.reducer;
