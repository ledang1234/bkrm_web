import { configureStore } from "@reduxjs/toolkit";
import cusomizeSlice from "./customizeSlice";
import authSlice from "./authSlice";
import loadingSlice from "./loadingSlice";
const store = configureStore({
  reducer: {
    customize: cusomizeSlice.reducer,
    auth: authSlice.reducer,
    loading: loadingSlice.reducer,
  },
});
export default store;
