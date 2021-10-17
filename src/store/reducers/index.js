import { combineReducers } from "redux";
import customizationReducer from "./customizationReducer";

const rootReducer = combineReducers({
  //IMPOORT STATE MA STORE DANG LUU TRU
  
    //key: value
    customization: customizationReducer
});

export default rootReducer;
