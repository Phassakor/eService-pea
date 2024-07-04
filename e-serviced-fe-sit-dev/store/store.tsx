// import { configureStore } from "@reduxjs/toolkit";
// import dataSlice from "../reducers/Otp";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import AsyncStorage from "@react-native-community/async-storage";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage: AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, dataSlice);

// // const store = configureStore({
// //   reducer: persistedReducer,
// //   middleware: (getDefaultMiddleware) =>
// //     getDefaultMiddleware({
// //       serializableCheck: {
// //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// //       },
// //     }),
// // });

// // const store = configureStore({
// //   reducer: {
// //     otp: dataSlice,
// //   },
// //   middleware: (getDefaultMiddleware) =>
// //     getDefaultMiddleware({
// //       serializableCheck: false,
// //     }),
// // });

// const persistor = persistStore(store);

// export { store, persistor };

import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

import reducer from "@/redux/Reducer";

const configureStore = (initialState = {}) => {
  // const store = createStore(
  //   persistReducer(
  //     {
  //       key: "data",
  //       storage: AsyncStorage,
  //     },
  //     reducer
  //   )
  //   // initialState
  // );
  const persister = persistStore(store, null);
  return { store, persister };
};

export default configureStore;
