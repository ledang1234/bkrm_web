import colors from "../assets/scss/_themes-vars.module.scss";
import { pink, blue, grey } from "@material-ui/core/colors";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  mode: "Light",
  themeBackground: colors.paper,
  themeText: colors.grey900,
  themeGreyText: colors.grey700,
  primaryColor: blue,
  secondaryColor: pink,
  colorLevel: 50,
};

const customizeSlice = createSlice({
  name: "customize",
  initialState: initialState,
  reducers: {
    setFontFamily(state, action) {
      state.fontFamily = action.fontFamily;
    },
    setBorderRadius(state, action) {
      state.borderRadius = action.borderRadius;
    },
    setMode(state, action) {
      if (action.mode === "Light") {
        state.mode = action.mode;
        state.themeBackground = colors.paper;
        state.themeText = colors.grey900;
        state.themeGreyText = colors.grey700;
        state.primaryColor = blue;
        state.colorLevel = 50;
      } else {
        state.mode = action.mode;
        state.themeBackground = colors.grey800;
        state.themeText = colors.grey50;
        state.themeGreyText = colors.grey50;
        state.primaryColor = grey;
        state.colorLevel = 700;
      }
    },
    setPrimaryColor(state, action) {
      state.primaryColor = action.primaryColor;
    },
    setSecondaryColor(state, action) {
      state.secondaryColor = action.secondaryColor;
    },
    setColorLevel(state, action) {
      state.colorLevel = action.colorLevel;
    },
    setState(state, action) {
      state = action.state;
    },
  },
});
export default customizeSlice;
export const customizeAction = customizeSlice.actions;
