import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import errorSlice from "../features/errorSlice";

export const store = configureStore({
  reducer: {
    error: errorSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
