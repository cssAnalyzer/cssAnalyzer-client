import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../features/dataSlice";
import errorSlice from "../features/errorSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";

const rootReducer = combineReducers({
  data: dataSlice,
  error: errorSlice,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["error"],
};

const persistReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger),
});

const persistor = persistStore(store);

export { store, persistor };
