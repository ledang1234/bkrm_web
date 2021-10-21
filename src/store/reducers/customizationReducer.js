// project imports
import colors from '../../assets/scss/_themes-vars.module.scss';
import {pink, blue, grey} from '@material-ui/core/colors'

// action - state management
import * as actionTypes from '../constant/index';

export const initialState = {

    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    mode: 'Light',

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
                    //add them 
                    primaryColor:blue,
                    colorLevel:50
                }
            }else{
                return {
                    ...state,
                    mode:action.mode,
                    themeBackground: colors.grey800,
                    themeText: colors.grey50,
                    themeGreyText: colors.grey50,
                    //add them 
                    primaryColor:grey,
                    colorLevel:700

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
            if( action.colorLevel === 0){value = 50;}
            return {
                ...state,
                colorLevel: value
            };
            
    
       
        default:
            return {...state};
    }
};

export default customizationReducer;
