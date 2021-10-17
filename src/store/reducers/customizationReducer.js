// project imports
import config from '../../config';
import colors from '../../assets/scss/_themes-vars.module.scss';
// action - state management
import * as actionTypes from '../action/index';
import {red, pink, purple, blue, cyan,  green, yellow, amber, orange, grey} from '@material-ui/core/colors'
export const initialState = {
    
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    mode: config.mode,

    themeBackground: colors.paper,
    themeText: colors.grey900,
    themeGreyText: colors.grey700,

    primaryColor:blue,
    secondaryColor:pink,
    colorLevel:50

    

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
                    ...state,
                    mode:action.mode,
                    themeBackground: colors.grey800,
                    themeText: colors.grey50,
                    themeGreyText: colors.grey50,
                }
            };
        case actionTypes.SET_PRIMARY_COLOR:
            return{
                ...state,
                primaryColor: action.primaryColor
            };
        case actionTypes.SET_SECONDARY_COLOR:
            return{
                ...state,
                secondaryColor: action.secondaryColor
            };
        case actionTypes.SET_COLOR_LEVEL:
            let value = action.colorLevel ;
            if( action.colorLevel == 0){value = 50;}
            return {
                ...state,
                colorLevel: value
            };
            
    
       
        default:
            return state;
    }
};

export default customizationReducer;
