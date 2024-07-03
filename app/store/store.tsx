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

// const store = configureStore({
//   reducer: {
//     otp: dataSlice,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// const persistor = persistStore(store);

// export { store, persistor };
