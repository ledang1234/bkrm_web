import { combineReducers } from "redux";
import customizationReducer from "./customizationReducer";

const rootReducer = combineReducers({
    customization: customizationReducer
});

export default rootReducer;
