import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Hospital/userSlice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistorReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistorReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
