import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PERSIST,
  FLUSH,
  REHYDRATE,
  PAUSE,
  REGISTER,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducer from "./slices";

const persistConfig = {
  key: "tickitz",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (defaultMiddleware) => {
    return defaultMiddleware({
      serializableCheck: {
        ignoredActions: [PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, FLUSH],
      },
    });
  },
});

export const persistor = persistStore(store);
export default store;
