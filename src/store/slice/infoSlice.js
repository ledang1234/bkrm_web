import { createSlice } from "@reduxjs/toolkit";
const initialUserInfoSlice = {
  user: {
    name: "",
    email: "",
    email_verified_at: null,
    phone: "",
    date_of_birth: "",
    status: "",
    gender: null,
    uuid: "",
    created_at: "",
    updated_at: "",
    permissions: [],
  },
  store: {
    uuid: "",
    name: "",
    address: "",
    ward: "",
    province: "",
    phone: "",
    status: "",
    image: "",
    created_at: "",
    updated_at: "",
    district: "",
  },
  branch: {
    uuid: "",
    name: "",
  },
  role: "",
};
const infoSlice = createSlice({
  name: "info",
  initialState: initialUserInfoSlice,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setStore(state, action) {
      state.store = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    setBranch(state, action) {
      state.branch = action.payload;
    },
  },
});
export default infoSlice;
export const infoActions = infoSlice.actions;
