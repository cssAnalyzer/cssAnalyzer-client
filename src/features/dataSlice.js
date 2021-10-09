import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputUrl: "http://www.google.com",
  searchResult: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUrl(state, action) {
      state.inputUrl = action.payload;
    },
    setResult(state, action) {
      state.searchResult = action.payload;
    },
  },
});

export const { setUrl, setResult } = dataSlice.actions;
export default dataSlice.reducer;
