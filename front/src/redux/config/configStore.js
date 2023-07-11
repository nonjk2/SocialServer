import {combineReducers, configureStore} from "@reduxjs/toolkit";
import user from "../reducers/userSlice";

const rootReducer = combineReducers({
  user
});

// 2. create store
const store = configureStore({
  reducer: rootReducer,
});

// 3. export
export default store;