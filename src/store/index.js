import { configureStore } from "@reduxjs/toolkit";
import cusomizeSlice from "./slice/customizeSlice";
import authSlice from "./slice/authSlice";
import loadingSlice from "./slice/loadingSlice";
import infoSlice from "./slice/infoSlice";
import statusSlice from "./slice/statusSlice";
const store = configureStore({
  reducer: {
    customize: cusomizeSlice.reducer,
    auth: authSlice.reducer,
    loading: loadingSlice.reducer,
    info: infoSlice.reducer,
    status:statusSlice.reducer
  },
});
export default store;
