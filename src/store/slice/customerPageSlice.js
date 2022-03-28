import { createSlice } from "@reduxjs/toolkit";
import webInfo from "../../assets/constant/webInfo"
const initialCustomerPage = {
  storeInfo: {},
  products: [],
  order: { name: "", phone: "", address: "", cartItem: [], branch_id: 57},
  categories: [],
  webSetting: webInfo
};
const customerPageSlice = createSlice({
  name: "customerPage",
  initialState: initialCustomerPage,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setStoreInfo(state, action) {
      state.storeInfo = action.payload;
    },
    setWebSetting(state, action) {
      state.webSetting = action.payload;
    },
  },
});
export default customerPageSlice;
export const customerPageActions = customerPageSlice.actions;
