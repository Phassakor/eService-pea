// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import Reducer from './Reducer'
import footerReducer from './slices/footerSlice'
import bannerReducer from './slices/bannerSlice'
import carouselsReducer from './slices/carouselsSlice'
import categoryReducer from './slices/categorySlice'
import menuServiceReducer from './slices/menuServiceSlice'
const rootReducer = combineReducers({
  authReducer,
  Reducer,
  footerReducer,
  bannerReducer,
  carouselsReducer,
  categoryReducer,
  menuServiceReducer
});

export default rootReducer;
