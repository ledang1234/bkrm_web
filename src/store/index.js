import { configureStore } from "@reduxjs/toolkit";
import cusomizeSlice from "./slice/customizeSlice";
import authSlice from "./slice/authSlice";
import loadingSlice from "./slice/loadingSlice";
import infoSlice from "./slice/infoSlice";
const store = configureStore({
  reducer: {
    customize: cusomizeSlice.reducer,
    auth: authSlice.reducer,
    loading: loadingSlice.reducer,
    info: infoSlice.reducer,
  },
});
export default store;
