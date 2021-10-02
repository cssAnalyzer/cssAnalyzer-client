import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getSearchResult from "../api/search";

const initialState = {
  inputUrl: "",
  searchResult: {},
};

const search = createAsyncThunk("search",
  async function ({ inputUrl }) {
    try {
      const { searchResult } = await getSearchResult();

      return {
        searchResult,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  });

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUrl(state, { payload }) {
      const { inputUrl } = payload;

      if (inputUrl) {
        state.inputUrl = inputUrl;
      } else {
        state.inputUrl = null;
      }
    },
    setSearchResult(state, { payload }) {
      const { searchResult } = payload;
      state.searchResult = searchResult;
    },
  },
});

export const { setUrl, setResult } = dataSlice.actions;
export { search };
export default dataSlice.reducer;
