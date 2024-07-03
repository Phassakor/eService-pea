// import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from 'redux-persist/lib/storage';
// import rootReducers from "./rootReducers";
// const createNoopStorage = () => {
//   return {
//     getItem(_key: string) {
//       return Promise.resolve(null);
//     },
//     setItem(_key: string, value: any) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key: string) {
//       return Promise.resolve();
//     },
//   };
// };
// const persistConfig = {
//   key: "PEA",
//   storage: typeof window !== 'undefined' ? storage : createNoopStorage(),
// };
// const persistedReducer = persistReducer(persistConfig, rootReducers);
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Disable serializable check if necessary
//     }),
// });
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// //redux-persist to persist the store
// export const persistor = persistStore(store);


import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import rootReducers from "./rootReducers";

// Create Noop Storage for SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

// Determine storage type
const isClient = typeof window !== 'undefined';
const selectedStorage = isClient ? storage : createNoopStorage();

console.log("Storage being used:", isClient ? "Local Storage" : "Noop Storage");

// Configuration for redux-persist
const persistConfig = {
  key: "PEA",
  storage: selectedStorage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducers);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/FLUSH',
          'persist/REGISTER',
        ],
      },
    }),
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Persistor to persist the store (only on client side)
export let persistor: ReturnType<typeof persistStore> | undefined;

if (isClient) {
  persistor = persistStore(store);
  persistor.subscribe(() => {
    console.log('Persistor state:', persistor!.getState());
  });
}
