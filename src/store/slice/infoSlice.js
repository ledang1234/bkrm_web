import { createSlice } from "@reduxjs/toolkit";
const initialUserInfoSlice = {
  user: {
    user_name:"",
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
    general_configuration: "{\"inventory\":{\"status\":true},\"recommendedProduct\":{\"status\":true},\"variation\":{\"status\":true},\"expiryDate\":{\"status\":true},\"customerScore\":{\"status\":false,\"value\":10000,\"exceptDiscountProduct\":false,\"exceptDiscountInvoice\":false,\"exceptVoucher\":false},\"email\":{\"status\":false,\"emailAddress\":\"\",\"password\":\"\"},\"notifyDebt\":{\"status\":true,\"checkDebtAmount\":true,\"debtAmount\":\"500000\",\"checkNumberOfDay\":false,\"numberOfDay\":\"15\",\"typeDebtDay\":\"firstDebt\",\"canNotContinueBuy\":false,\"canNotContinueDebt\":false},\"returnLimit\":{\"status\":false,\"day\":7},\"canFixPriceSell\":{\"status\":false,\"cart\":false,\"import\":true,\"returnCart\":true,\"returnImport\":true},\"printReceiptWhenSell\":{\"status\":true,\"cart\":true,\"import\":false,\"returnCart\":false,\"returnImport\":false,\"order\":false,\"checkInventroy\":false},\"discount\":{\"status\":true,\"applyMultiple\":false,\"applyOnline\":true},\"voucher\":{\"status\":true},\"delivery\":{\"status\":true},\"vat\":{\"status\":false,\"listCost\":[{\"key\":\"1\",\"costName\":\"\",\"value\":0,\"type\":\"%\"}]},\"orderLowStock\":{\"status\":true,\"choiceQuantity\":\"select\",\"selectQuantity\":\"latest\",\"inputQuantity\":10,\"selectSuplier\":\"latest\"},\"autoApplyDiscount\":{\"status\":true}}",
    store_configuration: "{\"facebook\":null,\"instagram\":null,\"custom_web\":null,\"img_url\":null}",
  },
  branch: {
    uuid: "",
    name: "",
    id: '',
  },
  role: "",
  branchsOfStore:[]
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
    setBranchsOfStore(state, action) {
      state.branchsOfStore = action.payload;
    },
  },
});
export default infoSlice;
export const infoActions = infoSlice.actions;
