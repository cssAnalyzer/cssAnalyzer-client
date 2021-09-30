import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import dataSlice from "../features/dataSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
