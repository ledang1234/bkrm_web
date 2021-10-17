// project imports
import config from '../../config';
import colors from '../../assets/scss/_themes-vars.module.scss';
// action - state management
import * as actionTypes from '../action/index';

export const initialState = {
    
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    mode: config.mode,

    themeBackground: colors.paper,
    themeText: colors.grey900,
    themeGreyText: colors.grey700,

};

// ===========================|| CUSTOMIZATION REDUCER ||=========================== //

const customizationReducer = (state = initialState, action) => {
    // const color = colors;
    let id;
    switch (action.type) {
        case actionTypes.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily
            };
        case actionTypes.SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius
            };
        case actionTypes.SET_MODE:
            if(action.mode === 'Light'){
                return {
                    ...state,
                    mode:action.mode,
                    themeBackground: colors.paper,
                    themeText: colors.grey900,
                    themeGreyText: colors.grey700,
                }
            }else{
                return {
                    mode:action.mode,
                    themeBackground: colors.grey800,
                    themeText: colors.grey50,
                    themeGreyText: colors.grey50,
                }
            }
            
    
       
        default:
            return state;
    }
};

export default customizationReducer;
