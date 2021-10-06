import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: 200,
  comment: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError(state, { payload }) {
      const { code, comment } = payload;

      if (code !== 200) {
        state.code = code;
        state.comment = comment;
      } else {
        state.code = 200;
        state.comment = "";
      }
    },
  },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
