import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./features/cartSlice";
import paymentMethodsReducer from "./features/paymentMethodsSlice"; // Add this line to import the reducer

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart", "paymentMethods"],
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  paymentMethods: paymentMethodsReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
