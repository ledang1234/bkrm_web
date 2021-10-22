import { configureStore } from "@reduxjs/toolkit";
import cusomizeSlice from "./customizeSlice";
const store = configureStore({
  reducer: {
    customize: cusomizeSlice.reducer,
  },
});
export default store;
