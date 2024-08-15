import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


// Combine reducers if you have multiple slices
const rootReducer = combineReducers({ user: userReducer });

const persitConfig = {
  key: "event",
  storage,
  version: 1,// Optional: helps with versioning the persisted state
};


// Create a persisted reducer
const persistedReducer = persistReducer(persitConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// Create a persistor for handling the persistence
export const persistor=persistStore(store)


