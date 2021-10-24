import { configureStore } from "@reduxjs/toolkit";
import cusomizeSlice from "./slice/customizeSlice";
import authSlice from "./slice/authSlice";
import loadingSlice from "./slice/loadingSlice";
const store = configureStore({
  reducer: {
    customize: cusomizeSlice.reducer,
    auth: authSlice.reducer,
    loading: loadingSlice.reducer,
  },
});
export default store;
